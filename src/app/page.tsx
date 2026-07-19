'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="bg-black text-white selection:bg-cyan-500/30 font-sans min-h-screen overflow-x-hidden relative">
      {/* Dynamic Stadium Background */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/80 via-black/60 to-[#050505] pointer-events-none"></div>
      
      {/* Content Wrapper */}
      <div className="relative z-10">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 shadow-2xl flex items-center justify-between px-6 py-4 max-w-full">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-cyan-400 text-2xl">stadium</span>
          <span className="text-2xl font-black tracking-tighter text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Stadium Copilot AI
          </span>
        </div>
        <Link href="/login">
          <button className="text-cyan-400 border border-cyan-400/30 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-white/5 transition-all duration-300 active:scale-95" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Sign In
          </button>
        </Link>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[795px] flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              FIFA World Cup 2026 Edition
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter text-cyan-400" style={{ fontFamily: '"Space Grotesk", sans-serif', textShadow: '0 0 10px rgba(34, 211, 238, 0.8), 0 0 20px rgba(34, 211, 238, 0.4)' }}>
              Stadium Copilot AI
            </h1>
            <p className="max-w-md mx-auto text-white/70 text-lg leading-relaxed">
              The next generation of stadium intelligence. Managing the world&apos;s biggest stage with real-time AI precision and seamless operational flow.
            </p>
            <div className="flex flex-col gap-4 pt-8 max-w-sm mx-auto">
              <Link href="/login" className="w-full">
                <button className="w-full py-4 bg-cyan-500 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:scale-[1.02] transition-transform" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  Launch Dashboard
                </button>
              </Link>
              <Link href="#features" className="w-full">
                <button className="w-full py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  View Live Stats
                </button>
              </Link>
            </div>
          </div>
          {/* Animated Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <span className="material-symbols-outlined text-white/30 text-3xl">expand_more</span>
          </div>
        </section>

        {/* Feature Section */}
        <section id="features" className="px-6 py-20 space-y-8 max-w-5xl mx-auto">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Smart Infrastructure</h2>
            <div className="w-12 h-1 bg-cyan-500 rounded-full mx-auto md:mx-0"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Smart Navigation */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors" onMouseMove={handleMouseMove}>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-7xl text-cyan-400">near_me</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-cyan-400">directions_walk</span>
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Smart Navigation</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                AI-driven wayfinding that adapts to crowd flow and gate availability. Guided routes for 80,000+ fans in real-time.
              </p>
              <div className="h-48 w-full rounded-xl overflow-hidden relative">
                <img className="w-full h-full object-cover" alt="Navigation mapping" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeTWuMEamc-fr4Wf8I1KrChO2MeIjcJ9aoIQPP3nc4TIL0XH6feaPhvclB9zbhBsbV8LTYJ893h0BiROyJ9ccX6le4EGqhLWFuOp0l9NMXSF3q1LdkKH3Fs91c0pnIhyAJHg1snNAYBL22hjZA6_JIyi9i8aTnEvsqnHcEOv8p5P_ThKCxV3psvGl37lF_6Kzr7-n8Lw9dammqsSsjIDbs8QI8_Dx2HyW6S4irZOSckY2A2ZQTwOhoq5vCSKBkRmcJTeHkTpK_IrDi" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-xs font-mono text-cyan-400">LIVE WAYFINDING SYSTEM v4.2</div>
              </div>
            </div>

            {/* Crowd Intelligence */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors" onMouseMove={handleMouseMove}>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-7xl text-cyan-400">groups</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-cyan-400">query_stats</span>
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Crowd Intelligence</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Real-time density mapping and predictive analytics to prevent congestion before it happens.
              </p>
              <div className="h-48 w-full rounded-xl overflow-hidden relative">
                <img className="w-full h-full object-cover" alt="Crowd heatmap" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUbw9ltvxPNsWSj0420djmbmJTmwzunxYZCGYUQeF-jWKP5X76c-oZoWts3gk1ZJnse-UPYVcn1gPd5qzkJjqn2wAtwRB1e3pE5Av3sJxw6xUGl3xx_YQDR18IVZyACBMviYdYXjR6JQCZ3aNSQs4a2PtCdtmvqbqjp2QTmZIMvuFk7DhkDXfWcFvHnbw5MLG3tU94VYQSA0VbbOesQ8GDOHq-lVZkAJ3GUFQn9i3CaMUx2I4f37kTKUUJMvYmp-66FpEwKqG2ewiZ" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-xs font-mono text-cyan-400">ACTIVE HEATMAP: SECTION A1-F4</div>
              </div>
            </div>

            {/* Volunteer Dispatch */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors" onMouseMove={handleMouseMove}>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-7xl text-cyan-400">bolt</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-cyan-400">notification_important</span>
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Volunteer Dispatch</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Dynamic staffing alerts that automatically deploy personnel to areas requiring immediate assistance or support.
              </p>
              <div className="h-48 w-full rounded-xl overflow-hidden relative">
                <img className="w-full h-full object-cover" alt="Dispatch system" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgQH6_zhkszjK65MLlUZBmj2F-RSV5iqQxiQgaZ6OTfXqG7WJsGw983r-6FK1iWSidt9cZU0h9PyfAc54tT0N0GFpX0L3UxdS4w7uER701jopeSoSXb2Gyz7CgJiGLv-jiaXKCJsg3Vhrt1m3CajTRBAj24nj5zyhFT4cGTwIEehYw4Cq6nxf5WIZ0jtQqSOMeAALaweOgSl21ddLhzJT0wRr_TA3zBDUizi3oOqFy6GGSa7BcYszQnMgCWG-wprkodOjQrZj52ZY3" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-xs font-mono text-cyan-400">RESPONSE UNIT STATUS: READY</div>
              </div>
            </div>
          </div>
        </section>

        {/* Role-based Entry Points */}
        <section className="px-6 py-20 bg-gradient-to-b from-transparent to-cyan-900/10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Access Portal</h2>
              <p className="text-white/50 text-sm">Select your role to enter the command center</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/login" className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center group cursor-pointer hover:border-cyan-500/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <span className="material-symbols-outlined text-cyan-400 text-3xl">person</span>
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Fan</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Spectator App</span>
              </Link>
              <Link href="/login" className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center group cursor-pointer hover:border-cyan-500/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <span className="material-symbols-outlined text-cyan-400 text-3xl">volunteer_activism</span>
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Volunteer</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Staff Access</span>
              </Link>
              <Link href="/login" className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center group cursor-pointer hover:border-cyan-500/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <span className="material-symbols-outlined text-cyan-400 text-3xl">admin_panel_settings</span>
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Organizer</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Management</span>
              </Link>
              <Link href="/login" className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center group cursor-pointer hover:border-cyan-500/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <span className="material-symbols-outlined text-cyan-400 text-3xl">engineering</span>
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Venue Staff</span>
                <span className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Ops Console</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Counter Section */}
        <section className="px-6 py-20 max-w-5xl mx-auto">
          <div className="bg-cyan-900/10 backdrop-blur-md rounded-3xl p-8 flex flex-col gap-8 items-center text-center border border-cyan-500/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
              <div className="space-y-1">
                <div className="text-3xl md:text-5xl font-black text-cyan-400" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>1.2M+</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/40">Expected Fans</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-5xl font-black text-cyan-400" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>16</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/40">Host Stadiums</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-5xl font-black text-cyan-400" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>0.5s</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/40">AI Latency</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-5xl font-black text-cyan-400" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>100%</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/40">Uptime Rate</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-white text-lg" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Stadium Copilot AI</span>
            <span className="text-sm text-white/50 text-center md:text-left">© 2026 Stadium Copilot AI. FIFA World Cup Edition.</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-white/50 hover:text-cyan-300 transition-colors text-sm cursor-pointer">Privacy Policy</Link>
            <Link href="#" className="text-white/50 hover:text-cyan-300 transition-colors text-sm cursor-pointer">Terms of Service</Link>
            <Link href="#" className="text-white/50 hover:text-cyan-300 transition-colors text-sm cursor-pointer">Contact Support</Link>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
