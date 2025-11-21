export interface DayTask {
  id: string;
  challengeId: string;
  dayNumber: number;
  title: string;
  description: string;
  category: string;
  icon: string;
}

// In-memory storage for demo purposes
const dayTasks: DayTask[] = [];

export const dayTaskModel = {
  create: (task: Omit<DayTask, 'id'>): DayTask => {
    const newTask: DayTask = {
      ...task,
      id: Math.random().toString(36).substring(2, 11),
    };
    dayTasks.push(newTask);
    return newTask;
  },

  findById: (id: string): DayTask | undefined => {
    return dayTasks.find(task => task.id === id);
  },

  findByChallengeId: (challengeId: string): DayTask[] => {
    return dayTasks.filter(task => task.challengeId === challengeId);
  },

  findByChallengeAndDay: (challengeId: string, dayNumber: number): DayTask[] => {
    return dayTasks.filter(
      task => task.challengeId === challengeId && task.dayNumber === dayNumber
    );
  },

  getAll: (): DayTask[] => {
    return dayTasks;
  },
};
