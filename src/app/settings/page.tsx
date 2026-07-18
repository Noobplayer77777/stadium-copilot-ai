import type { Metadata } from 'next';
import { Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Configure your Stadium Copilot AI preferences.',
};

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      <div className="mx-auto w-full max-w-2xl p-4 md:p-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--secondary))]">
            <Settings className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Settings</h1>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              Manage your preferences and account settings
            </p>
          </div>
        </div>

        {/* Settings sections placeholder */}
        <div className="space-y-4" aria-label="Settings sections">
          {['Appearance', 'Language & Accessibility', 'Notifications', 'Account', 'Privacy'].map(
            (section) => (
              <div
                key={section}
                className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4"
                aria-label={`${section} settings`}
              >
                <div className="mb-3 h-5 w-32 rounded bg-[rgb(var(--secondary))] animate-pulse" aria-hidden="true" />
                <div className="space-y-2">
                  <div className="h-9 rounded-lg bg-[rgb(var(--secondary))] animate-pulse" aria-hidden="true" />
                  <div className="h-9 rounded-lg bg-[rgb(var(--secondary))] animate-pulse" aria-hidden="true" />
                </div>
                <p className="mt-3 text-xs text-[rgb(var(--muted-foreground))]">
                  {section} settings will be implemented in Phase 3.2.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
