'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <div className={cn('flex items-center gap-1 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--secondary))] p-1', className)}>
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
            theme === value
              ? 'bg-[rgb(var(--card))] text-[rgb(var(--foreground))] shadow-sm'
              : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
          )}
          aria-label={`Set ${label} theme`}
          aria-pressed={theme === value}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}
