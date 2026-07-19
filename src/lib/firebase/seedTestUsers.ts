import { registerWithEmail } from '@/lib/firebase/auth';
import type { UserRole } from '@/types';

/**
 * Ensure that test accounts exist in the mock Firebase fallback.
 * This runs on client start when real Firebase configuration is absent.
 * Accounts:
 *   - admin@stadiumcopilot.com (Organizer) – password: admin123 (already seeded)
 *   - organizer@test.com (Organizer) – password: test123
 *   - fan@test.com (Fan) – password: test123
 *   - volunteer@test.com (Volunteer) – password: test123
 *   - staff@test.com (Staff) – password: test123
 */
export async function seedTestUsers() {
  const testUsers: { email: string; password: string; role: UserRole; name: string }[] = [
    { email: 'organizer@test.com', password: 'test123', role: 'organizer', name: 'Organizer Test' },
    { email: 'fan@test.com', password: 'test123', role: 'fan', name: 'Fan Test' },
    { email: 'volunteer@test.com', password: 'test123', role: 'volunteer', name: 'Volunteer Test' },
    { email: 'staff@test.com', password: 'test123', role: 'staff', name: 'Staff Test' },
  ];

  for (const user of testUsers) {
    try {
      await registerWithEmail(user.name, user.email, user.password, user.role);
    } catch (e) {
      // ignore if already exists
    }
  }
}
