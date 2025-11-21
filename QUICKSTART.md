# Quick Start Guide - GlowUp Challenge

Get the GlowUp Challenge app running in 5 minutes!

## Prerequisites

- Node.js v18 or higher
- npm or yarn

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

```bash
cp .env.example .env
```

The default values in `.env.example` are fine for development:
- Server runs on port 3001
- Client runs on port 3000
- JWT secret is set (change for production!)

### 3. Start the Application

```bash
npm run dev
```

This starts both the backend server and frontend client.

### 4. Open in Browser

Navigate to: **http://localhost:3000**

## What You'll See

1. **Landing Page** - Marketing page with "Start Your Journey" button
2. **Registration** - Create your account
3. **Cohort Selection** - Choose when to start (Today, Next Monday, or Next Month)
4. **Today View** - Your daily tasks to complete
5. **Progress View** - Track your streak and achievements

## Test the App

### Create an Account
1. Click "Start Your Journey"
2. Enter name (optional), email, and password
3. Click "Create Account"

### Choose Your Start Date
1. Select "Start Today" for immediate access
2. Click "Start Challenge"

### Complete Your First Task
1. You'll see 4 tasks for Day 1
2. Click "Mark as Done" on any task
3. Watch the progress counter update!

### Check Your Progress
1. Tap the "Progress" tab in the bottom navigation
2. See your streak (should be 1 after completing a task)
3. View achievements and upcoming tasks

## Understanding the Challenge

### Days 1-10: Foundation Building
- Basic hydration, exercise, meditation, and nutrition tasks
- 4 tasks per day

### Days 11-20: Building Momentum
- More challenging tasks
- Added learning component
- 5 tasks per day

### Days 21-30: Mastery
- Most advanced tasks
- All 6 categories including sleep
- 6 tasks per day

### Categories
- 💧 **Hydration** - Daily water intake
- 🏃 **Exercise** - Physical activity
- 📚 **Learning** - Educational content
- 🧘 **Meditation** - Mindfulness practice
- 🥗 **Nutrition** - Healthy eating
- 😴 **Sleep** - Rest and recovery

## Streaks & Achievements

Complete at least 1 task each day to maintain your streak!

**Achievements:**
- 🔥 Fire Starter - 7 day streak
- 💪 Consistency Champion - 14 day streak
- ✨ GlowUp Master - 21 day streak
- 🏆 Challenge Complete - 30 day streak

## Development Commands

```bash
# Start both client and server
npm run dev

# Start only the server (port 3001)
npm run dev:server

# Start only the client (port 3000)
npm run dev:client

# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### Port Already in Use
If you see "Port 3000 (or 3001) already in use":
1. Stop other applications using those ports
2. Or change the ports in `.env` and `vite.config.ts`

### Server Won't Start
1. Make sure you ran `npm install`
2. Check that Node.js version is 18+: `node --version`
3. Make sure `.env` file exists

### Can't See Tasks
1. Make sure the server is running (check console for "Server running on port 3001")
2. Check that you've selected a cohort after registration
3. Refresh the page

### Data Disappeared
The app uses in-memory storage. Data resets when the server restarts. This is normal in development mode.

## Next Steps

- Complete a task each day to build your streak
- Explore the Progress view to track your journey
- Check out `docs/product-spec.md` for complete feature documentation
- Read `IMPLEMENTATION_NOTES.md` for technical details

## Need Help?

- Check `README.md` for full documentation
- Review `IMPLEMENTATION_NOTES.md` for technical details
- See `docs/product-spec.md` for product requirements

Happy Glowing! ✨
