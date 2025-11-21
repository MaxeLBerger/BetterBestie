import React from 'react';

const More: React.FC = () => {
  return (
    <div className="page">
      <h1 className="page-title">More</h1>
      <p className="page-subtitle">Settings and additional features</p>

      <div className="card">
        <h2 className="card-title">⚙️ Settings</h2>
        <div className="card-content">
          <div style={{ marginBottom: '1rem' }}>
            <strong>Notifications</strong>
            <p style={{ marginTop: '0.25rem' }}>
              Configure your daily reminder settings
            </p>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Privacy</strong>
            <p style={{ marginTop: '0.25rem' }}>
              Control who can see your progress
            </p>
          </div>
          <div>
            <strong>Theme</strong>
            <p style={{ marginTop: '0.25rem' }}>
              Switch between light and dark mode
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">👤 Profile</h2>
        <div className="card-content">
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Name:</strong> John Doe
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Email:</strong> john.doe@example.com
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Member since:</strong> January 2025
          </div>
          <div>
            <strong>Current level:</strong> Level 5 - Rising Star
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">🎯 Challenge Categories</h2>
        <div className="card-content">
          <p>Customize which challenge categories appear on your daily list:</p>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              ✅ Hydration
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              ✅ Exercise
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              ✅ Learning
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              ✅ Meditation
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              ✅ Nutrition
            </div>
            <div>
              ✅ Sleep
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">ℹ️ About</h2>
        <div className="card-content">
          <p><strong>GlowUp Challenge</strong></p>
          <p style={{ marginTop: '0.5rem' }}>Version 1.0.0</p>
          <p style={{ marginTop: '0.5rem' }}>
            A mobile-first web app to help you build better habits and track your personal growth journey.
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">📞 Support</h2>
        <div className="card-content">
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Help Center:</strong> Get answers to common questions
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Contact Us:</strong> support@glowupchallenge.com
          </div>
          <div>
            <strong>Report a Bug:</strong> Help us improve the app
          </div>
        </div>
      </div>
    </div>
  );
};

export default More;
