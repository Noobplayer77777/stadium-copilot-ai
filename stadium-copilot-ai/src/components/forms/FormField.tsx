'use client';

import React from 'react';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface FormFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  as?: 'input' | 'textarea';
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

  const inputId = String(name);

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <Label htmlFor={inputId}>
          {label}
          {required && <span className="ml-1 text-red-500" aria-hidden>*</span>}
        </Label>
      )}
      {as === 'textarea' ? (
        <Textarea
          id={inputId}
          placeholder={placeholder}
          error={error?.message}
          aria-required={required}
          {...field}
        />
      ) : (
        <Input
          id={inputId}
          type={type}
          placeholder={placeholder}
          error={error?.message}
          aria-required={required}
          {...field}
        />
      )}
      {description && !error && (
        <p className="text-xs text-[rgb(var(--muted-foreground))]">{description}</p>
      )}
    </div>
  );
}
