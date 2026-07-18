import { RoleLayout } from '@/components/layout/RoleLayout';

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  return <RoleLayout role="organizer" title="Command Center">{children}</RoleLayout>;
}
