'use client';

import React from 'react';

export default function OrganizerDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* KPI Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Attendees */}
        <div className="p-6 rounded-xl relative overflow-hidden group" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div 
            className="absolute w-full h-[2px] left-0" 
            style={{ 
              background: 'linear-gradient(to right, transparent, rgba(34, 211, 238, 0.2), transparent)',
              animation: 'scan 3s linear infinite'
            }} 
          />
          <style>{`@keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }`}</style>
          
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-[#00f5ff] text-3xl">groups</span>
            <span className="text-[10px] bg-[#00f5ff]/20 text-[#00f5ff] px-2 py-0.5 rounded font-bold uppercase">Live</span>
          </div>
          <h3 className="text-white/50 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Total Attendees</h3>
          <p className="text-4xl font-black text-white tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>42.5k</p>
          <div className="mt-4 w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <div className="bg-[#00f5ff] h-full w-[85%]" style={{ boxShadow: '0 0 8px rgba(34,211,238,0.8)' }}></div>
          </div>
        </div>

        {/* Active Incidents */}
        <div className="p-6 rounded-xl border-red-500/20 relative overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-red-500 text-3xl">warning</span>
            <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded font-bold uppercase">Priority</span>
          </div>
          <h3 className="text-white/50 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Active Incidents</h3>
          <p className="text-4xl font-black text-white tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>12</p>
          <p className="mt-4 text-[10px] text-red-400/80 uppercase font-bold">+2 since last sync</p>
        </div>

        {/* Staff Deployed */}
        <div className="p-6 rounded-xl relative overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-[#a855f7] text-3xl">badge</span>
            <span className="text-[10px] bg-[#a855f7]/20 text-[#a855f7] px-2 py-0.5 rounded font-bold uppercase">Deployment</span>
          </div>
          <h3 className="text-white/50 text-xs uppercase tracking-widest mb-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Staff Deployed</h3>
          <p className="text-4xl font-black text-white tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>148</p>
          <div className="flex gap-1 mt-4">
            <div className="h-1 flex-1 bg-[#a855f7]"></div>
            <div className="h-1 flex-1 bg-[#a855f7]"></div>
            <div className="h-1 flex-1 bg-[#a855f7]/30"></div>
            <div className="h-1 flex-1 bg-[#a855f7]/30"></div>
          </div>
        </div>
      </section>

      {/* Interactive Stadium Map */}
      <section className="rounded-xl overflow-hidden relative min-h-[400px] flex flex-col" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div className="absolute top-4 left-4 z-10 space-y-2">
          <div className="bg-black/60 backdrop-blur-md p-3 border border-white/10 rounded-lg">
            <h4 className="text-[#00f5ff] font-bold text-xs uppercase tracking-widest mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Live Heatmap</h4>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[10px] text-white/80">Gate 4: Critical Congestion</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span className="text-[10px] text-white/80">Section 112: Medical Alert</span>
            </div>
          </div>
        </div>
        
        {/* Map Background Container */}
        <div className="flex-1 relative bg-neutral-900 overflow-hidden">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay"></div>
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCfBaoL898ATarXazehMwIdYSEQMgyawRqvfXJSft8TCj3twBgQwtqk92X-Apzd4SnSnNUdjPvojkeYPc-38gd7b0XKFLECX7R6bcvE1LDTw1YHQtnXyZpe25qDi9Lr69usSzdHM_rMDTewYqC7oD7D8C5yKxICt3YJAqn_3OCR_zA3q6qyStXjCnw7Pw71GGQpZH5nbr4-DXqIekMPpaWQ2YX-1tFj3PvAcjfxfOwEyLJ8fQ9ovAJ6EO45FqOBfcHhYJ4AfvGo5SOm')" }}
          ></div>
          
          {/* Pulsing Points of Interest */}
          <div className="absolute top-[45%] left-[20%] w-12 h-12 bg-red-500/40 rounded-full animate-ping border-2 border-red-500"></div>
          <div className="absolute top-[45%] left-[20%] w-4 h-4 bg-red-500 rounded-full border border-white shadow-[0_0_15px_rgba(239,68,68,1)]"></div>
          
          <div className="absolute bottom-[30%] right-[35%] w-8 h-8 bg-orange-500/40 rounded-full animate-pulse border-2 border-orange-500"></div>
          <div className="absolute bottom-[30%] right-[35%] w-4 h-4 bg-orange-500 rounded-full border border-white shadow-[0_0_15px_rgba(249,115,22,1)]"></div>
        </div>
        
        <div className="p-4 bg-black/40 border-t border-white/10 flex justify-between items-center">
          <span className="text-[10px] font-mono text-white/40 uppercase">Map Zoom: 1:400 | Layer: Thermal_Overlay_v4</span>
          <button className="bg-[#00f5ff]/10 text-[#00f5ff] text-[10px] px-3 py-1 rounded border border-[#00f5ff]/20 hover:bg-[#00f5ff]/20 transition-all font-bold uppercase">
            Recalibrate Sensors
          </button>
        </div>
      </section>

      {/* Active Alerts */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold uppercase tracking-widest text-white/80 flex items-center gap-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            <span className="material-symbols-outlined text-[#00f5ff]">rss_feed</span>
            Active Alerts
          </h2>
          <button className="text-xs text-white/40 hover:text-white uppercase tracking-tighter">View Archive</button>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {/* High Priority */}
          <div className="p-4 rounded-xl border-l-4 border-red-500 flex items-center gap-4 group hover:bg-red-500/5 transition-all shadow-[0_0_20px_rgba(239,68,68,0.1)] cursor-pointer" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)' }}>
            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
              <span className="material-symbols-outlined text-3xl">door_front</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-white font-bold text-sm">Gate 4 Bottleneck</h4>
                <span className="text-[10px] font-mono text-red-500 font-bold">URGENT</span>
              </div>
              <p className="text-white/60 text-xs mt-1">Ingress exceeds capacity by 42%. Dispatching auxiliary stewards now.</p>
            </div>
            <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors">chevron_right</span>
          </div>

          {/* Medium Priority */}
          <div className="p-4 rounded-xl border-l-4 border-orange-500 flex items-center gap-4 group hover:bg-orange-500/5 transition-all shadow-[0_0_20px_rgba(249,115,22,0.1)] cursor-pointer" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)' }}>
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
              <span className="material-symbols-outlined text-3xl">medical_services</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-white font-bold text-sm">Medical incident in Section 112</h4>
                <span className="text-[10px] font-mono text-orange-500 font-bold">STABILIZING</span>
              </div>
              <p className="text-white/60 text-xs mt-1">First responder Unit-7 on site. Reporting heat exhaustion. EMS standby.</p>
            </div>
            <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors">chevron_right</span>
          </div>

          {/* Low Priority */}
          <div className="p-4 rounded-xl border-l-4 border-[#00f5ff] flex items-center gap-4 group hover:bg-[#00f5ff]/5 transition-all cursor-pointer" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)' }}>
            <div className="w-12 h-12 rounded-lg bg-[#00f5ff]/20 flex items-center justify-center text-[#00f5ff] shrink-0">
              <span className="material-symbols-outlined text-3xl">groups_3</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-white font-bold text-sm">Staffing short at Concourse B</h4>
                <span className="text-[10px] font-mono text-[#00f5ff] font-bold">INFO</span>
              </div>
              <p className="text-white/60 text-xs mt-1">Check-point 4 reporting -2 staff. Requesting reassignment from Concourse A.</p>
            </div>
            <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-colors">chevron_right</span>
          </div>
        </div>
      </section>
    </div>
  );
}
