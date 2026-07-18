import { PageContainer } from '@/components/layout/PageContainer';

export default function StaffDashboardPage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Staff Overview</h1>
        <p className="text-sm text-[rgb(var(--muted-foreground))]">
          Zone management and incident response — coming in Phase 5.
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {['Zone Overview', 'Tasks', 'Maintenance', 'Announcements', 'Emergency', 'AI Assistant'].map(
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
