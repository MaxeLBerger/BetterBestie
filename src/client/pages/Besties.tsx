import React from 'react';

const Besties: React.FC = () => {
  return (
    <div className="page">
      <h1 className="page-title">Your Besties</h1>
      <p className="page-subtitle">Connect with friends on their GlowUp journey</p>

      <div className="card">
        <h2 className="card-title">🤝 Friend Requests</h2>
        <div className="card-content">
          <p>You have 2 pending friend requests</p>
        </div>
      </div>

      <ul className="list">
        <li className="list-item">
          <div className="list-item-avatar">SA</div>
          <div className="list-item-content">
            <div className="list-item-title">Sarah Anderson</div>
            <div className="list-item-subtitle">
              🔥 15 day streak · Level 4
            </div>
          </div>
        </li>

        <li className="list-item">
          <div className="list-item-avatar">MJ</div>
          <div className="list-item-content">
            <div className="list-item-title">Mike Johnson</div>
            <div className="list-item-subtitle">
              🔥 28 day streak · Level 7
            </div>
          </div>
        </li>

        <li className="list-item">
          <div className="list-item-avatar">EW</div>
          <div className="list-item-content">
            <div className="list-item-title">Emily Wilson</div>
            <div className="list-item-subtitle">
              🔥 42 day streak · Level 10
            </div>
          </div>
        </li>

        <li className="list-item">
          <div className="list-item-avatar">DB</div>
          <div className="list-item-content">
            <div className="list-item-title">David Brown</div>
            <div className="list-item-subtitle">
              🔥 7 day streak · Level 2
            </div>
          </div>
        </li>

        <li className="list-item">
          <div className="list-item-avatar">LM</div>
          <div className="list-item-content">
            <div className="list-item-title">Lisa Martinez</div>
            <div className="list-item-subtitle">
              🔥 35 day streak · Level 8
            </div>
          </div>
        </li>
      </ul>

      <div className="card">
        <h2 className="card-title">🏆 Leaderboard</h2>
        <div className="card-content">
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>1. Emily Wilson</strong> - 2,456 points
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>2. Lisa Martinez</strong> - 2,103 points
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>3. Mike Johnson</strong> - 1,887 points
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>4. You</strong> - 1,456 points
          </div>
          <div>
            <strong>5. Sarah Anderson</strong> - 1,234 points
          </div>
        </div>
      </div>
    </div>
  );
};

export default Besties;
