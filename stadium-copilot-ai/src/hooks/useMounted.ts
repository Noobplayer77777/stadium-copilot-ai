'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true if component is mounted on the client.
 * Useful for avoiding hydration mismatches with client-only state (e.g., theme, localStorage).
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
