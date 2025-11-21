export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
}

// In-memory storage for demo purposes
// In production, this should be replaced with a database
const users: User[] = [];

export const userModel = {
  create: (user: Omit<User, 'id' | 'createdAt'>): User => {
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    users.push(newUser);
    return newUser;
  },

  findByEmail: (email: string): User | undefined => {
    return users.find(user => user.email === email);
  },

  findById: (id: string): User | undefined => {
    return users.find(user => user.id === id);
  },

  getAll: (): User[] => {
    return users;
  },
};
