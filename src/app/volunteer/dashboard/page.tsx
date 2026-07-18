'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, MapPin, CheckCircle2, Circle, 
  Send, Heart, Users, Star, ShieldAlert,
  Flame, DoorOpen, Plus, Megaphone, Activity
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { ResponsiveGrid } from '@/components/layout/ResponsiveGrid';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserStore } from '@/store';

// Mock Data
const PROFILE = {
  id: 'VOL-2026-894',
  role: 'Wayfinding Specialist',
  shift: '09:00 - 17:00 (Shift 1)',
  zone: 'Gate B (North Plaza)',
  attendance: 'Checked-in (On Time)',
  status: 'Available'
};

const TASKS = [
  { id: 'T1', title: 'Help visitors find Block 112', priority: 'High', duration: '30m', location: 'Gate B', status: 'In Progress' },
  { id: 'T2', title: 'Guide parking for Zone C', priority: 'Medium', duration: '2h', location: 'Parking Zone C', status: 'Pending' },
  { id: 'T3', title: 'Accessibility support at Gate A', priority: 'High', duration: '1h', location: 'Gate A', status: 'Pending' },
  { id: 'T4', title: 'Queue management', priority: 'Low', duration: '1h', location: 'Merchandise North', status: 'Completed' },
];

const TIMELINE = [
  { time: '08:45', title: 'Check-in', status: 'past' },
  { time: '09:00', title: 'Briefing', status: 'past' },
  { time: '09:30', title: 'Morning Shift', status: 'current' },
  { time: '13:00', title: 'Lunch Break', status: 'upcoming' },
  { time: '14:00', title: 'Afternoon Shift', status: 'upcoming' },
  { time: '17:00', title: 'Check-out', status: 'upcoming' },
];

const MESSAGES = [
  { id: '1', role: 'organizer', name: 'Command Center', text: 'All volunteers, gates open in 30 mins. Take positions.', time: '09:15', isBroadcast: true },
  { id: '2', role: 'volunteer', name: 'Alex M.', text: 'Gate B team is ready.', time: '09:18', isBroadcast: false },
  { id: '3', role: 'volunteer', name: 'You', text: 'On my way to Block 112 to assist with seating.', time: '09:20', isBroadcast: false },
];

const PERFORMANCE = [
  { label: 'Visitors Assisted', value: '42', icon: Users, color: 'text-blue-500' },
  { label: 'Tasks Completed', value: '3', icon: CheckCircle2, color: 'text-green-500' },
  { label: 'Avg Resp. Time', value: '2.5m', icon: Clock, color: 'text-purple-500' },
  { label: 'Positive Feedback', value: '98%', icon: Star, color: 'text-yellow-500' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function VolunteerDashboard() {
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState<'tasks' | 'report'>('tasks');
  const [messages, setMessages] = useState(MESSAGES);
  const [chatInput, setChatInput] = useState('');
  
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, {
      id: Date.now().toString(),
      role: 'volunteer',
      name: 'You',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBroadcast: false
    }]);
    setChatInput('');
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      
      {/* Header Profile Section */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[rgb(var(--surface-0))] p-6 rounded-xl border border-[rgb(var(--border))]">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-[rgb(var(--primary))]">
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback className="bg-[rgb(var(--primary))]/10 text-xl text-[rgb(var(--primary))]">
              {user?.name?.[0] || 'V'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user?.name || 'Volunteer'}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <Badge variant="outline" className="font-mono bg-[rgb(var(--surface-1))]">{PROFILE.id}</Badge>
              <span className="text-sm text-[rgb(var(--muted-foreground))]">{PROFILE.role}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:items-end gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            <span className="font-medium">{PROFILE.shift}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            <span>Assigned: <span className="font-medium text-[rgb(var(--primary))]">{PROFILE.zone}</span></span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span>{PROFILE.attendance} • {PROFILE.status}</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Workspace */}
        <motion.div 
          className="lg:col-span-2 flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Performance Summary */}
          <motion.div variants={fadeUp}>
            <ResponsiveGrid columns={4}>
              {PERFORMANCE.map((perf, i) => (
                <Card key={i} className="bg-[rgb(var(--surface-0))] border-[rgb(var(--border))]">
                  <CardContent className="p-4 flex flex-col gap-1 items-center text-center">
                    <perf.icon className={`h-5 w-5 ${perf.color} mb-1`} />
                    <span className="text-2xl font-bold">{perf.value}</span>
                    <span className="text-xs text-[rgb(var(--muted-foreground))]">{perf.label}</span>
                  </CardContent>
                </Card>
              ))}
            </ResponsiveGrid>
          </motion.div>

          {/* Tasks & Reporting Tabs */}
          <motion.div variants={fadeUp}>
            <Card className="bg-[rgb(var(--surface-0))] border-[rgb(var(--border))] overflow-hidden flex flex-col h-[500px]">
              <div className="flex border-b border-[rgb(var(--border))]">
                <button 
                  className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'tasks' ? 'border-b-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))]' : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'}`}
                  onClick={() => setActiveTab('tasks')}
                >
                  Today&apos;s Tasks
                </button>
                <button 
                  className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'report' ? 'border-b-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))]' : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'}`}
                  onClick={() => setActiveTab('report')}
                >
                  Report Incident
                </button>
              </div>
              
              <CardContent className="flex-1 p-0 overflow-y-auto no-scrollbar relative">
                <AnimatePresence mode="wait">
                  {activeTab === 'tasks' ? (
                    <motion.div 
                      key="tasks"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="p-4 flex flex-col gap-3"
                    >
                      {TASKS.map(task => (
                        <div key={task.id} className="p-4 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-1))]/50 hover:bg-[rgb(var(--surface-1))] transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline" className={`text-[10px] ${
                              task.priority === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                              task.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
                              'bg-green-500/10 text-green-500 border-green-500/20'
                            }`}>
                              {task.priority} Priority
                            </Badge>
                            <Badge variant="outline" className={`text-[10px] ${
                              task.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                              task.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                              'bg-[rgb(var(--background))]'
                            }`}>
                              {task.status}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-sm mb-2">{task.title}</h3>
                          <div className="flex items-center gap-4 text-xs text-[rgb(var(--muted-foreground))]">
                            <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {task.location}</div>
                            <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {task.duration}</div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="report"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="p-4 flex flex-col gap-4"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {['Medical', 'Security', 'Lost Child', 'Lost Item', 'Crowd', 'Maintenance'].map(cat => (
                          <Button key={cat} variant="outline" className="h-10 text-xs justify-start px-3 bg-[rgb(var(--surface-1))]">
                            <Plus className="h-3 w-3 mr-2" /> {cat}
                          </Button>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold">Priority</label>
                        <div className="flex gap-2">
                          {['Low', 'Medium', 'High', 'Critical'].map(p => (
                            <Button key={p} variant="outline" size="sm" className="flex-1 text-xs">{p}</Button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold">Description</label>
                        <Textarea placeholder="Describe the situation..." className="resize-none h-24" />
                      </div>
                      <Button className="w-full mt-auto">Submit Report</Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interactive Mini-Map */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Assigned Zone Map">
              <Card className="bg-[rgb(var(--surface-0))] overflow-hidden p-4 flex items-center justify-center">
                <svg viewBox="0 0 400 200" className="w-full h-48 max-w-[400px]">
                  {/* Simplified Stadium Section */}
                  <rect x="50" y="20" width="300" height="160" rx="20" fill="rgb(var(--surface-1))" stroke="rgb(var(--border))" strokeWidth="2" />
                  
                  {/* Highlighted Zone B */}
                  <path d="M 50 100 Q 200 100 350 100 L 350 20 L 50 20 Z" fill="rgb(var(--primary))" fillOpacity="0.1" stroke="rgb(var(--primary))" strokeWidth="2" strokeDasharray="4 4" />
                  
                  {/* Volunteer Location Marker */}
                  <g transform="translate(150, 60)">
                    <motion.circle 
                      cx="0" cy="0" r="15" 
                      fill="rgb(var(--brand-accent))" fillOpacity="0.3"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <circle cx="0" cy="0" r="6" fill="rgb(var(--brand-accent))" stroke="rgb(var(--background))" strokeWidth="2" />
                    <text x="0" y="20" fontSize="10" fill="rgb(var(--foreground))" textAnchor="middle" className="font-semibold">You</text>
                  </g>
                  
                  <text x="200" y="45" fontSize="14" fill="rgb(var(--primary))" textAnchor="middle" fontWeight="bold">Gate B Zone</text>
                </svg>
              </Card>
            </SectionContainer>
          </motion.div>

        </motion.div>

        {/* RIGHT COLUMN: Comms & Status */}
        <motion.div 
          className="flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          
          {/* Shift Timeline */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Shift Schedule">
              <Card className="bg-[rgb(var(--surface-0))]">
                <CardContent className="p-4 relative">
                  <div className="absolute top-4 bottom-4 left-6 w-0.5 bg-[rgb(var(--border))]" />
                  <div className="space-y-4">
                    {TIMELINE.map((step, i) => (
                      <div key={i} className="flex gap-4 relative z-10 items-center">
                        <div className="flex flex-col items-center">
                          {step.status === 'past' ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 bg-[rgb(var(--surface-0))] rounded-full" />
                          ) : step.status === 'current' ? (
                            <div className="h-5 w-5 rounded-full border-2 border-[rgb(var(--primary))] bg-[rgb(var(--surface-0))] flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-[rgb(var(--primary))]" />
                            </div>
                          ) : (
                            <Circle className="h-5 w-5 text-[rgb(var(--muted-foreground))] bg-[rgb(var(--surface-0))] rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                          <span className={`text-sm ${step.status === 'current' ? 'font-bold text-[rgb(var(--primary))]' : 'font-medium'}`}>{step.title}</span>
                          <span className="text-xs text-[rgb(var(--muted-foreground))] font-mono">{step.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </SectionContainer>
          </motion.div>

          {/* Team Comms */}
          <motion.div variants={fadeUp} className="flex-1 flex flex-col min-h-[350px]">
            <SectionContainer title="Team Comms" className="h-full flex flex-col">
              <Card className="bg-[rgb(var(--surface-0))] flex-1 flex flex-col">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3">
                    {messages.map(msg => (
                      <div key={msg.id} className={`flex flex-col ${msg.role === 'organizer' ? 'bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20 p-2 rounded-lg' : ''}`}>
                        {msg.isBroadcast && (
                          <div className="flex items-center gap-1 text-[10px] text-[rgb(var(--primary))] font-bold uppercase mb-1">
                            <Megaphone className="h-3 w-3" /> Announcement
                          </div>
                        )}
                        <div className={`flex items-start gap-2 ${msg.name === 'You' ? 'flex-row-reverse' : ''}`}>
                          <Avatar className="h-6 w-6 mt-0.5">
                            <AvatarFallback className={msg.role === 'organizer' ? 'bg-[rgb(var(--primary))] text-white text-[10px]' : 'bg-[rgb(var(--surface-1))] text-[10px]'}>
                              {msg.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`flex flex-col ${msg.name === 'You' ? 'items-end' : 'items-start'}`}>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold">{msg.name}</span>
                              <span className="text-[9px] text-[rgb(var(--muted-foreground))]">{msg.time}</span>
                            </div>
                            <div className={`text-sm px-3 py-2 rounded-lg ${msg.name === 'You' ? 'bg-[rgb(var(--primary))] text-white rounded-tr-none' : 'bg-[rgb(var(--surface-1))] rounded-tl-none'}`}>
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-[rgb(var(--border))]">
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Message Gate B Team..." 
                        className="flex-1 bg-[rgb(var(--surface-1))] border border-[rgb(var(--border))] rounded-full px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[rgb(var(--primary))]" 
                      />
                      <Button size="icon-sm" onClick={handleSendMessage} className="rounded-full h-8 w-8 shrink-0">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </SectionContainer>
          </motion.div>

          {/* Emergency Quick Actions */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Emergency Actions">
              <Card className="bg-red-500/5 border-red-500/20">
                <CardContent className="p-3 grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="h-9 text-xs justify-start gap-2 bg-[rgb(var(--surface-0))] hover:bg-red-500/10 hover:text-red-500 border-red-500/20">
                    <Heart className="h-3.5 w-3.5" /> Medical
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 text-xs justify-start gap-2 bg-[rgb(var(--surface-0))] hover:bg-red-500/10 hover:text-red-500 border-red-500/20">
                    <ShieldAlert className="h-3.5 w-3.5" /> Security
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 text-xs justify-start gap-2 bg-[rgb(var(--surface-0))] hover:bg-orange-500/10 hover:text-orange-500 border-orange-500/20">
                    <Activity className="h-3.5 w-3.5" /> Command
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 text-xs justify-start gap-2 bg-[rgb(var(--surface-0))] hover:bg-orange-500/10 hover:text-orange-500 border-orange-500/20">
                    <Flame className="h-3.5 w-3.5" /> Fire
                  </Button>
                  <Button variant="destructive" size="sm" className="h-9 text-xs col-span-2 gap-2 mt-1">
                    <DoorOpen className="h-3.5 w-3.5" /> Find Nearest Exit
                  </Button>
                </CardContent>
              </Card>
            </SectionContainer>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
