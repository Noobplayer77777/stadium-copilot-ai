import { cn } from '@/lib/utils';
import { Button } from './button';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-[rgb(var(--border))] p-12 text-center',
        className
      )}
    >
      {Icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgb(var(--secondary))]">
          <Icon className="h-8 w-8 text-[rgb(var(--muted-foreground))]" />
        </div>
      )}
      <div className="space-y-1">
        <h3 className="text-heading-sm">{title}</h3>
        {description && (
          <p className="text-body-sm text-[rgb(var(--muted-foreground))] max-w-sm">{description}</p>
        )}
      </div>
      {action && (
        <Button variant="outline" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
