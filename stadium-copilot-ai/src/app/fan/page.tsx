import { PageContainer } from '@/components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function FanDashboard() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-heading-lg font-bold">Welcome to Stadium Copilot</h1>
          <p className="text-[rgb(var(--muted-foreground))]">Your AI assistant for the FIFA World Cup 2026.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-[rgb(var(--brand-accent))] bg-[rgb(var(--brand-accent))]/5">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[rgb(var(--brand-accent))]" />
                <CardTitle>AI Assistant</CardTitle>
              </div>
              <CardDescription>Ask me anything about the stadium, matches, or transport.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for quick actions */}
              <div className="h-20 flex items-center justify-center rounded-md border border-dashed border-[rgb(var(--border))]">
                <span className="text-sm text-[rgb(var(--muted-foreground))]">Coming soon</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
