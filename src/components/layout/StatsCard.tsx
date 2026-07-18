import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps extends React.ComponentProps<typeof Card> {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
  className,
  ...props
}: StatsCardProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trendValue) && (
          <p className="mt-1 text-xs text-[rgb(var(--muted-foreground))] flex items-center gap-1">
            {trendValue && (
              <span
                className={cn(
                  trend === 'up' && 'text-green-500',
                  trend === 'down' && 'text-red-500',
                  trend === 'neutral' && 'text-yellow-500'
                )}
              >
                {trendValue}
              </span>
            )}
            {description && <span>{description}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
