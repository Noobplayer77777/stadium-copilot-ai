import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to Stadium Copilot AI to access your personalized experience.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[rgb(var(--background))] p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--brand-accent))] shadow-lg mb-4">
            <Sparkles className="h-7 w-7 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Stadium Copilot AI</h1>
          <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">
            FIFA World Cup 2026 — Sign in to continue
          </p>
        </div>

        {/* Login placeholder card */}
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
          <div className="space-y-4">
            <div className="h-10 rounded-lg bg-[rgb(var(--secondary))] animate-pulse" aria-hidden="true" />
            <div className="h-10 rounded-lg bg-[rgb(var(--secondary))] animate-pulse" aria-hidden="true" />
            <div className="h-10 rounded-lg bg-[rgb(var(--primary))]/20 animate-pulse" aria-hidden="true" />
          </div>

          <p className="mt-6 text-center text-xs text-[rgb(var(--muted-foreground))]">
            Authentication will be implemented in Phase 4.
          </p>
        </div>

        {/* Role selector placeholder */}
        <div className="mt-6 grid grid-cols-2 gap-2" aria-label="Select your role">
          {['Fan', 'Volunteer', 'Organizer', 'Staff'].map((role) => (
            <div
              key={role}
              className="flex items-center justify-center rounded-lg border border-[rgb(var(--border))] p-3 text-sm font-medium text-[rgb(var(--muted-foreground))] bg-[rgb(var(--secondary))]"
              aria-label={`Role: ${role}`}
            >
              {role}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
