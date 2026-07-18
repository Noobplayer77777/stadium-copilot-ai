import { RoleLayout } from '@/components/layout/RoleLayout';

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  return <RoleLayout role="volunteer" title="Volunteer Hub">{children}</RoleLayout>;
}
