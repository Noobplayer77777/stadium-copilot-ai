import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An error occurred while loading this content. Please try again.',
  onRetry,
  fullScreen = false,
  className,
  ...props
}: ErrorStateProps) {
  const content = (
    <div
      className={cn(
        'flex flex-col items-center justify-center space-y-4 text-center p-6',
        className
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
        <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-[rgb(var(--muted-foreground))] max-w-sm mx-auto">
          {description}
        </p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-4 gap-2">
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[rgb(var(--background))]">
        {content}
      </div>
    );
  }

  return content;
}
