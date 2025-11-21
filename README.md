# ✨ GlowUp Challenge

A TypeScript full-stack web application designed to help users track daily challenges, build better habits, and connect with friends on their personal growth journey. Built with a mobile-first approach for an optimal experience on all devices.

## 🎯 Features

- **Authentication**: Secure email/password authentication with JWT tokens
- **Today**: View and track daily challenges across multiple categories
- **Progress**: Monitor your streaks, achievements, and overall statistics
- **Besties**: Connect with friends and compete on the leaderboard
- **More**: Manage settings, profile, and app preferences

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

Currently, the app uses in-memory storage for demonstration purposes. In a production environment, you should integrate a database like:
- PostgreSQL
- MongoDB
- MySQL

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC License

## 🙏 Acknowledgments

Built with modern web technologies to provide a seamless user experience for personal growth tracking.