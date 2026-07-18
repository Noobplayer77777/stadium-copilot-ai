import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '@/types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  language: string;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLanguage: (code: string) => void;
  setRole: (role: UserRole) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      language: 'en',
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      setLanguage: (language) => {
        set({ language });
        const user = get().user;
        if (user) set({ user: { ...user, language } });
      },
      setRole: (role) => {
        const user = get().user;
        if (user) set({ user: { ...user, role } });
      },
    }),
    { name: 'stadium-copilot-user' }
  )
);
