'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Clock, AlertTriangle, Activity, Car, Train, 
  ShieldAlert, Stethoscope, X, Search,
  Sparkles, TrendingUp, TrendingDown,
  MoreVertical, UserPlus, DoorOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/SectionContainer';

// Mock Data
const ALERTS = [
  { id: '1', type: 'Weather', message: 'Heavy rain expected in 45 minutes. Prepare sheltered areas.', priority: 'warning' },
  { id: '2', type: 'Traffic', message: 'Major congestion on I-95 North approach.', priority: 'critical' },
];

const KPIS = [
  { label: 'Total Fans', value: '62,450', trend: '+12%', icon: Users, color: 'text-blue-500', trendUp: true },
  { label: 'Inside Stadium', value: '48,100', trend: '+5%', icon: DoorOpen, color: 'text-emerald-500', trendUp: true },
  { label: 'Outside / Queue', value: '14,350', trend: '-2%', icon: Users, color: 'text-orange-500', trendUp: false },
  { label: 'Avg Wait Time', value: '14m', trend: '-3m', icon: Clock, color: 'text-purple-500', trendUp: false },
  { label: 'Incidents Today', value: '24', trend: '+2', icon: AlertTriangle, color: 'text-red-500', trendUp: true },
  { label: 'Medical Requests', value: '6', trend: '0', icon: Stethoscope, color: 'text-red-400', trendUp: false },
  { label: 'Parking Occupancy', value: '88%', trend: '+4%', icon: Car, color: 'text-cyan-500', trendUp: true },
  { label: 'Transport Status', value: 'Normal', trend: 'Stable', icon: Train, color: 'text-green-500', trendUp: true },
];

const CROWD_ZONES = [
  { name: 'North Gate', current: 4500, capacity: 5000, status: 'High' },
  { name: 'South Gate', current: 1200, capacity: 5000, status: 'Low' },
  { name: 'East Gate', current: 3800, capacity: 4000, status: 'Very High' },
  { name: 'West Gate', current: 500, capacity: 2000, status: 'Low' },
  { name: 'Food Court A', current: 1800, capacity: 2500, status: 'High' },
  { name: 'Parking C', current: 950, capacity: 1000, status: 'Very High' },
  { name: 'Metro Plaza', current: 3200, capacity: 6000, status: 'Medium' },
  { name: 'VIP Entrance', current: 150, capacity: 500, status: 'Low' },
];

const INCIDENTS = [
  { id: 'INC-092', priority: 'Critical', location: 'East Gate', team: 'Security T4', time: '14:22', status: 'Investigating' },
  { id: 'INC-091', priority: 'High', location: 'Block 112', team: 'Medical T2', time: '14:15', status: 'Responding' },
  { id: 'INC-090', priority: 'Medium', location: 'North Food', team: 'Cleaning T1', time: '14:05', status: 'Assigned' },
  { id: 'INC-089', priority: 'Low', location: 'Parking B', team: 'Traffic T3', time: '13:50', status: 'Resolved' },
  { id: 'INC-088', priority: 'Medium', location: 'South Gate', team: 'Security T1', time: '13:45', status: 'Resolved' },
];

const RESOURCES = [
  { type: 'Medical Teams', available: 4, busy: 2, responding: 1 },
  { type: 'Security Teams', available: 12, busy: 6, responding: 4 },
  { type: 'Volunteers', available: 45, busy: 110, responding: 0 },
  { type: 'Cleaning Staff', available: 8, busy: 22, responding: 3 },
  { type: 'Transport Units', available: 5, busy: 15, responding: 2 },
];

const AI_INSIGHTS = [
  { message: 'Redirect visitors from East Gate to North Gate to reduce bottleneck.', confidence: 94, action: 'Broadcast Reroute' },
  { message: 'Food Court A approaching capacity. Deploy 2 additional cleaning staff.', confidence: 88, action: 'Dispatch Staff' },
  { message: 'Metro arrivals peaking in 15 mins. Increase volunteer deployment at Metro Plaza.', confidence: 91, action: 'Reassign Volunteers' },
];

const ACTIVITY_FEED = [
  { time: '14:30:12', text: 'Medical T2 arrived at Block 112.', type: 'medical' },
  { time: '14:28:45', text: 'East Gate throughput dropped by 15%.', type: 'crowd' },
  { time: '14:25:00', text: 'Security T4 dispatched to East Gate.', type: 'security' },
  { time: '14:22:10', text: 'Incident INC-092 reported by Fan via App.', type: 'incident' },
  { time: '14:18:30', text: 'Metro Line B operating with 5m delays.', type: 'transport' },
  { time: '14:15:00', text: '12 Volunteers checked in for Shift 2.', type: 'volunteer' },
];

// Helper components
const Sparkline = ({ up }: { up: boolean }) => (
  <svg width="40" height="20" className="opacity-50">
    <path 
      d={up ? "M0 15 L10 12 L20 14 L30 5 L40 2" : "M0 2 L10 5 L20 4 L30 12 L40 15"} 
      stroke="currentColor" 
      fill="none" 
      strokeWidth="2" 
    />
  </svg>
);

export default function OrganizerDashboard() {
  const [alerts, setAlerts] = useState(ALERTS);
  const [incidentFilter, setIncidentFilter] = useState('All');
  
  // Real-time simulation state
  const [liveCrowd, setLiveCrowd] = useState(CROWD_ZONES);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCrowd(prev => prev.map(zone => {
        const fluctuation = Math.floor(Math.random() * 50) - 25;
        const newCurrent = Math.max(0, Math.min(zone.capacity, zone.current + fluctuation));
        let newStatus = 'Low';
        const percent = newCurrent / zone.capacity;
        if (percent > 0.6) newStatus = 'Medium';
        if (percent > 0.8) newStatus = 'High';
        if (percent > 0.95) newStatus = 'Very High';
        
        return { ...zone, current: newCurrent, status: newStatus };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredIncidents = incidentFilter === 'All' 
    ? INCIDENTS 
    : INCIDENTS.filter(i => i.priority === incidentFilter);

  return (
    <div className="flex flex-col gap-6 pb-8">
      
      {/* Alert Banner */}
      <AnimatePresence>
        {alerts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-2"
          >
            {alerts.map(alert => (
              <div key={alert.id} className={`flex items-center justify-between p-3 rounded-lg border ${alert.priority === 'critical' ? 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-400'}`}>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-semibold">{alert.type} Alert:</span>
                  <span className="text-sm">{alert.message}</span>
                </div>
                <Button variant="ghost" size="icon-sm" onClick={() => setAlerts(a => a.filter(x => x.id !== alert.id))}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {KPIS.map((kpi, i) => (
          <Card key={i} className="bg-[rgb(var(--surface-0))] border-[rgb(var(--border))]">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg bg-[rgb(var(--surface-1))] ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${kpi.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.trend}
                  {kpi.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-[rgb(var(--muted-foreground))]">{kpi.label}</p>
                  <div className={kpi.trendUp ? 'text-green-500' : 'text-red-500'}>
                    <Sparkline up={kpi.trendUp} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Dashboard Grid (Left 2/3) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* AI Insights Panel */}
          <Card className="bg-[rgb(var(--primary))]/5 border-[rgb(var(--primary))]/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[rgb(var(--primary))]" />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-[rgb(var(--primary))]">
                <Sparkles className="h-5 w-5" />
                AI Operational Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {AI_INSIGHTS.map((insight, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-md bg-[rgb(var(--background))] border border-[rgb(var(--border))]">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 shrink-0 mt-0.5">
                        {insight.confidence}% Match
                      </Badge>
                      <p className="text-sm">{insight.message}</p>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0">{insight.action}</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Crowd Monitor */}
          <SectionContainer title="Live Zone Occupancy">
            <Card className="bg-[rgb(var(--surface-0))]">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgb(var(--border))]">
                  {liveCrowd.map((zone, i) => {
                    const percent = Math.round((zone.current / zone.capacity) * 100);
                    let color = 'bg-green-500';
                    let badgeColor = 'bg-green-500/10 text-green-600 border-green-500/20';
                    if (percent > 60) { color = 'bg-yellow-500'; badgeColor = 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'; }
                    if (percent > 80) { color = 'bg-orange-500'; badgeColor = 'bg-orange-500/10 text-orange-600 border-orange-500/20'; }
                    if (percent > 95) { color = 'bg-red-500'; badgeColor = 'bg-red-500/10 text-red-600 border-red-500/20'; }

                    return (
                      <div key={i} className="bg-[rgb(var(--surface-0))] p-4 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{zone.name}</span>
                          <Badge variant="outline" className={`text-[10px] ${badgeColor}`}>{zone.status}</Badge>
                        </div>
                        <div className="flex justify-between items-end text-xs">
                          <span className="text-2xl font-bold">{zone.current.toLocaleString()}</span>
                          <span className="text-[rgb(var(--muted-foreground))] mb-1">/ {zone.capacity.toLocaleString()}</span>
                        </div>
                        <div className="h-1.5 w-full bg-[rgb(var(--surface-1))] rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full ${color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </SectionContainer>

          {/* Incident Management */}
          <SectionContainer title="Active Incidents">
            <Card className="bg-[rgb(var(--surface-0))]">
              <CardHeader className="p-4 border-b border-[rgb(var(--border))] flex flex-row items-center justify-between">
                <div className="flex gap-2">
                  {['All', 'Critical', 'High', 'Medium', 'Low'].map(f => (
                    <Button 
                      key={f}
                      variant={incidentFilter === f ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setIncidentFilter(f)}
                    >
                      {f}
                    </Button>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                  <Search className="h-3 w-3" /> Search
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-[rgb(var(--muted-foreground))] uppercase bg-[rgb(var(--surface-1))]/50">
                      <tr>
                        <th className="px-4 py-3 font-medium">ID</th>
                        <th className="px-4 py-3 font-medium">Priority</th>
                        <th className="px-4 py-3 font-medium">Location</th>
                        <th className="px-4 py-3 font-medium">Team</th>
                        <th className="px-4 py-3 font-medium">Time</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgb(var(--border))]">
                      {filteredIncidents.map(inc => (
                        <tr key={inc.id} className="hover:bg-[rgb(var(--surface-1))]/30 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs">{inc.id}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={`text-[10px] ${
                              inc.priority === 'Critical' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                              inc.priority === 'High' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' :
                              inc.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
                              'bg-green-500/10 text-green-600 border-green-500/20'
                            }`}>
                              {inc.priority}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-[rgb(var(--muted-foreground))]">{inc.location}</td>
                          <td className="px-4 py-3">{inc.team}</td>
                          <td className="px-4 py-3 text-[rgb(var(--muted-foreground))]">{inc.time}</td>
                          <td className="px-4 py-3">
                            <span className="flex items-center gap-1.5">
                              <span className={`h-1.5 w-1.5 rounded-full ${
                                inc.status === 'Resolved' ? 'bg-green-500' :
                                inc.status === 'Investigating' ? 'bg-orange-500' : 'bg-blue-500'
                              }`} />
                              {inc.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="icon-sm"><MoreVertical className="h-4 w-4" /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </SectionContainer>
        </div>

        {/* Right Activity Panel (1/3) */}
        <div className="flex flex-col gap-6">
          
          {/* Resource Panel */}
          <SectionContainer title="Resource Deployment">
            <Card className="bg-[rgb(var(--surface-0))]">
              <CardContent className="p-0 divide-y divide-[rgb(var(--border))]">
                {RESOURCES.map((res, i) => (
                  <div key={i} className="p-4 flex flex-col gap-3">
                    <span className="font-semibold text-sm">{res.type}</span>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-[rgb(var(--surface-1))] p-2 rounded flex flex-col gap-1">
                        <span className="text-lg font-bold text-green-500">{res.available}</span>
                        <span className="text-[rgb(var(--muted-foreground))]">Avail</span>
                      </div>
                      <div className="bg-[rgb(var(--surface-1))] p-2 rounded flex flex-col gap-1">
                        <span className="text-lg font-bold text-orange-500">{res.busy}</span>
                        <span className="text-[rgb(var(--muted-foreground))]">Busy</span>
                      </div>
                      <div className="bg-[rgb(var(--surface-1))] p-2 rounded flex flex-col gap-1">
                        <span className="text-lg font-bold text-blue-500">{res.responding}</span>
                        <span className="text-[rgb(var(--muted-foreground))]">Resp</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </SectionContainer>

          {/* Live Activity Feed */}
          <SectionContainer title="Live Activity Feed">
            <Card className="bg-[rgb(var(--surface-0))] h-[400px] flex flex-col">
              <CardContent className="p-4 flex-1 overflow-y-auto no-scrollbar relative">
                <div className="absolute left-7 top-4 bottom-4 w-px bg-[rgb(var(--border))]" />
                <div className="space-y-4">
                  {ACTIVITY_FEED.map((item, i) => {
                    let Icon = Activity;
                    let color = 'text-blue-500 bg-blue-500/10';
                    if (item.type === 'medical') { Icon = Stethoscope; color = 'text-red-500 bg-red-500/10'; }
                    if (item.type === 'security') { Icon = ShieldAlert; color = 'text-orange-500 bg-orange-500/10'; }
                    if (item.type === 'crowd') { Icon = Users; color = 'text-purple-500 bg-purple-500/10'; }
                    if (item.type === 'transport') { Icon = Train; color = 'text-cyan-500 bg-cyan-500/10'; }
                    if (item.type === 'volunteer') { Icon = UserPlus; color = 'text-green-500 bg-green-500/10'; }
                    
                    return (
                      <div key={i} className="flex gap-4 relative z-10">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 border border-[rgb(var(--background))] ${color}`}>
                          <Icon className="h-3 w-3" />
                        </div>
                        <div className="flex flex-col gap-0.5 pt-0.5">
                          <span className="text-xs text-[rgb(var(--muted-foreground))] font-mono">{item.time}</span>
                          <span className="text-sm leading-tight">{item.text}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </SectionContainer>

        </div>
      </div>
    </div>
  );
}
