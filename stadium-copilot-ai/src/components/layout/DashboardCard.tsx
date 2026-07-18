import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps extends React.ComponentProps<typeof Card> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  noPadding?: boolean;
}

export function DashboardCard({
  title,
  description,
  action,
  footer,
  children,
  noPadding = false,
  className,
  ...props
}: DashboardCardProps) {
  return (
    <Card className={cn('flex flex-col', className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="text-base font-semibold leading-none tracking-tight">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className={cn('flex-1', noPadding && 'p-0 pb-0')}>
        {children}
      </CardContent>
      {footer && <CardFooter className="pt-4">{footer}</CardFooter>}
    </Card>
  );
}
