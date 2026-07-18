import React from 'react';
import { Badge } from '@/components/ui/badge';
import { USER_ROLES, UserRole } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface RoleBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  role: UserRole;
}

export function RoleBadge({ role, className, ...props }: RoleBadgeProps) {
  const roleInfo = USER_ROLES[role];

  if (!roleInfo) return null;

  return (
    <Badge
      variant="outline"
      className={cn('gap-1.5 font-medium capitalize', className)}
      {...props}
    >
      <span className="text-[10px] leading-none" aria-hidden="true">{roleInfo.emoji}</span>
      {roleInfo.label}
    </Badge>
  );
}
