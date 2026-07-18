'use client';

import { useState } from 'react';

interface UseLocalStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

/**
 * A useState-like hook that persists state in localStorage.
 * Falls back gracefully if localStorage is unavailable (e.g., SSR).
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const { serializer = JSON.stringify, deserializer = JSON.parse } = options;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? deserializer(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serializer(valueToStore));
      }
    } catch (error) {
      console.warn(`[useLocalStorage] Failed to set key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`[useLocalStorage] Failed to remove key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
}
