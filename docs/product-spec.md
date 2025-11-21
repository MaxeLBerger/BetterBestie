# GlowUp Challenge - Product Specification

## Overview

GlowUp Challenge is a 30-day wellness and personal development app designed for women aged 20-40. The app provides daily guided tasks, tracks progress, and enables accountability through private "bestie" circles.

## Core Concepts

### Challenge
A structured 30-day program with daily tasks across multiple wellness categories. Each challenge has:
- Name and description
- Duration (30 days for GlowUp Challenge)
- Start date flexibility (users choose their cohort/start date)
- Daily tasks organized by day (Day 1 through Day 30)

### Day Task
A specific activity or habit to complete on a given day. Each task has:
- Title and description
- Category (Hydration, Exercise, Learning, Meditation, Nutrition, Sleep, etc.)
- Day number (1-30)
- Emoji icon for visual appeal

### User Challenge
Represents a user's participation in a challenge. Tracks:
- Which challenge the user is doing
- Start date (cohort date)
- Current day number
- Completion status
- Streak information

### Daily Check-In
Records a user's completion of tasks for a specific day. Tracks:
- Date of check-in
- Tasks completed
- Notes/reflections (optional)

## User Flows

### 1. Landing Page
**Purpose:** Welcome new users and explain the challenge

**Elements:**
- Hero section with tagline: "Transform in 30 Days"
- Brief explanation of the GlowUp Challenge concept
- Visual preview of daily tasks
- Social proof (testimonials, participant count)
- Clear CTAs: "Start Your Journey" → Register

### 2. Sign-Up and Cohort Selection
**Purpose:** Create account and choose when to start

**Flow:**
1. User enters name (optional), email, password
2. After account creation, user selects cohort (start date):
   - "Start Today" (immediate)
   - "Start Monday" (next upcoming Monday)
   - "Start Next Month" (1st of next month)
3. System creates UserChallenge with selected start date
4. Redirect to Today view

**Technical:**
- POST /api/auth/register creates User
- POST /api/user-challenges creates UserChallenge with cohort date

### 3. Today View - Daily Task & Check-In
**Purpose:** Show today's tasks and enable check-in

**Layout:**
- Header: "Day X of 30" with current date
- Progress indicator: X/Y tasks completed today
- Task cards showing:
  - Emoji + Category
  - Task description
  - Checkbox or "Mark as done" button
  - Completion status (pending/done)
- Encouraging message based on progress

**Behavior:**
- On page load: GET /api/user-challenges/current and GET /api/check-ins/today
- Calculate current day based on start date
- Show tasks for current day only
- User clicks "Mark as done" → POST /api/check-ins with task ID
- Update UI to show task as completed
- If all tasks done, show celebration message

### 4. Progress View
**Purpose:** Show overall progress, streaks, and upcoming tasks

**Layout:**
- Summary cards:
  - Current streak (days in a row with check-ins)
  - Days completed (X/30)
  - Total tasks completed
- Week calendar view showing which days are complete
- Upcoming tasks preview (next 3 days)
- Achievements/milestones (e.g., "7-day streak!")

**Technical:**
- GET /api/user-challenges/current for streak and progress
- GET /api/check-ins for historical data
- Streak logic: count consecutive days with at least one task completed

### 5. Besties View (Future - Out of Scope for v1)
**Purpose:** View accountability partners' progress

**Note:** V1 will show placeholder "Coming soon" message

### 6. More/Settings View
**Purpose:** User settings and account management

**Elements:**
- Profile information (name, email)
- Logout button
- App information

## Data Model

### User
```typescript
interface User {
  id: string;
  email: string;
  password: string; // hashed
  name?: string;
  createdAt: Date;
}
```

### Challenge
```typescript
interface Challenge {
  id: string;
  name: string;
  description: string;
  durationDays: number; // 30
  category: string; // "wellness", "fitness", etc.
  createdAt: Date;
}
```

### DayTask
```typescript
interface DayTask {
  id: string;
  challengeId: string;
  dayNumber: number; // 1-30
  title: string;
  description: string;
  category: string; // "Hydration", "Exercise", etc.
  icon: string; // emoji
}
```

### UserChallenge
```typescript
interface UserChallenge {
  id: string;
  userId: string;
  challengeId: string;
  startDate: Date; // cohort date chosen by user
  status: 'active' | 'completed' | 'paused';
  currentStreak: number;
  longestStreak: number;
  createdAt: Date;
}
```

### DailyCheckIn
```typescript
interface DailyCheckIn {
  id: string;
  userId: string;
  userChallengeId: string;
  dayNumber: number;
  date: Date; // actual date of check-in
  tasksCompleted: string[]; // array of DayTask IDs
  notes?: string;
  createdAt: Date;
}
```

## API Endpoints

### Authentication (Already Implemented)
- POST /api/auth/register - Create account
- POST /api/auth/login - Login
- POST /api/auth/logout - Logout
- GET /api/auth/me - Get current user

### Challenges
- GET /api/challenges - List all challenges
- GET /api/challenges/:id - Get challenge details
- GET /api/challenges/:id/tasks - Get all tasks for a challenge

### User Challenges
- POST /api/user-challenges - Start a challenge (with cohort date)
- GET /api/user-challenges/current - Get user's active challenge
- GET /api/user-challenges/:id - Get specific user challenge
- GET /api/user-challenges/:id/progress - Get detailed progress stats

### Check-Ins
- POST /api/check-ins - Submit a check-in
- GET /api/check-ins/today - Get today's check-in
- GET /api/check-ins - Get all check-ins for current challenge
- GET /api/check-ins/streak - Get current streak info

## Business Logic

### Current Day Calculation
```
currentDay = Math.floor((today - startDate) / 86400000) + 1
```
- If currentDay > 30, challenge is complete
- If currentDay < 1, challenge hasn't started yet

### Streak Calculation
- Streak = consecutive days with at least 1 task completed
- Resets to 0 if a day is missed
- Only counts days since start date (doesn't penalize future days)

### Task Completion
- A day is "complete" if at least 1 task is checked in
- Partial completion is allowed (user can complete 3 of 5 tasks)
- Tasks can be checked in late (but this might break streak)

## UI/UX Guidelines

### Design System
- Mobile-first, responsive design
- Primary color: #6366f1 (indigo)
- Secondary color: #8b5cf6 (purple)
- Use emoji icons for visual appeal and friendliness
- Card-based layouts
- Bottom navigation for main sections

### Tone & Voice
- Encouraging and supportive
- Gentle accountability (not harsh or judgmental)
- Celebrate small wins
- Use phrases like "You've got this!", "Great job!", "Keep it up!"

### Empty States
- If no challenge started: Show CTA to start a challenge
- If challenge not started yet: Show countdown to start date
- If challenge completed: Show completion celebration and option to restart

## Success Metrics (for future tracking)
- Daily active users (DAU)
- Task completion rate
- Streak retention (% of users maintaining 7+ day streaks)
- Challenge completion rate (% who finish all 30 days)
- Cohort retention curves

## Future Enhancements (Post-V1)
- Bestie/accountability features (friend connections, shared progress)
- Social proof & sharing cards
- Push notifications for daily reminders
- Multiple challenge types beyond GlowUp
- Premium features (personalized challenges, coaching)
- Admin dashboard for challenge management
