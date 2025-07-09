import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UIStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),
}));
