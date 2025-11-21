import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="landing-container">
      <div className="landing-hero">
        <h1 className="landing-title">✨ Transform in 30 Days</h1>
        <p className="landing-subtitle">
          Join the GlowUp Challenge and build life-changing habits through daily guided tasks
        </p>
        <Link to="/register" className="btn btn-primary btn-large">
          Start Your Journey
        </Link>
      </div>

      <div className="landing-section">
        <h2 className="section-title">What You'll Do</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">💧</div>
            <h3>Hydration</h3>
            <p>Stay hydrated with daily water intake goals</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏃</div>
            <h3>Exercise</h3>
            <p>Move your body with fun, achievable activities</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧘</div>
            <h3>Mindfulness</h3>
            <p>Practice meditation and mindful breathing</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🥗</div>
            <h3>Nutrition</h3>
            <p>Nourish your body with healthy meals</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Learning</h3>
            <p>Grow your mind with daily learning</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">😴</div>
            <h3>Rest</h3>
            <p>Prioritize quality sleep and recovery</p>
          </div>
        </div>
      </div>

      <div className="landing-section landing-how">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Choose Your Start Date</h3>
            <p>Pick a cohort that works for you - start today, next Monday, or next month</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Complete Daily Tasks</h3>
            <p>Check in each day and mark tasks as complete. Build your streak!</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Track Your Progress</h3>
            <p>Watch your stats grow and celebrate your achievements</p>
          </div>
        </div>
      </div>

      <div className="landing-section landing-cta">
        <h2 className="section-title">Ready to Glow Up?</h2>
        <p className="cta-subtitle">
          Join thousands of women transforming their lives, one day at a time
        </p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary btn-large">
            Create Free Account
          </Link>
          <Link to="/login" className="btn btn-secondary btn-large">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
