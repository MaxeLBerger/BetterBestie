import React from 'react';

const Today: React.FC = () => {
  return (
    <div className="page">
      <h1 className="page-title">Today's Challenge</h1>
      <p className="page-subtitle">Complete your daily tasks to level up!</p>

      <div className="card stat-card">
        <div className="stat-value">3/5</div>
        <div className="stat-label">Tasks Completed</div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h2 className="card-title">💧 Hydration</h2>
          <div className="card-content">
            <p>Drink 8 glasses of water today</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-primary">In Progress</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">🏃 Exercise</h2>
          <div className="card-content">
            <p>30 minutes of physical activity</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-success">Completed</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">📚 Learning</h2>
          <div className="card-content">
            <p>Read for 20 minutes</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-primary">In Progress</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">🧘 Meditation</h2>
          <div className="card-content">
            <p>10 minutes of mindfulness</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-success">Completed</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">🥗 Nutrition</h2>
          <div className="card-content">
            <p>Eat a healthy meal</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-success">Completed</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">😴 Sleep</h2>
          <div className="card-content">
            <p>Get 8 hours of quality sleep</p>
            <div style={{ marginTop: '1rem' }}>
              <span className="badge badge-primary">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
