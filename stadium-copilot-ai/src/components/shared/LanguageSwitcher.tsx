'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { LANGUAGES } from '@/lib/constants';
import { useUserStore } from '@/store';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { language, setLanguage } = useUserStore();
  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={`Language: ${current.label}`}>
          <Globe className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="start">
        <p className="px-2 py-1 text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">Select Language</p>
        <div className="mt-1 grid grid-cols-2 gap-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-[rgb(var(--secondary))]',
                lang.code === language && 'bg-[rgb(var(--secondary))] font-medium text-[rgb(var(--foreground))]'
              )}
            >
              <span className="text-base" aria-hidden>{lang.flag}</span>
              <span className="truncate">{lang.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
