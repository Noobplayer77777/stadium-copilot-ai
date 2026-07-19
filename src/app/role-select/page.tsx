'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function RoleSelectPage() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const grid = document.querySelector('.animated-grid') as HTMLElement;
      if (grid) {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 40;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 40;
        grid.style.transform = `perspective(500px) rotateX(60deg) translate(${moveX}px, ${moveY}px)`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-black text-white font-sans min-h-screen overflow-x-hidden selection:bg-cyan-500/30">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(34, 211, 238, 0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      <div 
        className="animated-grid pointer-events-none absolute bottom-[-20%] left-[-50%] right-[-50%] h-full z-0" 
        style={{ 
          background: 'linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px)', 
          backgroundSize: '60px 60px', 
          transform: 'perspective(500px) rotateX(60deg)', 
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
        }}
      ></div>
      
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between px-6 py-4 w-full">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-cyan-400/50 flex items-center justify-center bg-cyan-400/10 overflow-hidden">
              <span className="material-symbols-outlined text-cyan-400 text-xl">hub</span>
            </div>
            <div className="font-bold text-2xl text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              STADIUM COPILOT AI
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link className="text-white/60 text-xs uppercase tracking-widest hover:text-cyan-300 hover:bg-white/5 px-3 py-2 rounded transition-all" href="#" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Status</Link>
            <Link className="text-white/60 text-xs uppercase tracking-widest hover:text-cyan-300 hover:bg-white/5 px-3 py-2 rounded transition-all" href="#" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>System</Link>
            <Link className="text-cyan-400 border-b-2 border-cyan-400 text-xs uppercase tracking-widest px-3 py-2 transition-all" href="#" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Roles</Link>
            <Link className="text-white/60 text-xs uppercase tracking-widest hover:text-cyan-300 hover:bg-white/5 px-3 py-2 rounded transition-all" href="#" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Logs</Link>
          </nav>
          <button className="text-cyan-400 cursor-pointer active:scale-95 duration-200">
            <span className="material-symbols-outlined text-2xl">settings</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="relative z-10 min-h-screen pt-32 pb-32 px-6 flex flex-col items-center max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-cyan-400" style={{ fontFamily: '"Space Grotesk", sans-serif', textShadow: '0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(34, 211, 238, 0.4)' }}>
            SELECT YOUR ROLE
          </h1>
          <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto uppercase tracking-[0.2em]">
            Initialize protocol for role-specific stadium operations
          </p>
        </div>
        
        {/* Role Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Card 1: Fan */}
          <Link href="/fan/dashboard" className="group relative p-10 rounded-2xl border border-white/10 flex flex-col items-start space-y-6 cursor-pointer active:scale-95 transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/[0.06]" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)' }}>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/40 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 group-hover:scale-110 transition-all duration-500">
              <span className="material-symbols-outlined text-4xl">person</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Fan</h3>
              <p className="text-white/60 text-lg leading-relaxed">Access live stats, maps, and in-seat delivery.</p>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-cyan-400/50 w-0 group-hover:w-1/3 transition-all duration-700"></div>
            </div>
          </Link>
          
          {/* Card 2: Volunteer */}
          <Link href="/volunteer/dashboard" className="group relative p-10 rounded-2xl border border-white/10 flex flex-col items-start space-y-6 cursor-pointer active:scale-95 transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/[0.06]" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)' }}>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/40 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 group-hover:scale-110 transition-all duration-500">
              <span className="material-symbols-outlined text-4xl">volunteer_activism</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Volunteer</h3>
              <p className="text-white/60 text-lg leading-relaxed">Manage crowd flow and assist spectators.</p>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-cyan-400/50 w-0 group-hover:w-1/3 transition-all duration-700"></div>
            </div>
          </Link>
          
          {/* Card 3: Organizer */}
          <Link href="/organizer/dashboard" className="group relative p-10 rounded-2xl border border-white/10 flex flex-col items-start space-y-6 cursor-pointer active:scale-95 transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/[0.06]" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)' }}>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/40 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 group-hover:scale-110 transition-all duration-500">
              <span className="material-symbols-outlined text-4xl">admin_panel_settings</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Organizer</h3>
              <p className="text-white/60 text-lg leading-relaxed">High-level event management and oversight.</p>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-cyan-400/50 w-0 group-hover:w-1/3 transition-all duration-700"></div>
            </div>
          </Link>
          
          {/* Card 4: Venue Staff */}
          <Link href="/staff/dashboard" className="group relative p-10 rounded-2xl border border-white/10 flex flex-col items-start space-y-6 cursor-pointer active:scale-95 transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/[0.06]" style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)' }}>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/40 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 group-hover:scale-110 transition-all duration-500">
              <span className="material-symbols-outlined text-4xl">engineering</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Venue Staff</h3>
              <p className="text-white/60 text-lg leading-relaxed">Operational controls and facility maintenance.</p>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-cyan-400/50 w-0 group-hover:w-1/3 transition-all duration-700"></div>
            </div>
          </Link>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 pb-2 bg-black/90 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] z-50 md:hidden rounded-t-xl">
        <Link className="flex flex-col items-center justify-center text-white/40 text-xs uppercase tracking-widest hover:text-purple-400 transition-colors active:scale-90 duration-300 ease-out" href="#" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          <span className="material-symbols-outlined text-2xl mb-1">analytics</span>
          <span>Status</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-white/40 text-xs uppercase tracking-widest hover:text-purple-400 transition-colors active:scale-90 duration-300 ease-out" href="#" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          <span className="material-symbols-outlined text-2xl mb-1">memory</span>
          <span>System</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] text-xs uppercase tracking-widest hover:text-purple-400 transition-colors active:scale-90 duration-300 ease-out" href="#" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          <span className="material-symbols-outlined text-2xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>group_work</span>
          <span>Roles</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-white/40 text-xs uppercase tracking-widest hover:text-purple-400 transition-colors active:scale-90 duration-300 ease-out" href="#" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          <span className="material-symbols-outlined text-2xl mb-1">terminal</span>
          <span>Logs</span>
        </Link>
      </nav>

      {/* Footer */}
      <footer className="w-full bg-black border-t border-white/5 py-8 text-center text-white/20 text-xs tracking-[0.3em]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-8 h-px bg-white/10"></div>
          <span className="text-cyan-400 font-bold">STADIUM COPILOT AI</span>
          <div className="w-8 h-px bg-white/10"></div>
        </div>
        © 2026 NEURAL INFRASTRUCTURE CORE • ALL SYSTEMS OPERATIONAL
      </footer>
    </div>
  );
}
