'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Sparkles, Map, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

const tabsByRole: Record<UserRole, Array<{ href: string; label: string; icon: React.ElementType }>> = {
  fan: [
    { href: '/fan/dashboard', label: 'Home', icon: LayoutDashboard },
    { href: '/fan/navigate', label: 'Navigate', icon: Map },
    { href: '/fan/assistant', label: 'AI', icon: Sparkles },
    { href: '/fan/notifications', label: 'Alerts', icon: Bell },
    { href: '/fan/settings', label: 'Profile', icon: User },
  ],
  volunteer: [
    { href: '/volunteer/dashboard', label: 'Home', icon: LayoutDashboard },
    { href: '/volunteer/tasks', label: 'Tasks', icon: Map },
    { href: '/volunteer/assistant', label: 'AI', icon: Sparkles },
    { href: '/volunteer/incident', label: 'Report', icon: Bell },
    { href: '/volunteer/profile', label: 'Profile', icon: User },
  ],
  organizer: [
    { href: '/organizer/dashboard', label: 'Home', icon: LayoutDashboard },
    { href: '/organizer/crowd', label: 'Crowd', icon: Map },
    { href: '/organizer/ai-summary', label: 'AI', icon: Sparkles },
    { href: '/organizer/incidents/live', label: 'Incidents', icon: Bell },
    { href: '/organizer/settings', label: 'Settings', icon: User },
  ],
  staff: [
    { href: '/staff/dashboard', label: 'Home', icon: LayoutDashboard },
    { href: '/staff/zones', label: 'Zones', icon: Map },
    { href: '/staff/assistant', label: 'AI', icon: Sparkles },
    { href: '/staff/emergency', label: 'Emergency', icon: Bell },
    { href: '/staff/profile', label: 'Profile', icon: User },
  ],
};

export function BottomTabBar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const tabs = tabsByRole[role];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center border-t border-[rgb(var(--border))] bg-[rgb(var(--background))]/90 backdrop-blur-md md:hidden">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/');
        const isAI = tab.label === 'AI';
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors duration-150',
              isAI && 'relative',
              isActive
                ? 'text-[rgb(var(--primary))]'
                : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {isAI ? (
              <div className="-mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--brand-accent))] shadow-lg ai-glow">
                <Icon className="h-5 w-5 text-white" />
              </div>
            ) : (
              <Icon className="h-5 w-5" />
            )}
            <span className={cn(isAI && 'mt-1')}>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
