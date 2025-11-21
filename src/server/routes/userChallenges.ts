import express, { Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { userChallengeModel } from '../models/UserChallenge';
import { challengeModel } from '../models/Challenge';
import { dailyCheckInModel } from '../models/DailyCheckIn';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Create a new user challenge (start a challenge)
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { challengeId, startDate } = req.body;
    
    if (!challengeId || !startDate) {
      return res.status(400).json({ message: 'Challenge ID and start date are required' });
    }
    
    const challenge = challengeModel.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    
    // Check if user already has an active challenge
    const existingChallenge = userChallengeModel.findActiveByUserId(req.userId!);
    if (existingChallenge) {
      return res.status(400).json({ message: 'You already have an active challenge' });
    }
    
    const userChallenge = userChallengeModel.create({
      userId: req.userId!,
      challengeId,
      startDate: new Date(startDate),
      status: 'active',
    });
    
    return res.status(201).json({ userChallenge });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get current active challenge for user
router.get('/current', (req: AuthRequest, res: Response) => {
  const userChallenge = userChallengeModel.findActiveByUserId(req.userId!);
  
  if (!userChallenge) {
    return res.json({ userChallenge: null });
  }
  
  const challenge = challengeModel.findById(userChallenge.challengeId);
  
  // Calculate current day
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(userChallenge.startDate);
  startDate.setHours(0, 0, 0, 0);
  const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const currentDay = daysDiff + 1;
  
  // Get all check-ins for this challenge
  const checkIns = dailyCheckInModel.findByUserChallengeId(userChallenge.id);
  const daysCompleted = checkIns.length;
  
  // Calculate streak
  const streak = calculateStreak(checkIns, startDate);
  
  // Update streak in user challenge if changed
  if (streak !== userChallenge.currentStreak) {
    userChallengeModel.update(userChallenge.id, {
      currentStreak: streak,
      longestStreak: Math.max(streak, userChallenge.longestStreak),
    });
  }
  
  return res.json({
    userChallenge: {
      ...userChallenge,
      currentStreak: streak,
      longestStreak: Math.max(streak, userChallenge.longestStreak),
    },
    challenge,
    currentDay,
    daysCompleted,
    totalDays: challenge?.durationDays || 30,
  });
});

// Get specific user challenge
router.get('/:id', (req: AuthRequest, res: Response) => {
  const userChallenge = userChallengeModel.findById(req.params.id);
  
  if (!userChallenge) {
    return res.status(404).json({ message: 'User challenge not found' });
  }
  
  if (userChallenge.userId !== req.userId) {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  const challenge = challengeModel.findById(userChallenge.challengeId);
  return res.json({ userChallenge, challenge });
});

// Helper function to calculate streak
function calculateStreak(checkIns: any[], startDate: Date): number {
  if (checkIns.length === 0) return 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Sort check-ins by day number descending
  const sortedCheckIns = [...checkIns].sort((a, b) => b.dayNumber - a.dayNumber);
  
  // Calculate expected day number for today
  const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const currentDay = daysDiff + 1;
  
  let streak = 0;
  let expectedDay = currentDay;
  
  // Check if today or yesterday has a check-in (streak is still active)
  const hasRecentCheckIn = sortedCheckIns.some(ci => 
    ci.dayNumber === currentDay || ci.dayNumber === currentDay - 1
  );
  
  if (!hasRecentCheckIn && currentDay > 1) {
    return 0; // Streak is broken
  }
  
  // Count consecutive days backwards from current day
  for (const checkIn of sortedCheckIns) {
    if (checkIn.dayNumber === expectedDay || checkIn.dayNumber === expectedDay - 1) {
      streak++;
      expectedDay = checkIn.dayNumber - 1;
    } else if (checkIn.dayNumber < expectedDay - 1) {
      break; // Gap in streak
    }
  }
  
  return streak;
}

export default router;
