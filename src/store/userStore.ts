import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Lightweight store for UI preferences (language, etc.).
 * Authentication state is managed by AuthProvider / React Context.
 * User identity comes from /auth/me via the real FastAPI backend.
 */
interface UserPrefsState {
  language: string;
  setLanguage: (code: string) => void;
}

export const useUserStore = create<UserPrefsState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    { name: 'stadium-copilot-prefs' }
  )
);
