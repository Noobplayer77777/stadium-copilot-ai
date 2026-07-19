import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import type { User } from '@/types';

// Mock DB in LocalStorage
const MOCK_DB_KEY = 'stadium_copilot_mock_db';

const getMockDb = () => {
  if (typeof window === 'undefined') return {};
  const data = localStorage.getItem(MOCK_DB_KEY);
  return data ? JSON.parse(data) : {};
};

const saveMockDb = (data: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(MOCK_DB_KEY, JSON.stringify(data));
  }
};

export const createUserDocument = async (userId: string, userData: Partial<User>) => {
  if (isFirebaseConfigured && db) {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, userData, { merge: true });
    } catch (error) {
      console.error("Error creating user document", error);
      throw error;
    }
  } else {
    // Mock DB Fallback
    const mockDb = getMockDb();
    if (!mockDb.users) mockDb.users = {};
    mockDb.users[userId] = { ...mockDb.users[userId], ...userData, id: userId };
    saveMockDb(mockDb);
  }
};

export const getUserDocument = async (userId: string): Promise<User | null> => {
  if (isFirebaseConfigured && db) {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return { id: userSnap.id, ...userSnap.data() } as User;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user document", error);
      return null;
    }
  } else {
    // Mock DB Fallback
    const mockDb = getMockDb();
    const user = mockDb.users?.[userId];
    return user ? (user as User) : null;
  }
};

// Pre-seed admin user for Mock DB
if (typeof window !== 'undefined' && !isFirebaseConfigured) {
  const mockDb = getMockDb();
  if (!mockDb.users) mockDb.users = {};
  if (!mockDb.users['mock-admin-id']) {
    mockDb.users['mock-admin-id'] = {
      id: 'mock-admin-id',
      name: 'Admin User',
      email: 'admin@stadiumcopilot.com',
      role: 'organizer',
      language: 'en'
    };
    saveMockDb(mockDb);
  }
}
