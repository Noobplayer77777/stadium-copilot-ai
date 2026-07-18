'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Sparkles, CalendarDays, Map, Users, Train,
  UtensilsCrossed, Bell, Settings, ClipboardList, MessageSquare,
  AlertTriangle, Calendar, User, Activity, Send, Leaf, BarChart2,
  Wrench, Megaphone, ShieldAlert, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store';
import { NAV_ITEMS } from '@/lib/constants';
import type { UserRole } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Sparkles, CalendarDays, Map, Users, Train,
  UtensilsCrossed, Bell, Settings, ClipboardList, MessageSquare,
  AlertTriangle, Calendar, User, Activity, Send, Leaf, BarChart2,
  Wrench, Megaphone, ShieldAlert,
};

interface SidebarProps {
  role: UserRole;
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const { isCollapsed, toggle } = useSidebarStore();
  const navItems = NAV_ITEMS[role];

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'relative hidden md:flex flex-col h-screen border-r border-[rgb(var(--sidebar-border))] bg-[rgb(var(--sidebar-bg))] transition-all duration-300 ease-in-out shrink-0',
          isCollapsed ? 'w-[68px]' : 'w-60'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-[rgb(var(--sidebar-border))] px-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--brand-accent))]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-heading-sm font-bold truncate">Stadium Copilot</span>
            )}
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = iconMap[item.icon] ?? LayoutDashboard;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  {isCollapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-lg mx-auto transition-colors duration-150',
                            isActive
                              ? 'bg-[rgb(var(--sidebar-item-active))] text-[rgb(var(--primary))]'
                              : 'text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--sidebar-item-hover))] hover:text-[rgb(var(--foreground))]'
                          )}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="sr-only">{item.label}</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-150',
                        isActive
                          ? 'bg-[rgb(var(--sidebar-item-active))] text-[rgb(var(--primary))]'
                          : 'text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--sidebar-item-hover))] hover:text-[rgb(var(--foreground))]'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[rgb(var(--brand-secondary))] text-xs font-bold text-white">
                          {item.badge > 9 ? '9+' : item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Toggle */}
        <div className="border-t border-[rgb(var(--sidebar-border))] p-2">
          <button
            onClick={toggle}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-lg text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--sidebar-item-hover))] hover:text-[rgb(var(--foreground))] transition-colors duration-150"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span className="text-xs font-medium">Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
