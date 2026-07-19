'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Mail, Key, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { api } from '@/lib/api';
import { setToken } from '@/lib/auth';
import { useAuth } from '@/providers/AuthProvider';

const ROLE_DASHBOARDS: Record<string, string> = {
  fan: '/fan/dashboard',
  volunteer: '/volunteer/dashboard',
  organizer: '/organizer/dashboard',
  staff: '/staff/dashboard',
  admin: '/organizer/dashboard',
};

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // POST /auth/login → receive JWT
      const tokenData = await api.auth.login(email, password);
      setToken(tokenData.access_token);

      // Fetch current user to determine role
      const user = await api.auth.getMe();

      // Trigger auth context refresh
      await refreshUser();

      // Redirect based on role
      const destination = ROLE_DASHBOARDS[user.role] ?? '/fan/dashboard';
      router.push(destination);
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--background))] p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[rgb(var(--surface-0))] z-0" />
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[rgb(var(--primary))]/10 to-transparent z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="group flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--brand-accent))] shadow-lg mb-4 group-hover:scale-105 transition-transform">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Stadium Copilot AI</h1>
          </Link>
        </div>

        <Card className="border-[rgb(var(--border))] shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight">Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                ) : (
                  <>
                    Sign in <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-center gap-2 border-t border-[rgb(var(--border))] bg-[rgb(var(--muted))]/50 px-6 py-4">
            <div className="text-sm text-[rgb(var(--muted-foreground))]">
              Need access?{' '}
              <Link href="#" className="font-semibold text-[rgb(var(--primary))] hover:underline">
                Contact your administrator
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
