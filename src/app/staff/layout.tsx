import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { RoleLayout } from '@/components/layout/RoleLayout';

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['staff']}>
      <RoleLayout role="staff" title="Venue Staff Portal">
        {children}
      </RoleLayout>
    </ProtectedRoute>
  );
}
