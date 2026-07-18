import React from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function SectionContainer({
  title,
  description,
  children,
  action,
  className,
  ...props
}: SectionContainerProps) {
  return (
    <section className={cn('flex flex-col gap-4', className)} {...props}>
      {(title || action) && (
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && <h2 className="text-xl font-semibold tracking-tight">{title}</h2>}
            {description && <p className="text-sm text-[rgb(var(--muted-foreground))]">{description}</p>}
          </div>
          {action && <div className="mt-2 sm:mt-0">{action}</div>}
        </div>
      )}
      <div className="flex-1">
        {children}
      </div>
    </section>
  );
}
