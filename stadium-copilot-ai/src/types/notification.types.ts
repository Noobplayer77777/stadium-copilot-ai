export type NotificationVariant = 'info' | 'success' | 'warning' | 'danger' | 'ai';

export type NotificationCategory =
  | 'ai_alert'
  | 'transport'
  | 'match'
  | 'safety'
  | 'task'
  | 'system';

export interface Notification {
  id: string;
  title: string;
  body: string;
  variant: NotificationVariant;
  category: NotificationCategory;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  actionHref?: string;
}
