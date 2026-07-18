import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconRight, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-lg border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-sm text-[rgb(var(--foreground))] ring-offset-[rgb(var(--background))] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150',
            icon && 'pl-9',
            iconRight && 'pr-9',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]">
            {iconRight}
          </div>
        )}
        {error && (
          <p className="mt-1 text-xs text-red-500" role="alert">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
