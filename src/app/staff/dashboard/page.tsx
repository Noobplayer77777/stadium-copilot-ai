'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Clock, MapPin, CheckCircle2, AlertTriangle, 
  MessageSquare, Zap, Wrench, Package, 
  ShieldAlert, Phone, CheckCircle, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { ResponsiveGrid } from '@/components/layout/ResponsiveGrid';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserStore } from '@/store';

// Mock Data
const PROFILE = {
  id: 'STF-MAIN-102',
  department: 'Facility Management',
  shift: '06:00 - 14:00 (Morning)',
  zone: 'Sector 2 (East & South)',
  status: 'On Duty',
  supervisor: 'Sarah Jenkins (MGR-04)'
};

const METRICS = [
  { label: 'Completed Tasks', value: '14', icon: CheckCircle2, color: 'text-green-500' },
  { label: 'Pending Tasks', value: '5', icon: Clock, color: 'text-orange-500' },
  { label: 'Avg Resolution', value: '18m', icon: Activity, color: 'text-blue-500' },
  { label: 'Equipment Uptime', value: '99.8%', icon: Zap, color: 'text-purple-500' },
];

const WORK_ORDERS = [
  { id: 'WO-8842', category: 'Electrical', location: 'East Gate Lighting', priority: 'High', time: '08:15', duration: '45m', status: 'In Progress' },
  { id: 'WO-8843', category: 'HVAC', location: 'VIP Lounge A', priority: 'Medium', time: '09:00', duration: '1h 30m', status: 'Pending' },
  { id: 'WO-8844', category: 'Cleaning', location: 'Sector 2 Concourses', priority: 'Low', time: '09:30', duration: '2h', status: 'Pending' },
  { id: 'WO-8841', category: 'Escalator', location: 'South Plaza Esc-3', priority: 'Critical', time: '07:45', duration: '2h', status: 'In Progress' },
];

const MAINTENANCE_REQUESTS = [
  { location: 'Restroom North-2', issue: 'Water leak from sink', priority: 'High', reporter: 'Org-Command', time: '10:05', status: 'Assigned' },
  { location: 'Food Court B', issue: 'Power trip at Stall 4', priority: 'Critical', reporter: 'Vendor', time: '10:12', status: 'Investigating' },
  { location: 'Gate E', issue: 'Turnstile 2 jammed', priority: 'Medium', reporter: 'Security', time: '09:55', status: 'Assigned' },
];

const INCIDENTS = [
  { desc: 'Power failure on East Concourse', staff: 'Unassigned', eta: '-', status: 'New', priority: 'Critical' },
  { desc: 'Broken handrail near Section 114', staff: 'Mike T.', eta: '15m', status: 'Responding', priority: 'High' },
  { desc: 'Spill reported in VIP corridor', staff: 'Cleaning T2', eta: '5m', status: 'Responding', priority: 'Medium' },
];

const EQUIPMENT = [
  { name: 'Cleaning Machines', status: 'Operational', count: '12/12' },
  { name: 'Generators', status: 'Operational', count: '4/4' },
  { name: 'UPS Systems', status: 'Operational', count: '8/8' },
  { name: 'Lighting Arrays', status: 'Under Maintenance', count: '31/32' },
  { name: 'Elevators', status: 'Operational', count: '16/16' },
  { name: 'Escalators', status: 'Offline', count: '11/12', issue: 'South Esc-3' },
];

const INVENTORY = [
  { name: 'Cleaning Supplies', stock: 85, color: 'bg-green-500' },
  { name: 'First Aid Kits', stock: 92, color: 'bg-green-500' },
  { name: 'Water Bottles', stock: 45, color: 'bg-yellow-500' },
  { name: 'Barrier Fences', stock: 60, color: 'bg-yellow-500' },
  { name: 'Fire Extinguishers', stock: 100, color: 'bg-green-500' },
  { name: 'Spare Lights', stock: 15, color: 'bg-red-500' },
];

const MESSAGES = [
  { sender: 'Organizer', text: 'Prepare Sector 2 for early VIP arrivals.', time: '08:30' },
  { sender: 'Security', text: 'Gate E turnstile issue logged. Needs immediate fix.', time: '09:56' },
  { sender: 'Medical Team', text: 'Please ensure paths to Med Room 2 are clear.', time: '10:05' },
];

const MAP_LOCATIONS = [
  { id: 'restroom', name: 'Restrooms', x: 100, y: 150, color: 'fill-cyan-500' },
  { id: 'electrical', name: 'Electrical Room', x: 250, y: 50, color: 'fill-yellow-500' },
  { id: 'generator', name: 'Main Generator', x: 350, y: 50, color: 'fill-orange-500' },
  { id: 'control', name: 'Control Room', x: 150, y: 80, color: 'fill-purple-500' },
  { id: 'office', name: 'Maintenance Office', x: 200, y: 180, color: 'fill-blue-500' },
  { id: 'cleaning', name: 'Cleaning Storage', x: 300, y: 180, color: 'fill-emerald-500' },
  { id: 'medical', name: 'Medical Supply', x: 50, y: 80, color: 'fill-red-500' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function StaffDashboard() {
  const { user } = useUserStore();
  const [activeQueueTab, setActiveQueueTab] = useState<'work' | 'maint' | 'incident'>('work');
  const [incidentFilter, setIncidentFilter] = useState('All');
  const [selectedMapNode, setSelectedMapNode] = useState<string | null>('office');

  const filteredIncidents = incidentFilter === 'All' 
    ? INCIDENTS 
    : INCIDENTS.filter(i => i.priority === incidentFilter);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'High': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-green-500/10 text-green-500 border-green-500/20';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Operational': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Under Maintenance': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Offline': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-[rgb(var(--surface-1))]';
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      
      {/* Top Header: Profile & Quick Actions */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col xl:flex-row gap-6">
        
        {/* Profile Card */}
        <Card className="flex-1 bg-[rgb(var(--surface-0))] border-[rgb(var(--border))]">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-20 w-20 border-2 border-[rgb(var(--primary))]">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="bg-[rgb(var(--primary))]/10 text-2xl text-[rgb(var(--primary))]">
                {user?.name?.[0] || 'S'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold">{user?.name || 'Venue Staff'}</h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mt-2">
                <Badge variant="outline" className="font-mono bg-[rgb(var(--surface-1))]">{PROFILE.id}</Badge>
                <span className="text-sm font-medium text-[rgb(var(--muted-foreground))]">{PROFILE.department}</span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mt-4 text-sm text-[rgb(var(--muted-foreground))]">
                <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {PROFILE.shift}</div>
                <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Assigned: {PROFILE.zone}</div>
                <div className="flex items-center gap-1.5"><User className="h-4 w-4" /> Supervisor: {PROFILE.supervisor}</div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center shrink-0">
              <span className="relative flex h-4 w-4 mb-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-green-500">{PROFILE.status}</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="w-full xl:w-[400px] shrink-0 bg-[rgb(var(--surface-0))] border-[rgb(var(--border))]">
          <CardHeader className="pb-3 border-b border-[rgb(var(--border))]">
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="h-10 text-xs justify-start px-3 border-red-500/20 hover:bg-red-500/10 hover:text-red-500">
              <AlertTriangle className="h-4 w-4 mr-2" /> Report Issue
            </Button>
            <Button variant="outline" size="sm" className="h-10 text-xs justify-start px-3">
              <Package className="h-4 w-4 mr-2" /> Req. Supplies
            </Button>
            <Button variant="outline" size="sm" className="h-10 text-xs justify-start px-3 border-orange-500/20 hover:bg-orange-500/10 hover:text-orange-500">
              <Wrench className="h-4 w-4 mr-2" /> Emerg. Repair
            </Button>
            <Button variant="outline" size="sm" className="h-10 text-xs justify-start px-3">
              <Phone className="h-4 w-4 mr-2" /> Supervisor
            </Button>
            <Button className="col-span-2 h-10 text-xs mt-1">
              <CheckCircle className="h-4 w-4 mr-2" /> Mark Current Task Complete
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (2/3) */}
        <motion.div 
          className="xl:col-span-2 flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Performance Metrics */}
          <motion.div variants={fadeUp}>
            <ResponsiveGrid columns={4}>
              {METRICS.map((metric, i) => (
                <Card key={i} className="bg-[rgb(var(--surface-0))] border-[rgb(var(--border))]">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                    <metric.icon className={`h-6 w-6 ${metric.color} mb-2`} />
                    <span className="text-2xl font-bold">{metric.value}</span>
                    <span className="text-xs text-[rgb(var(--muted-foreground))] mt-1">{metric.label}</span>
                  </CardContent>
                </Card>
              ))}
            </ResponsiveGrid>
          </motion.div>

          {/* Tabbed Queue System */}
          <motion.div variants={fadeUp}>
            <Card className="bg-[rgb(var(--surface-0))] border-[rgb(var(--border))] overflow-hidden flex flex-col h-[500px]">
              <div className="flex overflow-x-auto scrollbar-hide border-b border-[rgb(var(--border))] bg-[rgb(var(--surface-1))]/50">
                <button 
                  className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${activeQueueTab === 'work' ? 'border-b-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-[rgb(var(--background))]' : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'}`}
                  onClick={() => setActiveQueueTab('work')}
                >
                  Work Orders ({WORK_ORDERS.length})
                </button>
                <button 
                  className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${activeQueueTab === 'maint' ? 'border-b-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-[rgb(var(--background))]' : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'}`}
                  onClick={() => setActiveQueueTab('maint')}
                >
                  Maintenance Requests
                </button>
                <button 
                  className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${activeQueueTab === 'incident' ? 'border-b-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-[rgb(var(--background))]' : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'}`}
                  onClick={() => setActiveQueueTab('incident')}
                >
                  Incident Queue
                </button>
              </div>
              
              <CardContent className="flex-1 p-0 overflow-y-auto no-scrollbar relative bg-[rgb(var(--surface-0))]">
                <AnimatePresence mode="wait">
                  
                  {activeQueueTab === 'work' && (
                    <motion.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 flex flex-col gap-3">
                      {WORK_ORDERS.map(wo => (
                        <div key={wo.id} className="p-4 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-1))]/30 hover:bg-[rgb(var(--surface-1))] transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-mono text-[10px] bg-[rgb(var(--background))]">{wo.id}</Badge>
                              <Badge variant="outline" className={`text-[10px] ${getPriorityBadge(wo.priority)}`}>{wo.priority}</Badge>
                            </div>
                            <Badge variant="outline" className="text-[10px] bg-[rgb(var(--background))]">{wo.status}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-2 font-medium">
                            <Wrench className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                            {wo.category} - {wo.location}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-[rgb(var(--muted-foreground))]">
                            <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> Assigned: {wo.time}</div>
                            <div className="flex items-center gap-1"><Activity className="h-3 w-3" /> ETA: {wo.duration}</div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeQueueTab === 'maint' && (
                    <motion.div key="maint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 flex flex-col gap-3">
                      {MAINTENANCE_REQUESTS.map((req, i) => (
                        <div key={i} className="p-4 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-1))]/30 hover:bg-[rgb(var(--surface-1))] transition-colors border-l-4" style={{ borderLeftColor: req.priority === 'Critical' ? 'rgb(239, 68, 68)' : req.priority === 'High' ? 'rgb(249, 115, 22)' : 'rgb(59, 130, 246)' }}>
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-sm">{req.issue}</span>
                            <Badge variant="outline" className={`text-[10px] ${getPriorityBadge(req.priority)}`}>{req.priority}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-[rgb(var(--muted-foreground))] mt-3">
                            <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {req.location}</div>
                            <div className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {req.reporter}</div>
                            <div className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {req.time}</div>
                            <div className="flex items-center gap-1.5 text-[rgb(var(--foreground))]"><CheckCircle2 className="h-3.5 w-3.5" /> {req.status}</div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeQueueTab === 'incident' && (
                    <motion.div key="incident" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 flex flex-col gap-4">
                      <div className="flex gap-2 mb-2">
                        {['All', 'Critical', 'High', 'Medium', 'Low'].map(f => (
                          <Button key={f} variant={incidentFilter === f ? 'default' : 'outline'} size="sm" className="h-7 text-xs" onClick={() => setIncidentFilter(f)}>
                            {f}
                          </Button>
                        ))}
                      </div>
                      <div className="flex flex-col gap-3">
                        {filteredIncidents.map((inc, i) => (
                          <div key={i} className="p-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface-1))]/30 flex items-center justify-between">
                            <div className="flex flex-col gap-1.5">
                              <span className="font-medium text-sm flex items-center gap-2">
                                <ShieldAlert className={`h-4 w-4 ${inc.priority === 'Critical' ? 'text-red-500' : 'text-orange-500'}`} />
                                {inc.desc}
                              </span>
                              <div className="flex items-center gap-3 text-xs text-[rgb(var(--muted-foreground))]">
                                <span>Assigned: {inc.staff}</span>
                                <span>ETA: {inc.eta}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-[10px] bg-[rgb(var(--background))]">{inc.status}</Badge>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interactive Facility Map */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Interactive Facility Map (Sector 2)">
              <Card className="bg-[rgb(var(--surface-0))] border-[rgb(var(--border))]">
                <CardContent className="p-0 flex flex-col md:flex-row h-[350px]">
                  {/* SVG Map */}
                  <div className="flex-1 p-4 bg-[rgb(var(--surface-1))]/30 border-b md:border-b-0 md:border-r border-[rgb(var(--border))] flex items-center justify-center relative">
                    <svg viewBox="0 0 400 250" className="w-full h-full max-h-[300px]">
                      {/* Base structure */}
                      <rect x="20" y="20" width="360" height="210" rx="10" fill="rgb(var(--surface-1))" stroke="rgb(var(--border))" strokeWidth="2" />
                      <line x1="20" y1="125" x2="380" y2="125" stroke="rgb(var(--border))" strokeWidth="2" strokeDasharray="4 4" />
                      
                      {MAP_LOCATIONS.map(loc => {
                        const isSelected = selectedMapNode === loc.id;
                        return (
                          <g 
                            key={loc.id} 
                            transform={`translate(${loc.x}, ${loc.y})`}
                            onClick={() => setSelectedMapNode(loc.id)}
                            className="cursor-pointer group"
                          >
                            <rect 
                              x="-15" y="-15" width="30" height="30" rx="4"
                              className={`${loc.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                              stroke={isSelected ? "rgb(var(--foreground))" : "none"}
                              strokeWidth="2"
                            />
                            {isSelected && (
                              <circle cx="0" cy="0" r="22" fill="none" stroke="rgb(var(--primary))" strokeWidth="2" className="animate-pulse" />
                            )}
                          </g>
                        );
                      })}
                    </svg>
                    <div className="absolute top-4 left-4 text-xs font-semibold text-[rgb(var(--muted-foreground))]">
                      Click room to inspect
                    </div>
                  </div>
                  
                  {/* Info Panel */}
                  <div className="w-full md:w-[250px] p-6 flex flex-col gap-4">
                    {selectedMapNode ? (
                      (() => {
                        const node = MAP_LOCATIONS.find(l => l.id === selectedMapNode);
                        return (
                          <>
                            <div>
                              <h3 className="font-bold text-lg">{node?.name}</h3>
                              <p className="text-xs text-[rgb(var(--muted-foreground))]">Sector 2 - Level 1</p>
                            </div>
                            <div className="space-y-3 mt-2">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-[rgb(var(--muted-foreground))]">Status</span>
                                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px]">Secure</Badge>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-[rgb(var(--muted-foreground))]">Last Inspected</span>
                                <span className="font-medium">45 mins ago</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-[rgb(var(--muted-foreground))]">Access Lvl</span>
                                <span className="font-medium">Staff Only</span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="w-full mt-auto text-xs">Request Access</Button>
                          </>
                        );
                      })()
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center h-full text-[rgb(var(--muted-foreground))]">
                        <MapPin className="h-8 w-8 mb-2 opacity-50" />
                        <p className="text-sm">Select a room</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </SectionContainer>
          </motion.div>

        </motion.div>

        {/* RIGHT COLUMN (1/3) */}
        <motion.div 
          className="flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Equipment Status */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Equipment Status">
              <Card className="bg-[rgb(var(--surface-0))] border-[rgb(var(--border))]">
                <CardContent className="p-4 flex flex-col gap-3">
                  {EQUIPMENT.map((eq, i) => (
                    <div key={i} className="flex flex-col gap-1 p-2 rounded-lg hover:bg-[rgb(var(--surface-1))]/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{eq.name}</span>
                        <Badge variant="outline" className={`text-[10px] ${getStatusBadge(eq.status)}`}>{eq.status}</Badge>
                      </div>
                      <div className="flex justify-between items-center text-xs text-[rgb(var(--muted-foreground))]">
                        <span>{eq.count} active</span>
                        {eq.issue && <span className="text-red-500 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {eq.issue}</span>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </SectionContainer>
          </motion.div>

          {/* Inventory Levels */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Inventory Levels (Zone 2)">
              <Card className="bg-[rgb(var(--surface-0))] border-[rgb(var(--border))]">
                <CardContent className="p-4 flex flex-col gap-4">
                  {INVENTORY.map((inv, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between items-center text-sm">
                        <span>{inv.name}</span>
                        <span className="font-medium text-[rgb(var(--muted-foreground))]">{inv.stock}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[rgb(var(--surface-1))] rounded-full overflow-hidden">
                        <div className={`h-full ${inv.color}`} style={{ width: `${inv.stock}%` }} />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-2 text-xs">Request Restock</Button>
                </CardContent>
              </Card>
            </SectionContainer>
          </motion.div>

          {/* Communications */}
          <motion.div variants={fadeUp}>
            <SectionContainer title="Recent Comms">
              <Card className="bg-[rgb(var(--surface-0))] border-[rgb(var(--border))]">
                <CardContent className="p-0">
                  <div className="divide-y divide-[rgb(var(--border))]">
                    {MESSAGES.map((msg, i) => (
                      <div key={i} className="p-4 flex gap-3 hover:bg-[rgb(var(--surface-1))]/30 transition-colors">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback className="bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] text-xs">
                            {msg.sender[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1 w-full">
                          <div className="flex justify-between items-center w-full">
                            <span className="font-semibold text-sm">{msg.sender}</span>
                            <span className="text-[10px] text-[rgb(var(--muted-foreground))]">{msg.time}</span>
                          </div>
                          <p className="text-xs text-[rgb(var(--muted-foreground))] leading-snug">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-[rgb(var(--border))] bg-[rgb(var(--surface-1))]/50">
                    <Button variant="ghost" size="sm" className="w-full text-xs gap-2">
                      <MessageSquare className="h-3.5 w-3.5" /> Open Messages
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </SectionContainer>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}
