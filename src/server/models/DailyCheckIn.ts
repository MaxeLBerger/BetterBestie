export interface DailyCheckIn {
  id: string;
  userId: string;
  userChallengeId: string;
  dayNumber: number;
  date: Date;
  tasksCompleted: string[];
  notes?: string;
  createdAt: Date;
}

// In-memory storage for demo purposes
const dailyCheckIns: DailyCheckIn[] = [];

export const dailyCheckInModel = {
  create: (checkIn: Omit<DailyCheckIn, 'id' | 'createdAt'>): DailyCheckIn => {
    const newCheckIn: DailyCheckIn = {
      ...checkIn,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date(),
    };
    dailyCheckIns.push(newCheckIn);
    return newCheckIn;
  },

  findById: (id: string): DailyCheckIn | undefined => {
    return dailyCheckIns.find(ci => ci.id === id);
  },

  findByUserChallengeId: (userChallengeId: string): DailyCheckIn[] => {
    return dailyCheckIns.filter(ci => ci.userChallengeId === userChallengeId);
  },

  findByUserChallengeAndDay: (userChallengeId: string, dayNumber: number): DailyCheckIn | undefined => {
    return dailyCheckIns.find(
      ci => ci.userChallengeId === userChallengeId && ci.dayNumber === dayNumber
    );
  },

  findTodayByUserId: (userId: string): DailyCheckIn | undefined => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return dailyCheckIns.find(
      ci => 
        ci.userId === userId && 
        ci.date >= today && 
        ci.date < tomorrow
    );
  },

  update: (id: string, updates: Partial<DailyCheckIn>): DailyCheckIn | undefined => {
    const index = dailyCheckIns.findIndex(ci => ci.id === id);
    if (index === -1) return undefined;
    
    dailyCheckIns[index] = { ...dailyCheckIns[index], ...updates };
    return dailyCheckIns[index];
  },

  getAll: (): DailyCheckIn[] => {
    return dailyCheckIns;
  },
};
