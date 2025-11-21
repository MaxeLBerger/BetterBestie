import React, { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

interface ChallengeData {
  currentDay: number;
  totalDays: number;
  challenge: {
    name: string;
  };
}

const Today: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [challengeData, setChallengeData] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);

  useEffect(() => {
    fetchTodayData();
  }, []);

  const fetchTodayData = async () => {
    try {
      // Get current challenge info
      const challengeResponse = await fetch('/api/user-challenges/current', {
        credentials: 'include',
      });
      const challengeData = await challengeResponse.json();
      
      if (!challengeData.userChallenge) {
        setLoading(false);
        return;
      }

      setChallengeData({
        currentDay: challengeData.currentDay,
        totalDays: challengeData.totalDays,
        challenge: challengeData.challenge,
      });

      // Get today's tasks
      const tasksResponse = await fetch(
        `/api/challenges/${challengeData.userChallenge.challengeId}/tasks/day/${challengeData.currentDay}`,
        { credentials: 'include' }
      );
      const tasksData = await tasksResponse.json();
      setTasks(tasksData.tasks || []);

      // Get today's check-in
      const checkInResponse = await fetch('/api/check-ins/today', {
        credentials: 'include',
      });
      const checkInData = await checkInResponse.json();
      
      if (checkInData.checkIn) {
        setCompletedTaskIds(checkInData.checkIn.tasksCompleted || []);
      }
    } catch (error) {
      console.error('Failed to fetch today data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId: string) => {
    if (submitting) return;

    const isCompleted = completedTaskIds.includes(taskId);

    if (isCompleted) {
      // TODO: Implement undo functionality
      return;
    }

    setSubmitting(taskId);

    try {
      const response = await fetch('/api/check-ins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          taskId,
          dayNumber: challengeData?.currentDay,
        }),
      });

      if (response.ok) {
        setCompletedTaskIds([...completedTaskIds, taskId]);
      }
    } catch (error) {
      console.error('Failed to check in task:', error);
    } finally {
      setSubmitting(null);
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
        <p className="page-subtitle">Please start a challenge to begin tracking.</p>
      </div>
    );
  }

  const completedCount = completedTaskIds.length;
  const totalCount = tasks.length;
  const allCompleted = completedCount === totalCount && totalCount > 0;

  return (
    <div className="page">
      <div className="today-header">
        <h1 className="page-title">
          Day {challengeData.currentDay} of {challengeData.totalDays}
        </h1>
        <p className="page-subtitle">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="card stat-card">
        <div className="stat-value">
          {completedCount}/{totalCount}
        </div>
        <div className="stat-label">Tasks Completed</div>
      </div>

      {allCompleted && (
        <div className="card success-card">
          <div className="success-message">
            🎉 Amazing! You've completed all tasks for today!
          </div>
        </div>
      )}

      <div className="card-grid">
        {tasks.map((task) => {
          const isCompleted = completedTaskIds.includes(task.id);
          const isSubmitting = submitting === task.id;

          return (
            <div key={task.id} className={`card task-card ${isCompleted ? 'completed' : ''}`}>
              <h2 className="card-title">
                {task.icon} {task.title}
              </h2>
              <div className="card-content">
                <p>{task.description}</p>
                <button
                  className={`btn ${isCompleted ? 'btn-completed' : 'btn-primary'}`}
                  onClick={() => handleToggleTask(task.id)}
                  disabled={isCompleted || isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : isCompleted ? '✓ Completed' : 'Mark as Done'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {tasks.length === 0 && (
        <div className="card">
          <div className="card-content">
            <p>No tasks available for today.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Today;
