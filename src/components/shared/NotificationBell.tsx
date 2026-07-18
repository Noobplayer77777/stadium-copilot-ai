'use client';

import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotificationStore } from '@/store';

interface NotificationBellProps {
  className?: string;
}

export function NotificationBell({ className }: NotificationBellProps) {
  const { unreadCount } = useNotificationStore();

  return (
    <Button variant="ghost" size="icon-sm" className={`relative ${className || ''}`} aria-label={`${unreadCount} unread notifications`}>
      <Bell className="h-4 w-4" />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[rgb(var(--brand-secondary))] text-[10px] font-bold text-white">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </Button>
  );
}
