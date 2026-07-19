'use client';

import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, Ticket, MapPin, Navigation, 
  Coffee, Accessibility, ShieldAlert, 
  DoorOpen, Train, Car, CloudRain, Wind, 
  Droplets, Thermometer, ShoppingBag, BatteryCharging, 
  Utensils, CheckCircle2, Circle, AlertTriangle, Bell, Phone
} from 'lucide-react';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { ResponsiveGrid } from '@/components/layout/ResponsiveGrid';
import { DashboardCard } from '@/components/layout/DashboardCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function FanDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Welcome Section */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || 'Fan'}!</h1>
        <p className="text-[rgb(var(--muted-foreground))] mt-1">
          Here is your personalized match day overview.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: 2/3 width */}
        <motion.div 
          className="lg:col-span-2 flex flex-col gap-8"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Section 1: Upcoming Match Card */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Upcoming Match">
              <DashboardCard 
                title="Group Stage - Match 12" 
                className="bg-gradient-to-br from-[rgb(var(--primary))]/10 to-[rgb(var(--brand-accent))]/5 border-[rgb(var(--primary))]/20"
                action={<Badge variant="outline" className="bg-[rgb(var(--background))]">Confirmed</Badge>}
              >
                <div className="flex flex-col md:flex-row items-center justify-between py-4">
                  <div className="flex items-center gap-4 w-full md:w-auto mb-6 md:mb-0">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-16 w-16 rounded-full bg-[rgb(var(--surface-1))] border border-[rgb(var(--border))] flex items-center justify-center text-2xl">
                        🇧🇷
                      </div>
                      <span className="font-semibold mt-2">Brazil</span>
                    </div>
                    <div className="text-xl font-bold text-[rgb(var(--muted-foreground))] px-4">VS</div>
                    <div className="flex flex-col items-center text-center">
                      <div className="h-16 w-16 rounded-full bg-[rgb(var(--surface-1))] border border-[rgb(var(--border))] flex items-center justify-center text-2xl">
                        🇫🇷
                      </div>
                      <span className="font-semibold mt-2">France</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-[rgb(var(--border))] pt-4 md:pt-0 md:pl-6">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                      <span className="font-medium">MetLife Stadium, NY/NJ</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                      <span>July 14, 2026</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                      <span>20:00 Local Time</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <Ticket className="h-4 w-4 text-[rgb(var(--primary))]" />
                      <span className="font-semibold text-[rgb(var(--primary))]">Block 112, Row F, Seat 24</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[rgb(var(--border))] flex items-center justify-between">
                  <span className="text-sm font-medium">Kickoff in: <span className="text-[rgb(var(--primary))]">4h 32m</span></span>
                  <Button size="sm">View Ticket</Button>
                </div>
              </DashboardCard>
            </SectionContainer>
          </motion.div>

          {/* Section 3: AI Quick Actions */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="AI Quick Actions" description="Context-aware assistance for your match day.">
              <ResponsiveGrid columns={3}>
                {[
                  { label: 'Find my gate', icon: DoorOpen, color: 'text-blue-500' },
                  { label: 'Fastest route', icon: Navigation, color: 'text-emerald-500' },
                  { label: 'Nearest restroom', icon: Droplets, color: 'text-cyan-500' },
                  { label: 'Nearest food', icon: Utensils, color: 'text-orange-500' },
                  { label: 'Accessibility route', icon: Accessibility, color: 'text-purple-500' },
                  { label: 'Emergency assist', icon: ShieldAlert, color: 'text-red-500' },
                ].map((action, i) => (
                  <Button key={i} variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:border-[rgb(var(--primary))]/50 hover:bg-[rgb(var(--primary))]/5">
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                    <span className="text-xs font-medium">{action.label}</span>
                  </Button>
                ))}
              </ResponsiveGrid>
            </SectionContainer>
          </motion.div>

          {/* Section 2: Today's Schedule */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Today's Schedule">
              <DashboardCard title="Timeline" noPadding>
                <div className="p-6 relative">
                  <div className="absolute top-6 bottom-6 left-[39px] w-0.5 bg-[rgb(var(--border))]" />
                  <div className="space-y-6">
                    {[
                      { time: '16:00', title: 'Arrival at Stadium', desc: 'Recommended time via Metro Line A', status: 'past' },
                      { time: '16:30', title: 'Security Check', desc: 'Proceed to Gate B (Currently Low Crowd)', status: 'current' },
                      { time: '17:00', title: 'Stadium Entry', desc: 'Gates open for early access', status: 'upcoming' },
                      { time: '20:00', title: 'Kickoff', desc: 'Match begins', status: 'upcoming' },
                      { time: '20:45', title: 'Halftime', desc: '15 minute break', status: 'upcoming' },
                      { time: '22:00', title: 'Match Ends', desc: 'Estimated exit time', status: 'upcoming' },
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4 relative z-10">
                        <div className="flex flex-col items-center">
                          {step.status === 'past' ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500 bg-[rgb(var(--background))] rounded-full" />
                          ) : step.status === 'current' ? (
                            <div className="h-6 w-6 rounded-full border-2 border-[rgb(var(--primary))] bg-[rgb(var(--background))] flex items-center justify-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--primary))]" />
                            </div>
                          ) : (
                            <Circle className="h-6 w-6 text-[rgb(var(--muted-foreground))] bg-[rgb(var(--background))] rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 pb-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${step.status === 'current' ? 'text-[rgb(var(--primary))]' : ''}`}>{step.title}</span>
                            <span className="text-xs text-[rgb(var(--muted-foreground))] font-mono">{step.time}</span>
                          </div>
                          <p className="text-sm text-[rgb(var(--muted-foreground))] mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DashboardCard>
            </SectionContainer>
          </motion.div>
          
          {/* Section 8: Recommended Places */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Recommended for You">
              <ResponsiveGrid columns={2}>
                {[
                  { name: 'Burger & Fries Co.', type: 'Food', icon: Utensils, dist: '2 mins walk' },
                  { name: 'Official Store - North', type: 'Merchandise', icon: ShoppingBag, dist: '5 mins walk' },
                  { name: 'Restroom Block C', type: 'Restroom', icon: DoorOpen, dist: '1 min walk' },
                  { name: 'Charge Station 2', type: 'Charging', icon: BatteryCharging, dist: '3 mins walk' },
                ].map((place, i) => (
                  <DashboardCard key={i} title={place.name} className="hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between text-sm mt-2 text-[rgb(var(--muted-foreground))]">
                      <div className="flex items-center gap-1">
                        <place.icon className="h-3 w-3" />
                        <span>{place.type}</span>
                      </div>
                      <span className="text-xs font-medium">{place.dist}</span>
                    </div>
                  </DashboardCard>
                ))}
              </ResponsiveGrid>
            </SectionContainer>
          </motion.div>

        </motion.div>

        {/* RIGHT COLUMN: 1/3 width */}
        <motion.div 
          className="flex flex-col gap-8"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Section 4: Crowd Status */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Live Crowd Status">
              <DashboardCard title="Areas near you" noPadding>
                <div className="flex flex-col divide-y divide-[rgb(var(--border))]">
                  {[
                    { label: 'Gate A (Your Gate)', icon: DoorOpen, status: 'Low', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
                    { label: 'Gate B', icon: DoorOpen, status: 'High', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
                    { label: 'Food Court (Level 1)', icon: Coffee, status: 'Medium', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
                    { label: 'Metro Station North', icon: Train, status: 'Medium', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
                    { label: 'Parking Zone C', icon: Car, status: 'Low', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
                  ].map((crowd, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-[rgb(var(--secondary))]/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-[rgb(var(--secondary))] p-2 rounded-md text-[rgb(var(--muted-foreground))]">
                          <crowd.icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">{crowd.label}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${crowd.color}`}>
                        {crowd.status}
                      </span>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </SectionContainer>
          </motion.div>

          {/* Section 5: Weather Card */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Weather">
              <DashboardCard title="MetLife Stadium" description="Mostly Clear">
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center gap-3">
                    <Thermometer className="h-8 w-8 text-orange-500" />
                    <div>
                      <div className="text-2xl font-bold">24°C</div>
                      <div className="text-xs text-[rgb(var(--muted-foreground))]">Feels like 26°C</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center border-l border-[rgb(var(--border))] pl-4">
                    <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                      <CloudRain className="h-3 w-3 text-blue-500" />
                      <span>10% Rain</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                      <Wind className="h-3 w-3 text-teal-500" />
                      <span>12 km/h</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                      <Droplets className="h-3 w-3 text-cyan-500" />
                      <span>45% Hum</span>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </SectionContainer>
          </motion.div>

          {/* Section 6: Notifications */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Recent Notifications">
              <DashboardCard title="Updates" noPadding>
                <div className="flex flex-col divide-y divide-[rgb(var(--border))]">
                  {[
                    { title: 'Gate Open', desc: 'Your designated gate (A) is now open for entry.', time: '10m ago', unread: true },
                    { title: 'Metro Delay', desc: 'Line B is experiencing 5 min delays.', time: '1h ago', unread: false },
                    { title: 'Weather Update', desc: 'Clear skies expected for kickoff.', time: '2h ago', unread: false },
                    { title: 'Welcome to NY/NJ', desc: 'Check out our fan guide for local tips.', time: '5h ago', unread: false },
                    { title: 'Ticket Activated', desc: 'Your mobile ticket is ready for scanning.', time: '1d ago', unread: false },
                  ].map((notif, i) => (
                    <div key={i} className={`p-4 flex gap-3 ${notif.unread ? 'bg-[rgb(var(--primary))]/5' : ''}`}>
                      <div className="mt-0.5">
                        <Bell className={`h-4 w-4 ${notif.unread ? 'text-[rgb(var(--primary))]' : 'text-[rgb(var(--muted-foreground))]'}`} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <span className={`text-sm font-medium ${notif.unread ? '' : 'text-[rgb(var(--muted-foreground))]'}`}>{notif.title}</span>
                          <span className="text-[10px] text-[rgb(var(--muted-foreground))] whitespace-nowrap">{notif.time}</span>
                        </div>
                        <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1 line-clamp-2">{notif.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-[rgb(var(--border))] text-center">
                  <Button variant="ghost" size="sm" className="w-full text-xs text-[rgb(var(--primary))]">View all notifications</Button>
                </div>
              </DashboardCard>
            </SectionContainer>
          </motion.div>

          {/* Section 7: Emergency Info */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Emergency Assistance">
              <DashboardCard title="Quick Contacts" className="border-red-200 dark:border-red-900/50">
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { label: 'Security', icon: ShieldAlert },
                    { label: 'Medical', icon: AlertTriangle },
                    { label: 'Lost & Found', icon: DoorOpen },
                    { label: 'Help Desk', icon: Phone },
                  ].map((contact, i) => (
                    <Button key={i} variant="outline" size="sm" className="justify-start gap-2 h-9 text-xs">
                      <contact.icon className="h-3 w-3" />
                      {contact.label}
                    </Button>
                  ))}
                  <Button variant="destructive" className="col-span-2 mt-2 w-full">
                    Report an Incident
                  </Button>
                </div>
              </DashboardCard>
            </SectionContainer>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
