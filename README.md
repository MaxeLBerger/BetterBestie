# ✨ GlowUp Challenge

A TypeScript full-stack web application for the 30-day GlowUp Challenge. Help users transform their wellness routine through daily guided tasks across hydration, exercise, mindfulness, nutrition, learning, and sleep. Built with a mobile-first approach for an optimal experience on all devices.

## 🎯 Features

- **Landing Page**: Marketing page explaining the challenge with clear CTAs
- **Cohort Selection**: Users choose when to start (today, next Monday, or next month)
- **Authentication**: Secure email/password authentication with JWT tokens
- **Today View**: See current day's tasks and mark them as complete
- **Progress Tracking**: Monitor your streaks, achievements, and completion statistics
- **Besties**: (Coming soon) Connect with friends and accountability partners
- **More**: (Coming soon) Settings, profile, and preferences

## 🏗️ Project Structure

```
GlowUpChallenge/
├── src/
│   ├── client/              # Frontend React application
│   │   ├── components/      # Reusable React components
│   │   │   ├── BottomNav.tsx
│   │   │   └── Layout.tsx
│   │   ├── pages/           # Page components for routing
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Today.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── Besties.tsx
│   │   │   └── More.tsx
│   │   ├── styles/          # CSS stylesheets
│   │   │   └── index.css
│   │   ├── App.tsx          # Main app component with routing
│   │   ├── main.tsx         # React entry point
│   │   └── index.html       # HTML template
│   └── server/              # Backend Express application
│       ├── middleware/      # Express middleware
│       │   └── auth.ts
│       ├── models/          # Data models
│       │   └── User.ts
│       ├── routes/          # API route handlers
│       │   └── auth.ts
│       └── index.ts         # Server entry point
├── package.json
├── tsconfig.json            # TypeScript config for frontend
├── tsconfig.node.json       # TypeScript config for Vite
├── tsconfig.server.json     # TypeScript config for backend
├── vite.config.ts           # Vite configuration
├── .env.example             # Environment variables template
└── README.md

```

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server
- **CSS** - Custom styles with mobile-first design

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MaxeLBerger/BetterBestie.git
cd BetterBestie
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:client` - Start only the frontend dev server
- `npm run dev:server` - Start only the backend dev server
- `npm run build` - Build both frontend and backend for production
- `npm run build:client` - Build only the frontend
- `npm run build:server` - Build only the backend
- `npm start` - Run the production server

## 📱 Mobile-First Design

The application is designed with a mobile-first approach:
- Responsive layout that adapts to all screen sizes
- Bottom navigation bar for easy thumb access on mobile devices
- Touch-friendly UI elements
- Optimized performance for mobile networks

## 🔐 Authentication

The app uses JWT-based authentication:
- Passwords are hashed using bcrypt
- Tokens are stored in HTTP-only cookies for security
- Protected routes require valid authentication

## 🗄️ Data Storage

Currently, the app uses in-memory storage for demonstration purposes. Data includes:
- Users and authentication
- 30-day GlowUp Challenge with 150+ tasks
- User challenges and start dates
- Daily check-ins and task completions
- Streak calculations

⚠️ **Note**: Data resets when the server restarts. For production, integrate a database like PostgreSQL, MongoDB, or MySQL.

## 📚 Documentation

- **Product Specification**: See `docs/product-spec.md` for complete product requirements
- **Implementation Details**: See `IMPLEMENTATION_NOTES.md` for technical documentation
- **Agent Instructions**: See `docs/glowup-challenge-spec.md` for AI agent guidelines

## 🎨 Design System

The app uses a cohesive design system with:
- Custom CSS variables for theming
- Consistent spacing and typography
- Gradient accents for visual appeal
- Card-based layouts for content organization

## 🔧 Configuration

Environment variables (`.env`):
- `PORT` - Backend server port (default: 3001)
- `CLIENT_URL` - Frontend URL for CORS (default: http://localhost:3000)
- `JWT_SECRET` - Secret key for JWT signing (change in production!)
- `NODE_ENV` - Environment mode (development/production)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout current user
- `GET /api/auth/me` - Get current user info

### Health Check
- `GET /api/health` - API health check

## ✅ What's Included in v1

This is the first working version with the following flows fully implemented:

1. **Landing & Signup Flow**
   - Marketing landing page with feature showcase
   - User registration
   - Cohort selection (choose your start date)

2. **Today View**
   - Displays current day number (e.g., "Day 5 of 30")
   - Shows 4-6 tasks for the current day
   - One-click task completion
   - Progress tracking (X/Y tasks completed)
   - Success message when all tasks are done

3. **Progress View**
   - Current streak display
   - Days completed (X/30)
   - Achievement badges (7, 14, 21, 30 day milestones)
   - Upcoming tasks preview
   - Recent activity log

4. **Challenge Content**
   - 30-day GlowUp Challenge pre-loaded
   - 150+ wellness tasks across 6 categories
   - Tasks progress from basic (days 1-10) to advanced (days 21-30)

## 🚧 Coming in Future Versions

- Bestie/accountability features
- Social sharing cards
- Push notifications
- Profile editing
- Multiple challenge types
- Premium features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC License

## 🙏 Acknowledgments

Built with modern web technologies to provide a seamless user experience for personal growth tracking.