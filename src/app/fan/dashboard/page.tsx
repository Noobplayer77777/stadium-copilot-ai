import { PageContainer } from '@/components/layout/PageContainer';

export default function FanDashboardPage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Fan Dashboard</h1>
        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Your match day command center — coming in Phase 5.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {['AI Assistant', 'Navigate Stadium', 'Live Crowd', 'Match Planner', 'Transport', 'Food & Drinks'].map(
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
