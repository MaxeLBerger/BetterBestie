import express, { Request, Response } from 'express';
import { challengeModel } from '../models/Challenge';
import { dayTaskModel } from '../models/DayTask';

const router = express.Router();

// Get all challenges
router.get('/', (_req: Request, res: Response) => {
  const challenges = challengeModel.getAll();
  return res.json({ challenges });
});

// Get specific challenge
router.get('/:id', (req: Request, res: Response) => {
  const challenge = challengeModel.findById(req.params.id);
  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' });
  }
  return res.json({ challenge });
});

// Get all tasks for a challenge
router.get('/:id/tasks', (req: Request, res: Response) => {
  const challenge = challengeModel.findById(req.params.id);
  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' });
  }
  
  const tasks = dayTaskModel.findByChallengeId(req.params.id);
  return res.json({ tasks });
});

// Get tasks for a specific day
router.get('/:id/tasks/day/:dayNumber', (req: Request, res: Response) => {
  const challenge = challengeModel.findById(req.params.id);
  if (!challenge) {
    return res.status(404).json({ message: 'Challenge not found' });
  }
  
  const dayNumber = parseInt(req.params.dayNumber);
  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > challenge.durationDays) {
    return res.status(400).json({ message: 'Invalid day number' });
  }
  
  const tasks = dayTaskModel.findByChallengeAndDay(req.params.id, dayNumber);
  return res.json({ tasks });
});

export default router;
