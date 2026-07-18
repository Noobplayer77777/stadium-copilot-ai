import { RoleLayout } from '@/components/layout/RoleLayout';

export default function FanLayout({ children }: { children: React.ReactNode }) {
  return <RoleLayout role="fan" title="Fan Portal">{children}</RoleLayout>;
}
