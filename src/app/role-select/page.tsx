'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type UserRole } from '@/lib/constants';
import { useUserStore } from '@/store';

const rolesList: { id: UserRole; title: string; desc: string; icon: string }[] = [
  { id: 'fan', title: 'Fan', desc: 'Match attendees navigating the stadium', icon: '🎟️' },
  { id: 'volunteer', title: 'Volunteer', desc: 'On-ground staff handling tasks', icon: '🤝' },
  { id: 'organizer', title: 'Organizer', desc: 'Command-center operators', icon: '📋' },
  { id: 'staff', title: 'Venue Staff', desc: 'Maintenance and security ops', icon: '🏟️' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function RoleSelectPage() {
  const { setRole } = useUserStore();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[rgb(var(--surface-0))] p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--brand-accent))]">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          Stadium Copilot
        </Link>
      </div>

      <div className="w-full max-w-4xl space-y-8 z-10">
        <div className="text-center space-y-2">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Authentication Successful</h1>
            <p className="text-[rgb(var(--muted-foreground))] mt-2 text-lg">
              (Demo Mode) Please select a role to preview its dashboard.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {rolesList.map((role) => (
            <motion.div key={role.id} variants={itemVariants}>
              <Link href={`/${role.id}/dashboard`} onClick={() => setRole(role.id)}>
                <Card className="h-full border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] hover:shadow-md transition-all cursor-pointer group">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[rgb(var(--secondary))] text-2xl group-hover:scale-110 transition-transform">
                      {role.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{role.title}</CardTitle>
                      <CardDescription>{role.desc}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm font-medium text-[rgb(var(--primary))] mt-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      Continue to Dashboard <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
