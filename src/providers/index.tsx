'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import { Toaster } from '@/components/layout/Toaster';

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
