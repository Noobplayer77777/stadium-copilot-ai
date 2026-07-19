import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { RoleLayout } from '@/components/layout/RoleLayout';

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['volunteer']}>
      <RoleLayout role="volunteer" title="Volunteer Hub">
        {children}
      </RoleLayout>
    </ProtectedRoute>
  );
}
