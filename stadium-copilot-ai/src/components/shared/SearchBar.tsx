'use client';

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SearchBar({
  placeholder = 'Search…',
  onSearch,
  className,
  size = 'md',
}: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    onSearch?.('');
  };

  const sizeMap = { sm: 'h-8 text-xs', md: 'h-10 text-sm', lg: 'h-12 text-base' };

  return (
    <div className={cn('relative w-full', className)}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))] pointer-events-none"
        style={{ width: size === 'lg' ? 18 : 16, height: size === 'lg' ? 18 : 16 }}
      />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'flex w-full rounded-lg border border-[rgb(var(--input))] bg-[rgb(var(--background))] pl-9 pr-9 text-[rgb(var(--foreground))] ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 transition-colors duration-150',
          sizeMap[size]
        )}
        aria-label={placeholder}
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
