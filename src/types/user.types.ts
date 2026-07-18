export type UserRole = 'fan' | 'volunteer' | 'organizer' | 'staff';

export type AccessibilityNeed =
  | 'wheelchair'
  | 'visual_impairment'
  | 'hearing_impairment'
  | 'elderly'
  | 'with_young_child';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  language: string;
  accessibilityNeeds: AccessibilityNeed[];
  createdAt: string;
}
