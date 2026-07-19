import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { RoleLayout } from '@/components/layout/RoleLayout';

export default function FanLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['fan']}>
      <RoleLayout role="fan" title="Fan Portal">
        {children}
      </RoleLayout>
    </ProtectedRoute>
  );
}
