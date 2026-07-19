import React from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function FanLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={['fan']}>
      <div className="bg-[#050505] min-h-screen pb-24 text-white font-sans selection:bg-cyan-500/30">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-6 h-16 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#00f5ff]/50">
              <img 
                className="w-full h-full object-cover" 
                alt="Fan Profile" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOqUV5RmC_jobrpGd5bIM75oyt26pVvGsaR0Dj1H3PlYxWE4EjHN5EB2ml0IePu_I5lqRlpFbPhD6ohbQfYI7QkvReumol_9cr8DFMww3gbaK6drm9PuMUcc29Kho_IdA5qtkcOjW3YnR5rPDR9WuE2GsLT6MWCnlnkAnUxzkTUSWqYhqX4DqGeo0r5DJaSXXotEmJXX3Fc7_Xb00bKuMPhWfaocFyZ4LXXuBE6r7qnOOHzfGX96FrHX6ZsbjsPoVU7AgaVsS61u9Y" 
              />
            </div>
          </div>
          <h1 className="font-black text-xl text-[#00f5ff] drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] uppercase tracking-widest text-[14px]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            STADIUM COPILOT
          </h1>
          <button className="text-white/60 hover:text-[#00f5ff] transition-colors active:scale-95 duration-100">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </header>
        
        {/* Main Content Area */}
        {children}
        
        {/* BottomNavBar */}
        <nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-black/90 backdrop-blur-xl border-t border-white/10 flex justify-around items-center h-20 pb-4 shadow-[0_-4px_24px_rgba(168,85,247,0.2)]">
          <Link href="/fan/dashboard" className="flex flex-col items-center justify-center text-[#00f5ff] drop-shadow-[0_0_5px_rgba(34,211,238,0.5)] transition-all active:translate-y-1 duration-200">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span className="text-[10px] uppercase tracking-tighter mt-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Home</span>
          </Link>
          <Link href="/fan/planner" className="flex flex-col items-center justify-center text-white/40 hover:text-[#a855f7] transition-all active:translate-y-1 duration-200">
            <span className="material-symbols-outlined">event_note</span>
            <span className="text-[10px] uppercase tracking-tighter mt-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Planner</span>
          </Link>
          <Link href="/fan/navigate" className="flex flex-col items-center justify-center text-white/40 hover:text-[#a855f7] transition-all active:translate-y-1 duration-200">
            <span className="material-symbols-outlined">explore</span>
            <span className="text-[10px] uppercase tracking-tighter mt-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Live Map</span>
          </Link>
          <Link href="/fan/concessions" className="flex flex-col items-center justify-center text-white/40 hover:text-[#a855f7] transition-all active:translate-y-1 duration-200">
            <span className="material-symbols-outlined">fastfood</span>
            <span className="text-[10px] uppercase tracking-tighter mt-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Orders</span>
          </Link>
        </nav>
      </div>
    </ProtectedRoute>
  );
}
