import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import challengeRoutes from './routes/challenges';
import userChallengeRoutes from './routes/userChallenges';
import checkInRoutes from './routes/checkIns';
import { seedData } from './seedData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Initialize seed data
seedData();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/user-challenges', userChallengeRoutes);
app.use('/api/check-ins', checkInRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'GlowUp Challenge API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
