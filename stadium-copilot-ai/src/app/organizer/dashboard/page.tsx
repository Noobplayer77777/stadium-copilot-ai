import { PageContainer } from '@/components/layout/PageContainer';

export default function OrganizerDashboardPage() {
  return (
    <PageContainer maxWidth="full">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Command Center</h1>
        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Real-time operational intelligence — coming in Phase 5.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {['AI Summary', 'Crowd Intel', 'Transport Ops', 'Incidents', 'Dispatch', 'Sustainability', 'Analytics', 'Settings'].map(
          (item) => (
            <div
              key={item}
              className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 h-24 flex items-center justify-center text-sm text-[rgb(var(--muted-foreground))]"
            >
              {item}
            </div>
          )
        )}
      </div>
    </PageContainer>
  );
}
