import React from 'react';

const Progress: React.FC = () => {
  return (
    <div className="page">
      <h1 className="page-title">Your Progress</h1>
      <p className="page-subtitle">Track your journey over time</p>

      <div className="card-grid">
        <div className="card stat-card">
          <div className="stat-value">21</div>
          <div className="stat-label">Day Streak</div>
        </div>

        <div className="card stat-card">
          <div className="stat-value">87%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">📊 Weekly Overview</h2>
        <div className="card-content">
          <p>You've completed 18 out of 21 daily challenges this week!</p>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Monday:</strong> <span className="badge badge-success">Complete</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Tuesday:</strong> <span className="badge badge-success">Complete</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Wednesday:</strong> <span className="badge badge-success">Complete</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Thursday:</strong> <span className="badge badge-primary">Partial</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Friday:</strong> <span className="badge badge-success">Complete</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Saturday:</strong> <span className="badge badge-success">Complete</span>
            </div>
            <div>
              <strong>Sunday:</strong> <span className="badge badge-primary">In Progress</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">🏆 Achievements</h2>
        <div className="card-content">
          <div style={{ marginBottom: '1rem' }}>
            <strong>🔥 Fire Starter:</strong> Complete 7 days in a row
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>💪 Consistency King:</strong> Complete 14 days in a row
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>✨ GlowUp Master:</strong> Complete 21 days in a row
          </div>
          <div style={{ marginBottom: '1rem', opacity: 0.5 }}>
            <strong>🎯 Perfect Week:</strong> Complete all tasks for 7 days (locked)
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">📈 Stats</h2>
        <div className="card-content">
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Most completed task:</strong> Hydration (98%)
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Needs improvement:</strong> Sleep (67%)
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Total points earned:</strong> 1,456
          </div>
          <div>
            <strong>Current level:</strong> Level 5 - Rising Star
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
