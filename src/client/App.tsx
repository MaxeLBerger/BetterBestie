import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import CohortSelection from './pages/CohortSelection';
import Today from './pages/Today';
import Progress from './pages/Progress';
import Besties from './pages/Besties';
import More from './pages/More';
import Layout from './components/Layout';

interface User {
  id: string;
  email: string;
  name?: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasActiveChallenge, setHasActiveChallenge] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      checkActiveChallenge();
    }
  }, [user]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkActiveChallenge = async () => {
    try {
      const response = await fetch('/api/user-challenges/current', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setHasActiveChallenge(!!data.userChallenge);
      }
    } catch (error) {
      console.error('Challenge check failed:', error);
      setHasActiveChallenge(false);
    }
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      setHasActiveChallenge(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : hasActiveChallenge === false ? (
          <>
            <Route path="/cohort-selection" element={<CohortSelection />} />
            <Route path="*" element={<Navigate to="/cohort-selection" replace />} />
          </>
        ) : (
          <Route element={<Layout user={user} onLogout={handleLogout} />}>
            <Route path="/" element={<Navigate to="/today" replace />} />
            <Route path="/today" element={<Today />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/besties" element={<Besties />} />
            <Route path="/more" element={<More />} />
            <Route path="*" element={<Navigate to="/today" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
