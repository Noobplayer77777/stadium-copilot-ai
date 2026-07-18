'use client';

import React from 'react';
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
} from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  as?: 'input' | 'textarea';
  rules?: RegisterOptions;
  className?: string;
  description?: string;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  required = false,
  as = 'input',
  rules,
  className,
  description,
}: FormFieldProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <Label htmlFor={String(name)} required={required}>
          {label}
        </Label>
      )}
      {as === 'textarea' ? (
        <Textarea
          id={String(name)}
          placeholder={placeholder}
          error={error?.message}
          {...field}
        />
      ) : (
        <Input
          id={String(name)}
          type={type}
          placeholder={placeholder}
          error={error?.message}
          {...field}
        />
      )}
      {description && !error && (
        <p className="text-xs text-[rgb(var(--muted-foreground))]">{description}</p>
      )}
    </div>
  );
}
