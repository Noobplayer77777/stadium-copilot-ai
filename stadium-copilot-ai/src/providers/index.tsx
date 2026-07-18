'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
