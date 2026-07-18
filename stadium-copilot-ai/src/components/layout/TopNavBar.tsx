'use client';

import React from 'react';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebarStore, useNotificationStore, useUserStore } from '@/store';
import { getInitials } from '@/lib/utils';

interface TopNavBarProps {
  title?: string;
  children?: React.ReactNode;
}

export function TopNavBar({ title, children }: TopNavBarProps) {
  const { toggleMobile } = useSidebarStore();
  const { unreadCount } = useNotificationStore();
  const { user } = useUserStore();
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
        <Button variant="ghost" size="icon-sm" className="relative" aria-label={`${unreadCount} unread notifications`}>
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[rgb(var(--brand-secondary))] text-[10px] font-bold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>

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
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium leading-none">{user?.name ?? 'Guest'}</p>
            <p className="text-xs text-[rgb(var(--muted-foreground))] capitalize">{user?.role ?? 'User'}</p>
          </div>
          <ChevronDown className="h-3 w-3 text-[rgb(var(--muted-foreground))] hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
