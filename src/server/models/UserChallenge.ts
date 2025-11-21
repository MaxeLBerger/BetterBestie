export interface UserChallenge {
  id: string;
  userId: string;
  challengeId: string;
  startDate: Date;
  status: 'active' | 'completed' | 'paused';
  currentStreak: number;
  longestStreak: number;
  createdAt: Date;
}

// In-memory storage for demo purposes
const userChallenges: UserChallenge[] = [];

export const userChallengeModel = {
  create: (userChallenge: Omit<UserChallenge, 'id' | 'createdAt' | 'currentStreak' | 'longestStreak'>): UserChallenge => {
    const newUserChallenge: UserChallenge = {
      ...userChallenge,
      id: Math.random().toString(36).substring(2, 11),
      currentStreak: 0,
      longestStreak: 0,
      createdAt: new Date(),
    };
    userChallenges.push(newUserChallenge);
    return newUserChallenge;
  },

  findById: (id: string): UserChallenge | undefined => {
    return userChallenges.find(uc => uc.id === id);
  },

  findByUserId: (userId: string): UserChallenge[] => {
    return userChallenges.filter(uc => uc.userId === userId);
  },

  findActiveByUserId: (userId: string): UserChallenge | undefined => {
    return userChallenges.find(uc => uc.userId === userId && uc.status === 'active');
  },

  update: (id: string, updates: Partial<UserChallenge>): UserChallenge | undefined => {
    const index = userChallenges.findIndex(uc => uc.id === id);
    if (index === -1) return undefined;
    
    userChallenges[index] = { ...userChallenges[index], ...updates };
    return userChallenges[index];
  },

  getAll: (): UserChallenge[] => {
    return userChallenges;
  },
};
