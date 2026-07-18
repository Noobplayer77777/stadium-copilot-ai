import { RoleLayout } from '@/components/layout/RoleLayout';

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return <RoleLayout role="staff" title="Venue Staff Portal">{children}</RoleLayout>;
}
