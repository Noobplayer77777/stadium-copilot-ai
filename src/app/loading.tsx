import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[rgb(var(--background))]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[rgb(var(--primary))]" />
        <p className="text-sm text-[rgb(var(--muted-foreground))]">Loading Copilot...</p>
      </div>
    </div>
  );
}
