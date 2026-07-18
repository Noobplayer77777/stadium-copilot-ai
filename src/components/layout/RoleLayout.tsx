import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import { TopNavBar } from '@/components/layout/TopNavBar';
import type { UserRole } from '@/types';

interface RoleLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  title?: string;
}

export function RoleLayout({ children, role, title }: RoleLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      {/* Desktop Sidebar */}
      <Sidebar role={role} />
      
      {/* Mobile Drawer Sidebar */}
      <MobileSidebar role={role} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavBar title={title} />
        
        {/* Main Content Area */}
        <div className="relative flex-1 overflow-hidden bg-[rgb(var(--surface-0))]">
          {children}
        </div>
        
        {/* Mobile Bottom Tabs */}
        <BottomTabBar role={role} />
      </div>
    </div>
  );
}
