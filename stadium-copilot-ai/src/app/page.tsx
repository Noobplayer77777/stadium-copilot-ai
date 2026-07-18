import { redirect } from 'next/navigation';

export default function Home() {
  // For the foundation, we redirect directly to the fan dashboard as the default starting point.
  // In a real implementation with Auth, this would check session role and redirect accordingly.
  redirect('/fan/dashboard');
}
