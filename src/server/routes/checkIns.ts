import express, { Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { dailyCheckInModel } from '../models/DailyCheckIn';
import { userChallengeModel } from '../models/UserChallenge';
import { dayTaskModel } from '../models/DayTask';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Create or update a check-in
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { taskId, dayNumber, notes } = req.body;
    
    if (!taskId || !dayNumber) {
      return res.status(400).json({ message: 'Task ID and day number are required' });
    }
    
    // Get user's active challenge
    const userChallenge = userChallengeModel.findActiveByUserId(req.userId!);
    if (!userChallenge) {
      return res.status(404).json({ message: 'No active challenge found' });
    }
    
    // Verify the task exists and belongs to the challenge
    const task = dayTaskModel.findById(taskId);
    if (!task || task.challengeId !== userChallenge.challengeId) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Check if a check-in already exists for this day
    let checkIn = dailyCheckInModel.findByUserChallengeAndDay(userChallenge.id, dayNumber);
    
    if (checkIn) {
      // Update existing check-in - add task if not already completed
      if (!checkIn.tasksCompleted.includes(taskId)) {
        checkIn = dailyCheckInModel.update(checkIn.id, {
          tasksCompleted: [...checkIn.tasksCompleted, taskId],
          notes: notes || checkIn.notes,
        })!;
      }
    } else {
      // Create new check-in
      checkIn = dailyCheckInModel.create({
        userId: req.userId!,
        userChallengeId: userChallenge.id,
        dayNumber,
        date: new Date(),
        tasksCompleted: [taskId],
        notes,
      });
    }
    
    return res.status(201).json({ checkIn });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get today's check-in
router.get('/today', (req: AuthRequest, res: Response) => {
  const userChallenge = userChallengeModel.findActiveByUserId(req.userId!);
  
  if (!userChallenge) {
    return res.json({ checkIn: null });
  }
  
  // Calculate current day
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(userChallenge.startDate);
  startDate.setHours(0, 0, 0, 0);
  const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const currentDay = daysDiff + 1;
  
  if (currentDay < 1 || currentDay > 30) {
    return res.json({ checkIn: null, currentDay });
  }
  
  const checkIn = dailyCheckInModel.findByUserChallengeAndDay(userChallenge.id, currentDay);
  
  return res.json({ checkIn, currentDay });
});

// Get all check-ins for current challenge
router.get('/', (req: AuthRequest, res: Response) => {
  const userChallenge = userChallengeModel.findActiveByUserId(req.userId!);
  
  if (!userChallenge) {
    return res.json({ checkIns: [] });
  }
  
  const checkIns = dailyCheckInModel.findByUserChallengeId(userChallenge.id);
  return res.json({ checkIns });
});

// Undo a task completion (remove from check-in)
router.delete('/:checkInId/task/:taskId', (req: AuthRequest, res: Response) => {
  const { checkInId, taskId } = req.params;
  
  const checkIn = dailyCheckInModel.findById(checkInId);
  
  if (!checkIn) {
    return res.status(404).json({ message: 'Check-in not found' });
  }
  
  if (checkIn.userId !== req.userId) {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  const updatedTasks = checkIn.tasksCompleted.filter(id => id !== taskId);
  
  const updatedCheckIn = dailyCheckInModel.update(checkInId, {
    tasksCompleted: updatedTasks,
  });
  
  return res.json({ checkIn: updatedCheckIn });
});

export default router;
