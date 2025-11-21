import React, { useState, useEffect } from 'react';

interface UserChallengeData {
  currentDay: number;
  daysCompleted: number;
  totalDays: number;
  userChallenge: {
    currentStreak: number;
    longestStreak: number;
    startDate: string;
  };
  challenge: {
    name: string;
  };
}

interface CheckIn {
  dayNumber: number;
  tasksCompleted: string[];
  date: string;
}

interface Task {
  id: string;
  title: string;
  dayNumber: number;
}

const Progress: React.FC = () => {
  const [challengeData, setChallengeData] = useState<UserChallengeData | null>(null);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      // Get current challenge
      const challengeResponse = await fetch('/api/user-challenges/current', {
        credentials: 'include',
      });
      const data = await challengeResponse.json();
      
      if (!data.userChallenge) {
        setLoading(false);
        return;
      }

      setChallengeData(data);

      // Get all check-ins
      const checkInsResponse = await fetch('/api/check-ins', {
        credentials: 'include',
      });
      const checkInsData = await checkInsResponse.json();
      setCheckIns(checkInsData.checkIns || []);

      // Get upcoming tasks (next 3 days)
      const nextDays = [];
      for (let i = 1; i <= 3; i++) {
        const nextDay = data.currentDay + i;
        if (nextDay <= data.totalDays) {
          nextDays.push(nextDay);
        }
      }

      const tasksPromises = nextDays.map(day =>
        fetch(`/api/challenges/${data.userChallenge.challengeId}/tasks/day/${day}`, {
          credentials: 'include',
        }).then(res => res.json())
      );

      const tasksResults = await Promise.all(tasksPromises);
      const allUpcomingTasks = tasksResults.flatMap(result => result.tasks || []);
      setUpcomingTasks(allUpcomingTasks);

    } catch (error) {
      console.error('Failed to fetch progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!challengeData) {
    return (
      <div className="page">
        <h1 className="page-title">No Active Challenge</h1>
        <p className="page-subtitle">Please start a challenge to track progress.</p>
      </div>
    );
  }

  const completionRate = challengeData.totalDays > 0
    ? Math.round((challengeData.daysCompleted / challengeData.currentDay) * 100)
    : 0;

  const getAchievements = (streak: number) => {
    return [
      { 
        icon: '🔥', 
        name: 'Fire Starter', 
        description: 'Complete 7 days in a row',
        unlocked: streak >= 7 
      },
      { 
        icon: '💪', 
        name: 'Consistency Champion', 
        description: 'Complete 14 days in a row',
        unlocked: streak >= 14 
      },
      { 
        icon: '✨', 
        name: 'GlowUp Master', 
        description: 'Complete 21 days in a row',
        unlocked: streak >= 21 
      },
      { 
        icon: '🏆', 
        name: 'Challenge Complete', 
        description: 'Complete all 30 days',
        unlocked: challengeData.daysCompleted >= 30 
      },
    ];
  };

  const achievements = getAchievements(challengeData.userChallenge.currentStreak);

  return (
    <div className="page">
      <h1 className="page-title">Your Progress</h1>
      <p className="page-subtitle">Track your journey over time</p>

      <div className="card-grid">
        <div className="card stat-card">
          <div className="stat-value">{challengeData.userChallenge.currentStreak}</div>
          <div className="stat-label">Day Streak 🔥</div>
        </div>

        <div className="card stat-card">
          <div className="stat-value">
            {challengeData.daysCompleted}/{challengeData.totalDays}
          </div>
          <div className="stat-label">Days Completed</div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">📊 Challenge Overview</h2>
        <div className="card-content">
          <div className="progress-stats">
            <div className="progress-stat">
              <strong>Current Day:</strong> Day {challengeData.currentDay} of {challengeData.totalDays}
            </div>
            <div className="progress-stat">
              <strong>Completion Rate:</strong> {completionRate}%
            </div>
            <div className="progress-stat">
              <strong>Longest Streak:</strong> {challengeData.userChallenge.longestStreak} days
            </div>
            <div className="progress-stat">
              <strong>Started:</strong> {new Date(challengeData.userChallenge.startDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>

      {upcomingTasks.length > 0 && (
        <div className="card">
          <h2 className="card-title">🔮 Upcoming Tasks</h2>
          <div className="card-content">
            {upcomingTasks.slice(0, 6).map((task) => (
              <div key={task.id} className="upcoming-task">
                <strong>Day {task.dayNumber}:</strong> {task.title}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <h2 className="card-title">🏆 Achievements</h2>
        <div className="card-content">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <span className="achievement-icon">{achievement.icon}</span>
              <div className="achievement-info">
                <strong>{achievement.name}</strong>
                <div className="achievement-description">{achievement.description}</div>
              </div>
              {achievement.unlocked && <span className="achievement-badge">✓</span>}
            </div>
          ))}
        </div>
      </div>

      {checkIns.length > 0 && (
        <div className="card">
          <h2 className="card-title">📅 Recent Activity</h2>
          <div className="card-content">
            {checkIns
              .sort((a, b) => b.dayNumber - a.dayNumber)
              .slice(0, 7)
              .map((checkIn) => (
                <div key={checkIn.dayNumber} className="activity-item">
                  <strong>Day {checkIn.dayNumber}:</strong>{' '}
                  {checkIn.tasksCompleted.length} tasks completed
                  <span className="badge badge-success">✓</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
