import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Activity } from 'lucide-react';

export default function OrganizerDashboard() {
  return (
    <PageContainer maxWidth="full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-heading-lg font-bold">Command Center</h1>
          <p className="text-[rgb(var(--muted-foreground))]">Real-time operational intelligence and stadium overview.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[rgb(var(--brand-primary))]" />
                <CardTitle>Crowd Density</CardTitle>
              </div>
              <CardDescription>Live heatmap across 12 zones.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for stats */}
              <div className="h-24 flex items-center justify-center rounded-md border border-dashed border-[rgb(var(--border))]">
                <span className="text-sm text-[rgb(var(--muted-foreground))]">Live stats loading...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
