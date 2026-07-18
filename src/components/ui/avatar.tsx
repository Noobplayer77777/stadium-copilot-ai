import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '@/lib/utils';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  }
>(({ className, size = 'md', ...props }, ref) => {
  const sizes = { xs: 'h-6 w-6', sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12', xl: 'h-16 w-16' };
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn('relative flex shrink-0 overflow-hidden rounded-full', sizes[size], className)}
      {...props}
    />
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] text-sm font-medium',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface AvatarGroupProps {
  users: Array<{ name: string; image?: string; fallback?: string }>;
  max?: number;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

function AvatarGroup({ users, max = 3, size = 'sm', className }: AvatarGroupProps) {
  const visible = users.slice(0, max);
  const remaining = users.length - max;
  const sizeMap = { xs: 'h-6 w-6', sm: 'h-8 w-8', md: 'h-10 w-10' };

  return (
    <div className={cn('flex items-center', className)}>
      {visible.map((user, index) => (
        <Avatar
          key={user.name + index}
          size={size}
          className={cn('-ml-2 first:ml-0 ring-2 ring-[rgb(var(--background))]')}
        >
          {user.image && <AvatarImage src={user.image} alt={user.name} />}
          <AvatarFallback className={cn(sizeMap[size])}>
            {user.fallback ?? user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            '-ml-2 flex items-center justify-center rounded-full ring-2 ring-[rgb(var(--background))] bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] text-xs font-medium',
            sizeMap[size]
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
