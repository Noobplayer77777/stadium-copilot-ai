import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { RoleLayout } from '@/components/layout/RoleLayout';

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['organizer']}>
      <RoleLayout role="organizer" title="Command Center">
        {children}
      </RoleLayout>
    </ProtectedRoute>
  );
}
