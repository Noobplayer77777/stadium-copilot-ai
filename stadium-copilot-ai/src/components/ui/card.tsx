import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-xl border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-[rgb(var(--border))] shadow-sm',
        elevated: 'border-[rgb(var(--border))] shadow-md hover:shadow-lg',
        ai: 'border-[rgb(var(--brand-accent))]/30 bg-[rgb(var(--card))] shadow-sm hover:border-[rgb(var(--brand-accent))]/50 hover:shadow-md',
        glass: 'glass border-white/10',
        ghost: 'border-transparent shadow-none',
        interactive: 'border-[rgb(var(--border))] shadow-sm hover:border-[rgb(var(--primary))]/40 hover:shadow-md cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  accentColor?: 'blue' | 'teal' | 'red' | 'green' | 'amber';
}

const accentStyles: Record<string, string> = {
  blue: 'border-l-4 border-l-blue-500',
  teal: 'border-l-4 border-l-[rgb(var(--brand-accent))]',
  red: 'border-l-4 border-l-red-500',
  green: 'border-l-4 border-l-green-500',
  amber: 'border-l-4 border-l-amber-500',
};

const Card = React.forwardRef<HTMLDivElement, CardProps>((
  { className, variant, accentColor, ...props },
  ref
) => (
  <div
    ref={ref}
    className={cn(
      cardVariants({ variant }),
      accentColor && accentStyles[accentColor],
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-5', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-heading-sm leading-none tracking-tight', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-body-sm text-[rgb(var(--muted-foreground))]', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-5 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center px-5 pb-5', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
