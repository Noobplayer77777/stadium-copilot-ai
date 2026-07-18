'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Map, 
  Users, 
  Accessibility, 
  ClipboardList, 
  LayoutDashboard, 
  Leaf,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      {/* Top Nav (Simplified for Landing) */}
      <header className="sticky top-0 z-50 w-full border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--brand-accent))]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            Stadium Copilot AI
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-[rgb(var(--muted-foreground))]">
            <Link href="#features" className="hover:text-[rgb(var(--foreground))] transition-colors">Features</Link>
            <Link href="#roles" className="hover:text-[rgb(var(--foreground))] transition-colors">Roles</Link>
            <Link href="#tech" className="hover:text-[rgb(var(--foreground))] transition-colors">Tech Stack</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--primary))]/10 via-transparent to-[rgb(var(--brand-accent))]/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[rgb(var(--primary))]/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="container relative mx-auto px-4 md:px-6 text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-3xl mx-auto space-y-8">
              <div className="inline-flex items-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--secondary))]/50 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4 text-[rgb(var(--primary))]" />
                FIFA World Cup 2026 Hackathon
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--brand-accent))]">Stadium Operations</span>
              </h1>
              <p className="text-lg md:text-xl text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed">
                An AI-powered operational intelligence platform that improves navigation, crowd management, and the overall tournament experience using Generative AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 gap-2 group">
                    Enter Platform
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8">
                    Explore Capabilities
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-[rgb(var(--surface-0))]">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Generative AI Capabilities</h2>
              <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg">
                Six core intelligent features designed to handle the complexity of global-scale tournament operations.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Smart Navigation', desc: 'Real-time contextual routing that adapts to crowds and closures.', icon: Map },
                { title: 'Crowd Intelligence', desc: 'Predictive density mapping to prevent bottlenecks before they happen.', icon: Users },
                { title: 'Accessibility', desc: 'Customized assistance pathways for elderly, disabled, and families.', icon: Accessibility },
                { title: 'Volunteer Dispatch', desc: 'AI-driven task allocation based on location, skills, and urgency.', icon: ClipboardList },
                { title: 'Operations Dashboard', desc: 'Command center views with anomaly detection and automated reporting.', icon: LayoutDashboard },
                { title: 'Sustainability', desc: 'Resource optimization for energy, waste, and transport coordination.', icon: Leaf },
              ].map((feature, i) => (
                <motion.div key={i} variants={fadeIn}>
                  <Card className="h-full bg-[rgb(var(--background))] border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50 transition-colors">
                    <CardHeader>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">{feature.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* User Roles Section */}
        <section id="roles" className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Designed for Everyone</h2>
              <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg">
                Context-aware interfaces tailored to the specific needs of each participant.
              </p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { role: 'Fan', icon: '🎟️', desc: 'Personalized match day planner, live navigation, and multi-lingual AI assistant.', href: '/login' },
                { role: 'Volunteer', icon: '🤝', desc: 'Task management, zone maps, and instant communication with coordinators.', href: '/login' },
                { role: 'Organizer', icon: '📋', desc: 'Macro-level insights, incident management, and automated situational reports.', href: '/login' },
                { role: 'Venue Staff', icon: '🏟️', desc: 'Maintenance alerts, crowd flow controls, and emergency broadcast tools.', href: '/login' },
              ].map((role, i) => (
                <motion.div key={i} variants={fadeIn}>
                  <Link href={role.href} className="block h-full group">
                    <Card className="h-full border-[rgb(var(--border))] group-hover:border-[rgb(var(--brand-accent))]/50 group-hover:shadow-md transition-all">
                      <CardHeader className="text-center pb-4">
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{role.icon}</div>
                        <CardTitle>{role.role}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">{role.desc}</p>
                        <span className="text-sm font-medium text-[rgb(var(--primary))] flex items-center justify-center gap-1">
                          View Dashboard <ArrowRight className="h-3 w-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech" className="py-24 bg-[rgb(var(--surface-0))]">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Enterprise Technology Stack</h2>
              <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto text-lg">
                Built with modern, scalable, and resilient technologies for global operations.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-70">
              <div className="flex flex-col items-center justify-center gap-2">
                <Globe className="h-10 w-10 text-[rgb(var(--muted-foreground))]" />
                <span className="font-semibold">Next.js 15</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <Zap className="h-10 w-10 text-[rgb(var(--muted-foreground))]" />
                <span className="font-semibold">Tailwind CSS v4</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <ShieldCheck className="h-10 w-10 text-[rgb(var(--muted-foreground))]" />
                <span className="font-semibold">TypeScript</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <Sparkles className="h-10 w-10 text-[rgb(var(--muted-foreground))]" />
                <span className="font-semibold">Generative AI</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgb(var(--border))] py-12">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-5 w-5 text-[rgb(var(--primary))]" />
            Stadium Copilot AI
          </div>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            Built for the FIFA World Cup 2026 GenAI Hackathon.
          </p>
          <div className="flex gap-4 text-sm text-[rgb(var(--muted-foreground))]">
            <Link href="#" className="hover:text-[rgb(var(--foreground))]">Privacy</Link>
            <Link href="#" className="hover:text-[rgb(var(--foreground))]">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
