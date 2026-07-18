'use client';

import Link from 'next/link';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[rgb(var(--background))] text-[rgb(var(--foreground))] p-4">
      <div className="w-full max-w-md text-center">
        {/* Brand mark */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--brand-accent))]">
          <Sparkles className="h-8 w-8 text-white" aria-hidden="true" />
        </div>

        {/* 404 */}
        <p className="text-8xl font-black tracking-tight text-[rgb(var(--primary))] opacity-20 select-none" aria-hidden="true">
          404
        </p>

        <h1 className="mt-2 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-sm text-[rgb(var(--muted-foreground))]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:bg-[rgb(var(--primary))]/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Go Home
          </Link>
          <button
            onClick={() => history.back()}
            className="inline-flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] px-4 py-2 text-sm font-medium hover:bg-[rgb(var(--secondary))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
