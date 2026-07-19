'use client';

import React, { useEffect, useState } from 'react';

export default function FanDashboard() {
  const [timeLeft, setTimeLeft] = useState('00:44:59');

  useEffect(() => {
    // Micro-interaction: Countdown Timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const parts = prev.split(':');
        let h = parseInt(parts[0]);
        let m = parseInt(parts[1]);
        let s = parseInt(parts[2]);

        s--;
        if (s < 0) {
          s = 59;
          m--;
          if (m < 0) {
            m = 59;
            h--;
          }
        }
        
        // Don't let it go below 0
        if (h < 0) return "00:00:00";

        return String(h).padStart(2, '0') + ':' + 
               String(m).padStart(2, '0') + ':' + 
               String(s).padStart(2, '0');
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="pt-24 px-4 space-y-4 max-w-md mx-auto z-10 relative">
      {/* Match Day Status Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-black via-cyan-950/20 to-black border border-[#00f5ff]/30 p-5 flex flex-col items-center justify-center text-center">
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse"></div>
            <span className="font-bold text-[#00f5ff] tracking-[0.2em] text-xs" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>MATCH DAY: LIVE</span>
          </div>
          <h2 className="text-2xl font-black text-white uppercase" style={{ textShadow: '0 0 8px rgba(0, 245, 255, 0.6)' }}>Champions League Finals</h2>
        </div>
      </div>

      {/* Next Event Card */}
      <div className="rounded-xl p-4 flex justify-between items-center border-l-4 border-l-[#a855f7]" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div>
          <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Upcoming Event</p>
          <h3 className="font-bold text-lg text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Kickoff in 45 mins</h3>
        </div>
        <div className="flex flex-col items-end">
          <div className="font-black text-2xl text-[#a855f7] tabular-nums" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>{timeLeft}</div>
          <div className="text-[8px] text-white/40 uppercase tracking-widest">Countdown</div>
        </div>
      </div>

      {/* Live Stadium Map Widget */}
      <div className="rounded-xl overflow-hidden flex flex-col group cursor-pointer" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div className="p-4 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f5ff] text-sm">explore</span>
            <span className="text-xs uppercase tracking-widest font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Live Navigation</span>
          </div>
          <span className="text-[10px] text-white/40 font-medium">To: Section 124</span>
        </div>
        <div className="relative h-48 bg-neutral-900 group-active:scale-[0.98] transition-transform duration-200">
          {/* Map Image */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQ9cSXj9fEUuP2Xjads4hGuIqhQBbO0Hw-J7ckiiB-Jngqtye8URg7vbXWbjNEKAT0wSy-HhtpbmdYKR2Ehq4LEpx401-32u5-zwg1Azd4KWRTmDRngkJ-SAZhFa5KvCi02vUWVyiHb-wqs1i_SOXU8yvhiss6HNM8Gzj_3WVS0RsCt1JmhDxtkEYtEuWKmejDeF9aLo9MkK3wO8al4HZ8P9dJJc6Fdw8POtv9HHKZy7hRiwC8nUR17Yf6Rxy6zw59zpb-EVrnB_jz')" }}></div>
          <div className="absolute inset-0 p-4">
            {/* SVG Path */}
            <svg className="w-full h-full" viewBox="0 0 200 100">
              <path className="animate-[dash_20s_linear_infinite]" d="M20,80 Q60,80 80,50 T140,20" fill="none" stroke="#00f5ff" strokeDasharray="4,4" strokeWidth="2"></path>
              <circle cx="20" cy="80" fill="#a855f7" r="3"></circle>
              <circle className="animate-pulse" cx="140" cy="20" fill="#00f5ff" r="4"></circle>
            </svg>
            <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10">
              <div className="w-2 h-2 rounded-full bg-[#a855f7]"></div>
              <span className="text-[9px] uppercase font-bold text-white/80">You</span>
            </div>
            <div className="absolute top-4 right-10 flex items-center gap-2 bg-black/60 backdrop-blur px-2 py-1 rounded border border-[#00f5ff]/30">
              <div className="w-2 h-2 rounded-full bg-[#00f5ff]"></div>
              <span className="text-[9px] uppercase font-bold text-[#00f5ff]">Section 124</span>
            </div>
          </div>
        </div>
        <div className="p-3 bg-white/[0.02] flex items-center justify-between">
          <span className="text-[10px] text-white/50 italic">Est. travel time: 4 mins</span>
          <button className="bg-[#00f5ff]/10 hover:bg-[#00f5ff]/20 text-[#00f5ff] text-[10px] px-3 py-1 rounded border border-[#00f5ff]/30 transition-all uppercase font-bold">Recalculate</button>
        </div>
      </div>

      {/* Live Crowd Density Widget */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl p-4 flex flex-col justify-between cursor-pointer active:scale-[0.98] transition-transform duration-200" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#a855f7] text-lg">group</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/60" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Crowd Density</span>
            </div>
            <div className="text-xl font-bold text-white mb-1">Moderate</div>
            <p className="text-[10px] text-white/40 leading-tight">South Gate congestion is nominal.</p>
          </div>
          <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00f5ff] to-[#a855f7] w-2/3"></div>
          </div>
        </div>
        <div className="rounded-xl p-4 flex flex-col justify-between cursor-pointer active:scale-[0.98] transition-transform duration-200" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#00f5ff] text-lg">fastfood</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/60" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Concessions</span>
            </div>
            <div className="text-xl font-bold text-white mb-1">Low Wait</div>
            <p className="text-[10px] text-white/40 leading-tight">Zone B stands have &lt; 2 min queue.</p>
          </div>
          <div className="mt-4 flex gap-1">
            <div className="w-full h-1 bg-[#00f5ff] rounded-full"></div>
            <div className="w-full h-1 bg-white/10 rounded-full"></div>
            <div className="w-full h-1 bg-white/10 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Order Quick Action */}
      <div className="rounded-xl p-4 flex items-center justify-between border border-white/5 group active:bg-white/10 transition-colors cursor-pointer" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#a855f7]/20 flex items-center justify-center text-[#a855f7] border border-[#a855f7]/20">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
          </div>
          <div>
            <h4 className="font-bold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>In-Seat Delivery</h4>
            <p className="text-[10px] text-white/40 uppercase tracking-wide">Ready in Section 124</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-white/20 group-hover:text-[#00f5ff] transition-colors">chevron_right</span>
      </div>

      {/* Weather/Stadium Condition */}
      <div className="flex items-center gap-4 px-2 pb-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-white/40 text-sm">thermostat</span>
          <span className="text-[11px] text-white/60 font-medium">18°C</span>
        </div>
        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
          <span className="material-symbols-outlined text-white/40 text-sm">wifi</span>
          <span className="text-[11px] text-white/60 font-medium">Ultra-HD Connected</span>
        </div>
      </div>
    </main>
  );
}
