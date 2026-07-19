'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' UTC';
      setTimeStr(timeString);
    };
    const timer = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(timer);
  }, []);

  return (
    <ProtectedRoute allowedRoles={['organizer','admin']}>
      <div className="bg-black text-white antialiased min-h-screen">
        {/* Navigation Drawer (Side Nav) - Desktop */}
        <aside className="fixed inset-y-0 left-0 z-[60] flex-col bg-black/95 border-r border-white/10 h-full w-80 hidden md:flex shadow-2xl">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00f5ff]">
              <img 
                className="w-full h-full object-cover" 
                alt="Commander Profile" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpe3LdEhcJvVfQJstYVEW5hju-_YjpB27sBqNc8_fks5BagzD32QOWovPR9eC33R_1LggYfis9C2tkStD3nDZQzQqIZ_bC_s2kG3PHP7AHZKdZpW31FQFc3_Ocyg_HuF3WXzvwXkhnUXWj2wXd-Zi_CHa5QJnXirGyUanRbLieJd41_unZYvqx_PoURUTkVYdTrEKXPDiZ7BZTFAfhUxrLQKYMOEguAMw0EtQaP1IAB_i5H8PwYH-ssCZnEZHnmUMciVacKJwrLUqc" 
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg uppercase tracking-tight" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>UNIT-01</h3>
              <p className="text-white/60 text-xs font-sans">Sector 7 Admin</p>
              <span className="text-[10px] text-[#00f5ff] font-bold tracking-widest uppercase">ACTIVE SESSION</span>
            </div>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
            <Link href="/organizer/dashboard"><a className="flex items-center gap-4 px-4 py-3 text-[#00f5ff] font-bold bg-white/5 border-l-4 border-[#00f5ff] transition-all duration-300 ease-in-out cursor-pointer"><span className="material-symbols-outlined">memory</span><span className="font-sans text-sm">System Health</span></a></Link>
            <Link href="/organizer/weather"><a className="flex items-center gap-4 px-4 py-3 text-white/60 hover:bg-[#00f5ff]/5 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"><span className="material-symbols-outlined">cloudy_snowing</span><span className="font-sans text-sm">Weather Radar</span></a></Link>
            <Link href="/organizer/analytics"><a className="flex items-center gap-4 px-4 py-3 text-white/60 hover:bg-[#00f5ff]/5 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"><span className="material-symbols-outlined">analytics</span><span className="font-sans text-sm">Gate Analytics</span></a></Link>
            <Link href="/organizer/security"><a className="flex items-center gap-4 px-4 py-3 text-white/60 hover:bg-[#00f5ff]/5 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"><span className="material-symbols-outlined">videocam</span><span className="font-sans text-sm">Security Feeds</span></a></Link>
            <Link href="/organizer/settings"><a className="flex items-center gap-4 px-4 py-3 text-white/60 hover:bg-[#00f5ff]/5 hover:text-white transition-all duration-300 ease-in-out mt-10 cursor-pointer"><span className="material-symbols-outlined">settings</span><span className="font-sans text-sm">Settings</span></a></Link>
          </nav>
        </aside>

        {/* Top App Bar */}
        <header className="flex justify-between items-center px-6 py-4 w-full fixed top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] md:pl-80">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00f5ff]">sensors</span>
            <h1 className="text-xl font-black text-[#00f5ff] drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] uppercase tracking-tighter" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>STADIUM COPILOT</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right mr-2">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Local Time</p>
              <p className="text-xs font-mono text-[#00f5ff]">{timeStr}</p>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden cursor-pointer active:scale-95 duration-100">
              <img 
                className="w-full h-full object-cover" 
                alt="Avatar" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuARCZt66z8IkOi4nR7NaEQ3pVb2sygrwFVbLUtXU_khHuOLY9kqadKnODArDCZn6WseRiOS0Ca1I4HGfLBTOu98YRdnnguNJKtDa1zpAwFPkj7u5cwKSOwUtLckRSPOcFmwB-jCVnZ0J8yIlXlYbZshZLGI9pdCYOxy2984pOX2nI1Y4LKGBb2Ozmb3G2E6LkUCeSOmFF5NOwpfPqJm9sZd_0X9-3FFsHDn6ymDDhLUS3h0ZS0WcHEtR2bZniwg-ZKIisFAAH3F2Zr7" 
              />
            </div>
            <Link href="/logout" className="text-xs text-white/60 hover:text-white transition-colors">
              Logout
            </Link>
          </div>
        </header>

        {/* Main Content Canvas */}
        <div className="pt-20 pb-28 md:pl-80 px-4">
          {children}
        </div>

        {/* Bottom Navigation Bar (Mobile) */}
        <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-black/90 backdrop-blur-xl border-t border-[#00f5ff]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] md:hidden rounded-t-xl">
          <Link href="/organizer/dashboard" className="flex flex-col items-center justify-center text-[#00f5ff] bg-[#00f5ff]/10 rounded-xl p-2 shadow-[inset_0_0_10px_rgba(34,211,238,0.2)] active:translate-y-1 duration-200 transition-all">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[10px] uppercase tracking-widest mt-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Operations</span>
          </Link>
          <Link href="/organizer/incidents/live" className="flex flex-col items-center justify-center text-white/40 p-2 hover:text-[#a855f7] active:translate-y-1 duration-200 transition-all">
            <span className="material-symbols-outlined">warning</span>
            <span className="text-[10px] uppercase tracking-widest mt-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Incidents</span>
          </Link>
          <Link href="/organizer/crowd" className="flex flex-col items-center justify-center text-white/40 p-2 hover:text-[#a855f7] active:translate-y-1 duration-200 transition-all">
            <span className="material-symbols-outlined">groups</span>
            <span className="text-[10px] uppercase tracking-widest mt-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Crowd</span>
          </Link>
          <Link href="/organizer/dispatch" className="flex flex-col items-center justify-center text-white/40 p-2 hover:text-[#a855f7] active:translate-y-1 duration-200 transition-all">
            <span className="material-symbols-outlined">hail</span>
            <span className="text-[10px] uppercase tracking-widest mt-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Dispatch</span>
          </Link>
        </nav>
      </div>
    </ProtectedRoute>
  );
}
