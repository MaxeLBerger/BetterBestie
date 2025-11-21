export interface Challenge {
  id: string;
  name: string;
  description: string;
  durationDays: number;
  category: string;
  createdAt: Date;
}

// In-memory storage for demo purposes
const challenges: Challenge[] = [];

export const challengeModel = {
  create: (challenge: Omit<Challenge, 'id' | 'createdAt'>): Challenge => {
    const newChallenge: Challenge = {
      ...challenge,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date(),
    };
    challenges.push(newChallenge);
    return newChallenge;
  },

  findById: (id: string): Challenge | undefined => {
    return challenges.find(challenge => challenge.id === id);
  },

  getAll: (): Challenge[] => {
    return challenges;
  },
};
