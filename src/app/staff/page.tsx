import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function StaffDashboard() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-heading-lg font-bold">Staff Overview</h1>
          <p className="text-[rgb(var(--muted-foreground))]">Manage maintenance, emergencies, and zone operations.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[rgb(var(--brand-secondary))]" />
                <CardTitle>Active Incidents</CardTitle>
              </div>
              <CardDescription>2 incidents require attention in your zone.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for incidents */}
              <div className="h-20 flex items-center justify-center rounded-md border border-dashed border-[rgb(var(--border))]">
                <span className="text-sm text-[rgb(var(--muted-foreground))]">Incidents list loading...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
