import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';
import { createUserDocument } from './db';
import type { UserRole } from '@/types';

// --- MOCK FALLBACK STATE ---
let mockCurrentUser: { uid: string; email: string } | null = null;
let mockAuthListeners: ((user: { uid: string; email: string } | null) => void)[] = [];

const notifyMockListeners = () => {
  mockAuthListeners.forEach(listener => listener(mockCurrentUser));
};

if (typeof window !== 'undefined' && !isFirebaseConfigured) {
  const savedUser = localStorage.getItem('mock_current_user');
  if (savedUser) {
    mockCurrentUser = JSON.parse(savedUser);
  }
}

// --- AUTH FUNCTIONS ---

export const loginWithEmail = async (email: string, password: string) => {
  if (isFirebaseConfigured && auth) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } else {
    // Mock Login
    if (email === 'admin@stadiumcopilot.com' && password === 'admin123') {
      mockCurrentUser = { uid: 'mock-admin-id', email };
      localStorage.setItem('mock_current_user', JSON.stringify(mockCurrentUser));
      notifyMockListeners();
      return mockCurrentUser;
    } else {
      // Check mock DB for other users
      const mockDbStr = localStorage.getItem('stadium_copilot_mock_db');
      if (mockDbStr) {
        const mockDb = JSON.parse(mockDbStr);
        const users = Object.values(mockDb.users || {}) as { id: string; email: string; mockPassword?: string }[];
        const user = users.find(u => u.email === email && u.mockPassword === password);
        if (user) {
          mockCurrentUser = { uid: user.id, email: user.email };
          localStorage.setItem('mock_current_user', JSON.stringify(mockCurrentUser));
          notifyMockListeners();
          return mockCurrentUser;
        }
      }
      throw new Error('Invalid email or password');
    }
  }
};

export const registerWithEmail = async (name: string, email: string, password: string, role: UserRole) => {
  if (isFirebaseConfigured && auth) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await createUserDocument(user.uid, {
      name,
      email,
      role,
      language: 'en'
    });
    
    return user;
  } else {
    // Mock Register
    const newUid = 'mock-user-' + Date.now();
    
    // Save to mock DB
    const mockDbStr = localStorage.getItem('stadium_copilot_mock_db') || '{}';
    const mockDb = JSON.parse(mockDbStr);
    if (!mockDb.users) mockDb.users = {};
    mockDb.users[newUid] = {
      id: newUid,
      name,
      email,
      role,
      language: 'en',
      mockPassword: password // Only for mock mode
    };
    localStorage.setItem('stadium_copilot_mock_db', JSON.stringify(mockDb));

    // Log them in
    mockCurrentUser = { uid: newUid, email };
    localStorage.setItem('mock_current_user', JSON.stringify(mockCurrentUser));
    notifyMockListeners();
    
    return mockCurrentUser;
  }
};

export const logout = async () => {
  if (isFirebaseConfigured && auth) {
    await firebaseSignOut(auth);
  } else {
    mockCurrentUser = null;
    localStorage.removeItem('mock_current_user');
    notifyMockListeners();
  }
};

export const onAuthStateChanged = (callback: (user: FirebaseUser | { uid: string; email: string } | null) => void) => {
  if (isFirebaseConfigured && auth) {
    return firebaseOnAuthStateChanged(auth, callback);
  } else {
    mockAuthListeners.push(callback);
    // Initial call
    callback(mockCurrentUser);
    return () => {
      mockAuthListeners = mockAuthListeners.filter(l => l !== callback);
    };
  }
};
