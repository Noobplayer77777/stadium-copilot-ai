'use client';

import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Menu, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NotificationBell } from '@/components/shared/NotificationBell';
import { RoleBadge } from '@/components/shared/RoleBadge';
import { useSidebarStore } from '@/store';
import { getInitials } from '@/lib/utils';

interface TopNavBarProps {
  title?: string;
  children?: React.ReactNode;
}

export function TopNavBar({ title, children }: TopNavBarProps) {
  const { toggleMobile } = useSidebarStore();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/80 backdrop-blur-md px-4 gap-3">
      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={toggleMobile}
        className="md:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Title / Breadcrumb Area */}
      <div className="flex-1 min-w-0">
        {title && (
          <h1 className="text-heading-sm truncate">{title}</h1>
        )}
        {children}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <NotificationBell />

        {/* User Menu */}
        <button
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[rgb(var(--secondary))] transition-colors duration-150"
          aria-label="User menu"
        >
          <Avatar size="sm">
            {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
            <AvatarFallback>
              {user ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex sm:flex-col sm:items-start sm:gap-1">
            <p className="text-sm font-medium leading-none">{user?.name ?? 'Guest'}</p>
            {user?.role ? (
              <RoleBadge role={user.role} className="scale-90 origin-left" />
            ) : (
              <p className="text-xs text-[rgb(var(--muted-foreground))]">User</p>
            )}
          </div>
          <ChevronDown className="h-3 w-3 text-[rgb(var(--muted-foreground))] hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
