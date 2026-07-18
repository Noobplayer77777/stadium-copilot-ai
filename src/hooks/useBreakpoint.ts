'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks the current window width and returns responsive breakpoint booleans.
 * Uses a debounce to avoid excessive re-renders on resize.
 */
interface Breakpoints {
  isMobile: boolean;    // < 768px
  isTablet: boolean;    // 768px – 1023px
  isDesktop: boolean;   // >= 1024px
  width: number;
}

export function useBreakpoint(): Breakpoints {
  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setWidth(window.innerWidth), 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
}
