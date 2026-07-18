'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Sparkles, CalendarDays, Map, Users, Train,
  UtensilsCrossed, Bell, Settings, ClipboardList, MessageSquare,
  AlertTriangle, Calendar, User, Activity, Send, Leaf, BarChart2,
  Wrench, Megaphone, ShieldAlert, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store';
import { NAV_ITEMS } from '@/lib/constants';
import type { UserRole } from '@/types';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Sparkles, CalendarDays, Map, Users, Train,
  UtensilsCrossed, Bell, Settings, ClipboardList, MessageSquare,
  AlertTriangle, Calendar, User, Activity, Send, Leaf, BarChart2,
  Wrench, Megaphone, ShieldAlert,
};

interface MobileSidebarProps {
  role: UserRole;
}

export function MobileSidebar({ role }: MobileSidebarProps) {
  const pathname = usePathname();
  const { isMobileOpen, closeMobile } = useSidebarStore();
  const navItems = NAV_ITEMS[role];

  if (!isMobileOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
        onClick={closeMobile}
        aria-hidden
      />
      {/* Drawer */}
      <aside className="fixed left-0 top-0 z-50 h-full w-72 border-r border-[rgb(var(--sidebar-border))] bg-[rgb(var(--sidebar-bg))] flex flex-col md:hidden animate-in slide-in-from-left duration-300">
        <div className="flex h-16 items-center justify-between border-b border-[rgb(var(--sidebar-border))] px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--brand-accent))]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-heading-sm font-bold">Stadium Copilot</span>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={closeMobile} aria-label="Close navigation">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = iconMap[item.icon] ?? LayoutDashboard;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMobile}
                    className={cn(
                      'flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150',
                      isActive
                        ? 'bg-[rgb(var(--sidebar-item-active))] text-[rgb(var(--primary))]'
                        : 'text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--sidebar-item-hover))] hover:text-[rgb(var(--foreground))]'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
