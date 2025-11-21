import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <NavLink
        to="/today"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="nav-icon">📅</div>
        <div className="nav-label">Today</div>
      </NavLink>
      <NavLink
        to="/progress"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="nav-icon">📊</div>
        <div className="nav-label">Progress</div>
      </NavLink>
      <NavLink
        to="/besties"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="nav-icon">👥</div>
        <div className="nav-label">Besties</div>
      </NavLink>
      <NavLink
        to="/more"
        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="nav-icon">⚙️</div>
        <div className="nav-label">More</div>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
