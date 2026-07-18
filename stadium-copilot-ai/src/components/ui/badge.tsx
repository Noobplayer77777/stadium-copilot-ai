import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-[rgb(var(--primary))]/30 bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]',
        secondary:
          'border-[rgb(var(--border))] bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]',
        destructive:
          'border-red-500/30 bg-red-500/10 text-red-500',
        success:
          'border-green-500/30 bg-green-500/10 text-green-500',
        warning:
          'border-amber-500/30 bg-amber-500/10 text-amber-500',
        ai:
          'border-[rgb(var(--brand-accent))]/40 bg-[rgb(var(--brand-accent))]/10 text-[rgb(var(--brand-accent))]',
        outline:
          'border-[rgb(var(--border))] bg-transparent text-[rgb(var(--foreground))]',
        'crowd-low':
          'border-green-500/30 bg-green-500/10 text-green-400',
        'crowd-moderate':
          'border-amber-500/30 bg-amber-500/10 text-amber-400',
        'crowd-high':
          'border-red-500/30 bg-red-500/10 text-red-400',
        'crowd-critical':
          'border-red-700/50 bg-red-700/20 text-red-300 animate-pulse',
        'priority-p1':
          'border-red-500/50 bg-red-500/20 text-red-400',
        'priority-p2':
          'border-amber-500/50 bg-amber-500/20 text-amber-400',
        'priority-p3':
          'border-gray-500/30 bg-gray-500/10 text-gray-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
