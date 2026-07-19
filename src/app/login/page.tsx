'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { loginWithEmail } from '@/lib/firebase/auth';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Firebase login (or mock fallback)
      await loginWithEmail(email, password);
      // AuthProvider listens to onAuthStateChanged and will route automatically
    } catch (err: unknown) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#050505] text-white font-sans min-h-screen flex flex-col relative overflow-hidden antialiased selection:bg-cyan-500/30">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23ffffff' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E\")" }}></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ffff]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="rounded-2xl w-full max-w-md p-8 sm:p-10 relative overflow-hidden" style={{ background: 'rgba(15, 17, 21, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)' }}>
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#00ffff]/30 rounded-tr-2xl"></div>
          
          {/* Header / Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 mb-6">
              <img alt="Stadium Copilot Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeE69wdpmdbJ-QFSohk4HGtV4S2UCLNuGwEhN6PgoVdT32ikMaTpSZU0cEwj2SfN1LXQtCgx3U3ROQTBLsvJ3ktrEppyoE1TlB_5cpVIh9d4z8nG81Cuh22xx6fg22WmtrthIqBr5VLuv0dxiPgIblUW67p8_dAo4QuPUsV7OFZuxCQeSjvG0zwrwMb2Kd6nsAoT1S6dzwBSfL3ZqsgPo_ZA3iYAhZZmuDsQxkINN2cDg9pF05SDaLZehZpHJdx7kGw9VwKxp9U0jH"/>
            </div>
            <h1 className="font-bold text-2xl tracking-tight text-white mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Welcome Back</h1>
            <p className="text-white/50 text-sm uppercase tracking-widest text-center" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Secure Access Protocol</p>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="bg-red-950 border-red-500/50 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/70 ml-1" htmlFor="email" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Operator ID / Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                  <span className="material-symbols-outlined text-lg">person</span>
                </div>
                <input 
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00ffff]/50 transition-all duration-300 text-sm focus:shadow-[0_0_0_2px_rgba(0,255,255,0.2),0_0_15px_rgba(0,255,255,0.1)]" 
                  id="email" 
                  placeholder="Enter identification..." 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs uppercase tracking-widest text-white/70" htmlFor="password" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>Security Key</label>
                <Link className="text-[#00ffff] text-xs font-medium hover:text-white transition-colors duration-200" href="#">Forgot key?</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </div>
                <input 
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-[#00ffff]/50 transition-all duration-300 text-sm focus:shadow-[0_0_0_2px_rgba(0,255,255,0.2),0_0_15px_rgba(0,255,255,0.1)]" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Action */}
            <button 
              className="w-full bg-[#00ffff] text-black font-bold py-3.5 px-4 rounded-lg flex justify-center items-center gap-2 mt-8 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] hover:-translate-y-px shadow-[0_0_15px_rgba(0,255,255,0.3)] disabled:opacity-50 disabled:pointer-events-none" 
              type="submit"
              disabled={isLoading}
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              <span>{isLoading ? 'Authenticating...' : 'Initialize Session'}</span>
              {!isLoading && <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>}
            </button>
          </form>
          
          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-white/50">
              Unregistered node? <Link className="text-[#00ffff] hover:text-white transition-colors font-medium ml-1" href="/register">Request access</Link>
            </p>
          </div>
          
          {/* Decorative structural lines */}
          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#00ffff]/20 to-transparent"></div>
        </div>
      </main>
      
      {/* Decorative Corner UI Elements mimicking a HUD */}
      <div className="fixed top-4 left-4 flex gap-1 pointer-events-none opacity-30 z-0">
        <div className="w-2 h-2 bg-[#00ffff]"></div>
        <div className="w-2 h-2 border border-[#00ffff]"></div>
      </div>
      <div className="fixed bottom-4 right-4 text-[10px] font-mono text-[#00ffff]/30 tracking-widest pointer-events-none z-0">
        SYS.VER.2.4.1_BETA
      </div>
    </div>
  );
}
