'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { seedTestUsers } from '@/lib/firebase/seedTestUsers';
import type { User } from '@/types';
import { onAuthStateChanged, logout as firebaseLogout } from '@/lib/firebase/auth';
import { getUserDocument } from '@/lib/firebase/db';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Seed mock users for development/testing when Firebase config is absent
    seedTestUsers();
    const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch custom user document from Firestore (or mock DB) to get their role
        const userData = await getUserDocument(firebaseUser.uid);
        if (userData) {
          setUser(userData);
          // If they just logged in and are on the login/register page, route them
          if (pathname === '/login' || pathname === '/register') {
             router.push(`/${userData.role}/dashboard`);
          }
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const refreshUser = async () => {
    if (!user) return;
    const userData = await getUserDocument(user.id);
    if (userData) {
      setUser(userData);
    }
  };

  const logout = async () => {
    await firebaseLogout();
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('useAuth must be used within AuthProvider');
  return context;
};
