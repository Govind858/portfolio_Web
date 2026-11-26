import React from 'react';
import { Box, Compass, Cpu, Layers, Server, Shield, Terminal, Zap, Database, Globe, Smartphone, GitBranch } from 'lucide-react';

export const MarqueeShowcase: React.FC = () => {
  // Uniform Row 1 items (Infrastructure & Backend)
  const marqueeItemsRow1 = [
    {
      title: 'Node.js (v20-Slim)',
      category: 'BACKEND RUNTIME',
      caption: 'Cluster Mode & Streams',
      icon: Terminal,
      status: 'PORT 5000',
    },
    {
      title: 'Kubernetes HPA',
      category: 'CONTAINER DEVOPS',
      caption: 'Autoscaling 2–10 Pods',
      icon: Cpu,
      status: '75% CPU TARGET',
    },
    {
      title: 'Nginx Load Balancer',
      category: 'REVERSE PROXY',
      caption: '1,024 Worker Connections',
      icon: Server,
      status: 'UPSTREAM POOL',
    },
    {
      title: 'Redis & BullMQ',
      category: 'JOB QUEUES',
      caption: 'Decoupled Payout Workers',
      icon: Zap,
      status: '1,420 SETTLED',
    },
    {
      title: 'React Native & Expo',
      category: 'CROSS-PLATFORM',
      caption: 'Expo SDK 54 / Router v5',
      icon: Smartphone,
      status: 'MOBILE POS',
    },
    {
      title: 'BLE ESC/POS Driver',
      category: 'HARDWARE IOT',
      caption: '20-Byte / 50ms Throttling',
      icon: Box,
      status: '0.00% LOSS',
    },
    {
      title: 'Docker Layer Cache',
      category: 'CONTAINERIZATION',
      caption: 'Multi-Stage Optimization',
      icon: Layers,
      status: 'REPRODUCIBLE',
    },
    {
      title: 'Axios JWT Queues',
      category: 'NETWORK SECURITY',
      caption: 'Silent Token Auto-Replay',
      icon: Shield,
      status: '0% DROPPED',
    },
  ];

  // Uniform Row 2 items (Databases, Fintech, Frontend & Architecture)
  const marqueeItemsRow2 = [
    {
      title: 'MongoDB & Mongoose',
      category: 'DOCUMENT STORE',
      caption: 'Atlas SRV DNS Fallback',
      icon: Database,
      status: 'INDEXED',
    },
    {
      title: 'RazorpayX Automated',
      category: 'FINTECH PAYMENTS',
      caption: 'NEFT Payout Verification',
      icon: Zap,
      status: 'WEBHOOK SIGNED',
    },
    {
      title: 'React 19 & Redux',
      category: 'ENTERPRISE FRONTEND',
      caption: 'Centralized Async Thunks',
      icon: Compass,
      status: 'STRICT TS',
    },
    {
      title: 'PostgreSQL Relational',
      category: 'SQL DATABASE',
      caption: 'ACID Constraints & Joins',
      icon: Database,
      status: 'NORMALIZED',
    },
    {
      title: '8-Tier RBAC Matrix',
      category: 'AUTHORIZATION',
      caption: 'Role-Based Route Guards',
      icon: Shield,
      status: '50+ ENDPOINTS',
    },
    {
      title: 'Client Data Validator',
      category: 'PERFORMANCE',
      caption: 'In-Browser CSV/Excel Sanitizer',
      icon: GitBranch,
      status: 'PULL-PRECHECK',
    },
    {
      title: 'TypeScript Strict',
      category: 'CONTRACT TYPING',
      caption: 'Zero Implicit Any Policy',
      icon: Terminal,
      status: 'TYPESAFE',
    },
    {
      title: 'Linux Ubuntu Server',
      category: 'HOST INFRASTRUCTURE',
      caption: 'Systemd & Daemon Hardening',
      icon: Globe,
      status: 'SYSTEM HEALTHY',
    },
  ];

  return (
    <section className="relative py-10 sm:py-16 overflow-hidden border-y border-white/[0.07] bg-zinc-950/70">
      {/* Subtle Side Vignette Gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-10 sm:w-28 md:w-44 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-10 sm:w-28 md:w-44 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      {/* Row 1: Left to Right Marquee with Uniform Slide Cards */}
      <div className="flex overflow-hidden py-1.5 select-none">
        <div className="animate-marquee flex items-center gap-3 sm:gap-4">
          {[...marqueeItemsRow1, ...marqueeItemsRow1].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="w-[250px] sm:w-[300px] md:w-[320px] h-[102px] sm:h-[105px] flex-shrink-0 p-3.5 sm:p-4 rounded-2xl glass-panel border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between cursor-default group"
              >
                {/* Top Row: Category + Status */}
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Icon className="w-3 h-3 text-zinc-300" />
                    <span>{item.category}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-semibold">
                    {item.status}
                  </span>
                </div>

                {/* Middle Row: Uniform Title */}
                <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-tight group-hover:text-zinc-200 transition-colors truncate">
                  {item.title}
                </h3>

                {/* Bottom Row: Micro-Caption */}
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/5 pt-1.5">
                  <span className="truncate">{item.caption}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Right to Left Marquee (Counter Direction) with Uniform Slide Cards */}
      <div className="flex overflow-hidden py-1.5 select-none mt-3">
        <div className="animate-marquee-reverse flex items-center gap-3 sm:gap-4">
          {[...marqueeItemsRow2, ...marqueeItemsRow2].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="w-[250px] sm:w-[300px] md:w-[320px] h-[102px] sm:h-[105px] flex-shrink-0 p-3.5 sm:p-4 rounded-2xl glass-panel border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between cursor-default group"
              >
                {/* Top Row: Category + Status */}
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Icon className="w-3 h-3 text-zinc-300" />
                    <span>{item.category}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-semibold">
                    {item.status}
                  </span>
                </div>

                {/* Middle Row: Uniform Title */}
                <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-tight group-hover:text-zinc-200 transition-colors truncate">
                  {item.title}
                </h3>

                {/* Bottom Row: Micro-Caption */}
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/5 pt-1.5">
                  <span className="truncate">{item.caption}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
