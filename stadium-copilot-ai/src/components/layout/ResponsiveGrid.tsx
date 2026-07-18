import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

export function ResponsiveGrid({
  children,
  columns = 3,
  className,
  ...props
}: ResponsiveGridProps) {
  return (
    <div
      className={cn(
        'grid gap-4 md:gap-6',
        {
          'grid-cols-1': columns === 1,
          'grid-cols-1 sm:grid-cols-2': columns === 2,
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3': columns === 3,
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4': columns === 4,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
