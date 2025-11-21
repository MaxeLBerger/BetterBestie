import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

interface LayoutProps {
  user: {
    email: string;
    name?: string;
  };
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout }) => {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-content">
          <h1 className="app-title">✨ GlowUp Challenge</h1>
          <button className="app-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>
      <main className="app-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
