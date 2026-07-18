import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';

export default function VolunteerDashboard() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-heading-lg font-bold">Volunteer Dashboard</h1>
          <p className="text-[rgb(var(--muted-foreground))]">Manage your tasks and coordinate with your team.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-[rgb(var(--brand-primary))]" />
                <CardTitle>Active Tasks</CardTitle>
              </div>
              <CardDescription>You have 3 tasks assigned today.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for tasks */}
              <div className="h-20 flex items-center justify-center rounded-md border border-dashed border-[rgb(var(--border))]">
                <span className="text-sm text-[rgb(var(--muted-foreground))]">Task list loading...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
