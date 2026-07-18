export type UserRole = 'fan' | 'volunteer' | 'organizer' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  language: string;
  avatarUrl?: string;
  accessibilityNeeds?: AccessibilityNeed[];
}

export type AccessibilityNeed = 'wheelchair' | 'visual' | 'hearing' | 'elderly' | 'with_child';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';
export type NotificationType = 'ai_alert' | 'transport' | 'match' | 'safety' | 'task' | 'general';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
  actionLabel?: string;
  actionHref?: string;
}

export type CrowdStatus = 'low' | 'moderate' | 'high' | 'critical';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: number;
}

export interface Language {
  code: string;
  label: string;
  flag: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
