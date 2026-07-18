'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, Users, ShieldAlert, DoorOpen, Coffee, 
  ShoppingBag, Droplets, Train, 
  Accessibility, AlertTriangle, Navigation
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Types
type Category = 'Gate' | 'Transport' | 'Food' | 'Merchandise' | 'Restroom' | 'Medical' | 'Security' | 'Services';
type CrowdLevel = 'Low' | 'Medium' | 'High' | 'Very High';

interface MapLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  category: Category;
  description: string;
  walkingTime: string;
  accessibility: boolean;
  baseCrowd: number; // 0-100
}

// Data
const LOCATIONS: MapLocation[] = [
  { id: 'gate-n', name: 'North Gate', x: 400, y: 80, category: 'Gate', description: 'Main entrance for general admission.', walkingTime: '2 mins', accessibility: true, baseCrowd: 60 },
  { id: 'gate-s', name: 'South Gate', x: 400, y: 520, category: 'Gate', description: 'Secondary entrance with family lanes.', walkingTime: '2 mins', accessibility: true, baseCrowd: 40 },
  { id: 'gate-e', name: 'East Gate', x: 700, y: 300, category: 'Gate', description: 'Direct access from public transport.', walkingTime: '1 min', accessibility: true, baseCrowd: 80 },
  { id: 'gate-w', name: 'West Gate', x: 100, y: 300, category: 'Gate', description: 'Quick access for VIP and hospitality.', walkingTime: '4 mins', accessibility: true, baseCrowd: 20 },
  { id: 'vip', name: 'VIP Entrance', x: 180, y: 200, category: 'Gate', description: 'Exclusive entrance for VIP ticket holders.', walkingTime: '1 min', accessibility: true, baseCrowd: 10 },
  
  { id: 'parking', name: 'Parking Zone C', x: 80, y: 100, category: 'Transport', description: 'Multi-level parking structure.', walkingTime: '8 mins', accessibility: true, baseCrowd: 50 },
  { id: 'metro', name: 'Metro Stop', x: 750, y: 150, category: 'Transport', description: 'Stadium Express Line terminal.', walkingTime: '5 mins', accessibility: true, baseCrowd: 85 },
  { id: 'bus', name: 'Bus Stop', x: 750, y: 450, category: 'Transport', description: 'City bus lines 42 and 55.', walkingTime: '6 mins', accessibility: true, baseCrowd: 45 },
  { id: 'taxi', name: 'Taxi Zone', x: 100, y: 500, category: 'Transport', description: 'Rideshare and taxi pickup/dropoff.', walkingTime: '7 mins', accessibility: true, baseCrowd: 30 },
  
  { id: 'food-1', name: 'North Food Court', x: 300, y: 150, category: 'Food', description: 'Burgers, pizza, and international cuisine.', walkingTime: '3 mins', accessibility: true, baseCrowd: 70 },
  { id: 'food-2', name: 'South Food Court', x: 500, y: 450, category: 'Food', description: 'Local specialties and quick snacks.', walkingTime: '4 mins', accessibility: true, baseCrowd: 55 },
  
  { id: 'merch', name: 'Megastore', x: 300, y: 450, category: 'Merchandise', description: 'Official jerseys and memorabilia.', walkingTime: '5 mins', accessibility: true, baseCrowd: 65 },
  
  { id: 'restroom-1', name: 'Restroom North', x: 500, y: 150, category: 'Restroom', description: 'Men, Women, and Family restrooms.', walkingTime: '2 mins', accessibility: true, baseCrowd: 35 },
  { id: 'restroom-2', name: 'Restroom South', x: 300, y: 400, category: 'Restroom', description: 'Men, Women, and Family restrooms.', walkingTime: '3 mins', accessibility: true, baseCrowd: 25 },
  
  { id: 'medical', name: 'Medical Center', x: 600, y: 420, category: 'Medical', description: 'First aid and emergency medical staff.', walkingTime: '4 mins', accessibility: true, baseCrowd: 5 },
  { id: 'security', name: 'Security Office', x: 600, y: 180, category: 'Security', description: 'Lost & Found, and incident reporting.', walkingTime: '3 mins', accessibility: true, baseCrowd: 10 },
  { id: 'help', name: 'Help Desk', x: 650, y: 300, category: 'Services', description: 'General inquiries and assistance.', walkingTime: '2 mins', accessibility: true, baseCrowd: 15 },
  { id: 'charging', name: 'Charging Station', x: 200, y: 250, category: 'Services', description: 'Mobile device charging lockers.', walkingTime: '3 mins', accessibility: true, baseCrowd: 40 },
];

// Helpers
const getCrowdLevel = (value: number): CrowdLevel => {
  if (value < 30) return 'Low';
  if (value < 65) return 'Medium';
  if (value < 85) return 'High';
  return 'Very High';
};

const getCrowdColor = (level: CrowdLevel) => {
  switch (level) {
    case 'Low': return 'text-green-500 bg-green-500/10 border-green-500/20';
    case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    case 'High': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    case 'Very High': return 'text-red-500 bg-red-500/10 border-red-500/20';
  }
};



export default function StadiumMapPage() {
  const [selectedId, setSelectedId] = useState<string>('gate-n');
  const [crowdData, setCrowdData] = useState<Record<string, number>>({});
  const [activeFilter, setActiveFilter] = useState<Category | 'All'>('All');
  
  const [routeStart, setRouteStart] = useState<string>('');
  const [routeEnd, setRouteEnd] = useState<string>('');

  // Initialize and update live crowd simulation
  useEffect(() => {
    const updateCrowd = () => {
      const newData: Record<string, number> = {};
      LOCATIONS.forEach(loc => {
        // Fluctuate around base crowd +/- 15
        const fluctuation = Math.floor(Math.random() * 30) - 15;
        newData[loc.id] = Math.max(0, Math.min(100, loc.baseCrowd + fluctuation));
      });
      setCrowdData(newData);
    };
    
    updateCrowd();
    const interval = setInterval(updateCrowd, 4000);
    return () => clearInterval(interval);
  }, []);

  const selectedLocation = useMemo(() => LOCATIONS.find(l => l.id === selectedId), [selectedId]);
  
  const filteredLocations = useMemo(() => {
    return activeFilter === 'All' 
      ? LOCATIONS 
      : LOCATIONS.filter(l => l.category === activeFilter);
  }, [activeFilter]);

  // SVG Path generation
  const routePath = useMemo(() => {
    if (!routeStart || !routeEnd) return null;
    const startLoc = LOCATIONS.find(l => l.id === routeStart);
    const endLoc = LOCATIONS.find(l => l.id === routeEnd);
    if (!startLoc || !endLoc) return null;
    
    // Smooth bezier curve between points
    const midX = (startLoc.x + endLoc.x) / 2;
    const midY = (startLoc.y + endLoc.y) / 2;
    // Add some curve based on coordinates to avoid crossing the pitch completely straight if possible
    const curveOffset = 50; 
    
    return `M ${startLoc.x} ${startLoc.y} Q ${midX} ${midY - curveOffset} ${endLoc.x} ${endLoc.y}`;
  }, [routeStart, routeEnd]);

  const handleLocationClick = (id: string) => {
    setSelectedId(id);
    if (routeStart && !routeEnd) {
      setRouteEnd(id);
    } else if (routeStart && routeEnd) {
      setRouteStart(id);
      setRouteEnd('');
    } else {
      setRouteStart(id);
    }
  };

  const handleQuickAction = (endId: string) => {
    setSelectedId(endId);
    setRouteStart('gate-n'); // Mock current location
    setRouteEnd(endId);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row gap-6 overflow-hidden pb-4">
      
      {/* Left / Center Map Area */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        
        {/* Filters & Route Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-[rgb(var(--surface-0))] rounded-xl border border-[rgb(var(--border))]">
          <div className="flex flex-wrap gap-2">
            {['All', 'Gate', 'Food', 'Restroom', 'Medical', 'Transport'].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(filter as Category | 'All')}
                className="h-8 text-xs rounded-full"
              >
                {filter}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={() => { setRouteStart(''); setRouteEnd(''); }} className="h-8 text-xs">
              Clear Route
            </Button>
          </div>
        </div>

        {/* Interactive SVG Map */}
        <div className="flex-1 bg-[rgb(var(--surface-0))] rounded-xl border border-[rgb(var(--border))] relative overflow-hidden flex items-center justify-center p-4">
          <svg 
            viewBox="0 0 800 600" 
            className="w-full h-full max-h-[800px] object-contain drop-shadow-sm"
          >
            {/* Stadium Base */}
            <rect x="50" y="50" width="700" height="500" rx="250" fill="rgb(var(--surface-1))" stroke="rgb(var(--border))" strokeWidth="2" />
            {/* Pitch */}
            <rect x="250" y="200" width="300" height="200" rx="20" fill="rgb(34, 197, 94, 0.1)" stroke="rgb(34, 197, 94, 0.3)" strokeWidth="2" />
            <circle cx="400" cy="300" r="30" fill="none" stroke="rgb(34, 197, 94, 0.3)" strokeWidth="2" />
            <line x1="400" y1="200" x2="400" y2="400" stroke="rgb(34, 197, 94, 0.3)" strokeWidth="2" />

            {/* Route Line */}
            {routePath && (
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                d={routePath} 
                fill="none" 
                stroke="rgb(var(--primary))" 
                strokeWidth="4" 
                strokeDasharray="8 8"
                className="animate-pulse"
              />
            )}

            {/* Locations */}
            <AnimatePresence>
              {filteredLocations.map(loc => {
                const crowdVal = crowdData[loc.id] ?? loc.baseCrowd;
                const level = getCrowdLevel(crowdVal);
                const isSelected = selectedId === loc.id;
                const isStart = routeStart === loc.id;
                const isEnd = routeEnd === loc.id;
                
                // Color pulse based on crowd
                let indicatorColor = 'rgb(34, 197, 94)'; // Low
                if (level === 'Medium') indicatorColor = 'rgb(234, 179, 8)';
                if (level === 'High') indicatorColor = 'rgb(249, 115, 22)';
                if (level === 'Very High') indicatorColor = 'rgb(239, 68, 68)';

                return (
                  <motion.g 
                    key={loc.id} 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={() => handleLocationClick(loc.id)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing background for crowd */}
                    <motion.circle
                      cx={loc.x} cy={loc.y} r="24"
                      fill={indicatorColor}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Node circle */}
                    <circle 
                      cx={loc.x} 
                      cy={loc.y} 
                      r={isSelected ? "18" : "16"} 
                      fill="rgb(var(--background))" 
                      stroke={isSelected ? "rgb(var(--primary))" : "rgb(var(--border))"} 
                      strokeWidth={isSelected ? "3" : "2"}
                      className="transition-all duration-300 group-hover:stroke-[rgb(var(--primary))]"
                    />
                    
                    {/* Start/End Badge */}
                    {(isStart || isEnd) && (
                      <circle cx={loc.x + 12} cy={loc.y - 12} r="8" fill="rgb(var(--primary))" />
                    )}
                    {(isStart || isEnd) && (
                      <text x={loc.x + 12} y={loc.y - 9} fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">
                        {isStart ? 'A' : 'B'}
                      </text>
                    )}

                    {/* Label */}
                    <text 
                      x={loc.x} 
                      y={loc.y + 32} 
                      fontSize="12" 
                      fill="rgb(var(--foreground))" 
                      textAnchor="middle" 
                      fontWeight={isSelected ? "bold" : "normal"}
                      className="drop-shadow-sm bg-[rgb(var(--background))]"
                    >
                      {loc.name}
                    </text>
                  </motion.g>
                );
              })}
            </AnimatePresence>
          </svg>
        </div>
      </div>

      {/* Right Information Panel */}
      <div className="w-full lg:w-[350px] shrink-0 flex flex-col gap-4">
        
        {/* Detail Card */}
        <AnimatePresence mode="wait">
          {selectedLocation ? (
            <motion.div
              key={selectedLocation.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <Card className="h-full bg-[rgb(var(--surface-0))] border-[rgb(var(--border))] flex flex-col">
                <CardHeader className="border-b border-[rgb(var(--border))] pb-4 bg-[rgb(var(--surface-1))]/50">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-[rgb(var(--background))]">{selectedLocation.category}</Badge>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Clock className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                      {selectedLocation.walkingTime}
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{selectedLocation.name}</CardTitle>
                  <CardDescription className="text-sm mt-1">{selectedLocation.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 pt-6 flex flex-col gap-6 overflow-y-auto no-scrollbar">
                  
                  {/* Crowd Level */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-[rgb(var(--muted-foreground))] uppercase tracking-wider">Live Crowd Status</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-[rgb(var(--muted-foreground))]" />
                        <span className="font-medium text-lg">
                          {crowdData[selectedLocation.id] ?? selectedLocation.baseCrowd}% Capacity
                        </span>
                      </div>
                      <Badge variant="outline" className={getCrowdColor(getCrowdLevel(crowdData[selectedLocation.id] ?? selectedLocation.baseCrowd))}>
                        {getCrowdLevel(crowdData[selectedLocation.id] ?? selectedLocation.baseCrowd)}
                      </Badge>
                    </div>
                    {/* Visual Bar */}
                    <div className="h-2 w-full bg-[rgb(var(--surface-1))] rounded-full overflow-hidden mt-2">
                      <motion.div 
                        className="h-full bg-current"
                        style={{ color: getCrowdColor(getCrowdLevel(crowdData[selectedLocation.id] ?? selectedLocation.baseCrowd)).split(' ')[0].replace('text-', '') }} 
                        // The raw tailwind class won't work in style natively without mapping, fallback to inline safe colors
                        animate={{ width: `${crowdData[selectedLocation.id] ?? selectedLocation.baseCrowd}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-[rgb(var(--muted-foreground))] uppercase tracking-wider">Amenities & Info</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm">
                        <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-md text-green-600 dark:text-green-400">
                          <Accessibility className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Wheelchair Accessible</p>
                          <p className="text-xs text-[rgb(var(--muted-foreground))]">Ramps and elevators nearby</p>
                        </div>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <div className="bg-[rgb(var(--secondary))] p-1.5 rounded-md text-[rgb(var(--foreground))]">
                          <DoorOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Operating Status</p>
                          <p className="text-xs text-[rgb(var(--muted-foreground))]">Open until 23:00</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-6">
                    <Button 
                      className="w-full gap-2" 
                      onClick={() => {
                        setRouteStart('gate-n');
                        setRouteEnd(selectedLocation.id);
                      }}
                    >
                      <Navigation className="h-4 w-4" />
                      Navigate Here
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="flex-1 bg-[rgb(var(--surface-0))] border-[rgb(var(--border))] flex items-center justify-center text-center p-6">
              <div className="flex flex-col items-center gap-2 text-[rgb(var(--muted-foreground))]">
                <MapPin className="h-8 w-8 mb-2 opacity-50" />
                <p>Select a location on the map to view details.</p>
              </div>
            </Card>
          )}
        </AnimatePresence>

        {/* Quick Actions Panel */}
        <Card className="bg-[rgb(var(--surface-0))] border-[rgb(var(--border))] shrink-0">
          <CardHeader className="py-3 px-4 border-b border-[rgb(var(--border))]">
            <CardTitle className="text-sm font-semibold">Quick Find</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="ghost" size="sm" className="h-8 text-xs justify-start px-2" onClick={() => handleQuickAction('restroom-1')}>
                <Droplets className="h-3.5 w-3.5 mr-2 text-cyan-500" /> Restroom
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs justify-start px-2" onClick={() => handleQuickAction('food-1')}>
                <Coffee className="h-3.5 w-3.5 mr-2 text-orange-500" /> Food
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs justify-start px-2" onClick={() => handleQuickAction('medical')}>
                <AlertTriangle className="h-3.5 w-3.5 mr-2 text-red-500" /> Medical
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs justify-start px-2" onClick={() => handleQuickAction('gate-e')}>
                <DoorOpen className="h-3.5 w-3.5 mr-2 text-emerald-500" /> Exit
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
