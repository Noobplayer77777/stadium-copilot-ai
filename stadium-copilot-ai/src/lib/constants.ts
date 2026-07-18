export const APP_NAME = 'Stadium Copilot AI';
export const APP_TAGLINE = 'AI-powered operational intelligence for FIFA World Cup 2026';

export type UserRole = 'fan' | 'volunteer' | 'organizer' | 'staff';

export const USER_ROLES: Record<UserRole, { label: string; emoji: string; color: string }> = {
  fan: { label: 'Fan', emoji: '🎟️', color: 'blue' },
  volunteer: { label: 'Volunteer', emoji: '🤝', color: 'green' },
  organizer: { label: 'Organizer', emoji: '📋', color: 'purple' },
  staff: { label: 'Venue Staff', emoji: '🏟️', color: 'orange' },
};

export const NAV_ITEMS = {
  fan: [
    { href: '/fan/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { href: '/fan/assistant', label: 'AI Assistant', icon: 'Sparkles' },
    { href: '/fan/planner', label: 'Match Planner', icon: 'CalendarDays' },
    { href: '/fan/navigate', label: 'Navigate', icon: 'Map' },
    { href: '/fan/crowd', label: 'Live Crowd', icon: 'Users' },
    { href: '/fan/transport', label: 'Transport', icon: 'Train' },
    { href: '/fan/concessions', label: 'Food & Drinks', icon: 'UtensilsCrossed' },
    { href: '/fan/notifications', label: 'Notifications', icon: 'Bell' },
    { href: '/fan/settings', label: 'Settings', icon: 'Settings' },
  ],
  volunteer: [
    { href: '/volunteer/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { href: '/volunteer/assistant', label: 'AI Assistant', icon: 'Sparkles' },
    { href: '/volunteer/tasks', label: 'My Tasks', icon: 'ClipboardList' },
    { href: '/volunteer/map', label: 'Zone Map', icon: 'Map' },
    { href: '/volunteer/comms', label: 'Team Comms', icon: 'MessageSquare' },
    { href: '/volunteer/incident', label: 'Report Incident', icon: 'AlertTriangle' },
    { href: '/volunteer/schedule', label: 'Schedule', icon: 'Calendar' },
    { href: '/volunteer/profile', label: 'Profile', icon: 'User' },
  ],
  organizer: [
    { href: '/organizer/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { href: '/organizer/ai-summary', label: 'AI Summary', icon: 'Sparkles' },
    { href: '/organizer/crowd', label: 'Crowd Intel', icon: 'Activity' },
    { href: '/organizer/transport', label: 'Transport Ops', icon: 'Train' },
    { href: '/organizer/incidents/live', label: 'Incidents', icon: 'AlertTriangle' },
    { href: '/organizer/dispatch', label: 'Dispatch', icon: 'Send' },
    { href: '/organizer/sustainability', label: 'Sustainability', icon: 'Leaf' },
    { href: '/organizer/analytics/match', label: 'Analytics', icon: 'BarChart2' },
    { href: '/organizer/settings', label: 'Settings', icon: 'Settings' },
  ],
  staff: [
    { href: '/staff/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { href: '/staff/assistant', label: 'AI Assistant', icon: 'Sparkles' },
    { href: '/staff/zones', label: 'Zone Overview', icon: 'Map' },
    { href: '/staff/tasks', label: 'Tasks', icon: 'ClipboardList' },
    { href: '/staff/maintenance', label: 'Maintenance', icon: 'Wrench' },
    { href: '/staff/announcements', label: 'Announcements', icon: 'Megaphone' },
    { href: '/staff/emergency', label: 'Emergency', icon: 'ShieldAlert' },
    { href: '/staff/profile', label: 'Profile', icon: 'User' },
  ],
};

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
];
