import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Challenge {
  id: string;
  name: string;
  description: string;
  durationDays: number;
}

const CohortSelection: React.FC = () => {
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchChallenge();
  }, []);

  const fetchChallenge = async () => {
    try {
      const response = await fetch('/api/challenges', {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.challenges && data.challenges.length > 0) {
        setChallenge(data.challenges[0]);
      }
    } catch (err) {
      setError('Failed to load challenge');
    } finally {
      setLoading(false);
    }
  };

  const getStartDateOptions = () => {
    const today = new Date();
    const options = [];

    // Option 1: Start today
    options.push({
      value: today.toISOString().split('T')[0],
      label: 'Start Today',
      description: 'Begin your journey right now',
    });

    // Option 2: Start next Monday
    const nextMonday = new Date(today);
    const daysUntilMonday = (8 - today.getDay()) % 7 || 7;
    nextMonday.setDate(today.getDate() + daysUntilMonday);
    options.push({
      value: nextMonday.toISOString().split('T')[0],
      label: 'Start Next Monday',
      description: nextMonday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    });

    // Option 3: Start next month
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    options.push({
      value: nextMonth.toISOString().split('T')[0],
      label: 'Start Next Month',
      description: nextMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    });

    return options;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !challenge) {
      setError('Please select a start date');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/user-challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          challengeId: challenge.id,
          startDate: selectedDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/today');
      } else {
        setError(data.message || 'Failed to start challenge');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div>Loading...</div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">No Challenge Available</h1>
          <p>Please contact support.</p>
        </div>
      </div>
    );
  }

  const dateOptions = getStartDateOptions();

  return (
    <div className="auth-container">
      <div className="auth-card cohort-card">
        <h1 className="auth-title">🎯 Choose Your Cohort</h1>
        <p className="auth-subtitle">{challenge.name}</p>
        <p className="cohort-description">{challenge.description}</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="cohort-options">
            {dateOptions.map((option) => (
              <label
                key={option.value}
                className={`cohort-option ${selectedDate === option.value ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="startDate"
                  value={option.value}
                  checked={selectedDate === option.value}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <div className="cohort-option-content">
                  <div className="cohort-option-label">{option.label}</div>
                  <div className="cohort-option-description">{option.description}</div>
                </div>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting || !selectedDate}
          >
            {submitting ? 'Starting Challenge...' : 'Start Challenge'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CohortSelection;
