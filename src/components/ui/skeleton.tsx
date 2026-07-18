import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-[rgb(var(--muted))]/60',
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl border border-[rgb(var(--border))] p-5 space-y-3', className)}>
      <div className="flex items-center space-x-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-4/6" />
    </div>
  );
}

function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      <Skeleton className="h-10 w-full rounded-lg" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-lg opacity-80" />
      ))}
    </div>
  );
}

function Spinner({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'animate-spin rounded-full border-2 border-[rgb(var(--border))] border-t-[rgb(var(--brand-accent))]',
        sizes[size],
        className
      )}
    />
  );
}

function LoadingPage() {
  return (
    <div className="flex h-full min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-[rgb(var(--muted-foreground))] animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonTable, Spinner, LoadingPage };
