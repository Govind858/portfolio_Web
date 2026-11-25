import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileText, ArrowUpRight, Terminal, Server, ShieldCheck, MapPin } from 'lucide-react';
import { HeroTerminal } from './HeroTerminal';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { SOCIAL_LINKS } from '../data/social';

interface HeroProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onOpenResume }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToWorks = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStack = () => {
    const el = document.getElementById('tech-stack');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Background Ambient Monochromatic Light Flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full bg-gradient-to-b from-white/[0.04] via-zinc-800/[0.02] to-transparent blur-[120px] pointer-events-none" />

      {/* Top HUD: Status Bar & Coordinates */}
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-400">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-white/10"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-200 font-medium">OPEN TO NEW ROLES & COMMISSIONS</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400">MERN / NODE.JS</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden sm:flex items-center gap-3 text-zinc-500"
        >
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span>KERALA, INDIA</span>
          </span>
          <span>•</span>
          <span className="text-zinc-300 font-mono tracking-wider">{time || '14:30:00'} IST</span>
        </motion.div>
      </div>

      {/* Main Hero Visual Core */}
      <div className="w-full max-w-5xl mx-auto my-auto flex flex-col items-center text-center relative z-10 py-4 sm:py-6">
        
        {/* Kinetic Subtitle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs sm:text-sm font-mono tracking-widest text-zinc-300 uppercase"
        >
          <Terminal className="w-3.5 h-3.5 text-zinc-400" />
          <span>GOVIND JAYAKUMAR · NODE.JS DEVELOPER</span>
        </motion.div>

        {/* Monumental Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-extrabold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase text-white leading-[1.05] max-w-4xl"
        >
          Engineering <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600">Scalable</span> Backend Systems.
        </motion.h1>

        {/* Narrative Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mt-3 sm:mt-4 leading-relaxed"
        >
          Building scalable Node.js architectures, distributed systems, automated Kubernetes container deployments, and cross-platform mobile applications.
        </motion.p>

        {/* Centerpiece: Floating Glass Terminal & Live API Inspector */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <HeroTerminal />
        </motion.div>

        {/* Hero Action CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2 sm:mt-4"
        >
          <button
            onClick={scrollToWorks}
            className="flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs sm:text-sm font-bold tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          >
            <span>INSPECT PROJECTS</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={scrollToStack}
            className="flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-full glass-panel text-zinc-200 font-mono text-xs sm:text-sm tracking-wider hover:text-white hover:border-white/40 active:scale-95 transition-all"
          >
            <Server className="w-4 h-4 text-zinc-400" />
            <span>TECH STACK</span>
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white font-mono text-xs sm:text-sm tracking-wider active:scale-95 transition-all"
          >
            <FileText className="w-4 h-4 text-zinc-400" />
            <span>VIEW RESUME</span>
          </button>

          <button
            onClick={onOpenContact}
            className="hidden sm:flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white font-mono text-xs sm:text-sm tracking-wider active:scale-95 transition-all"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Quick Social Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mt-4 text-xs font-mono text-zinc-400"
        >
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all group"
          >
            <GithubIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
            <span>GitHub / Govind858</span>
          </a>

          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all group"
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
            <span>LinkedIn / Govind Jayakumar</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom Hero HUD Telemetry */}
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>K8S AUTOSCALING: 2-10 REPLICAS</span>
          </span>
          <span>•</span>
          <span>NGINX: 1,024 WORKER CONNS</span>
        </div>

        <div className="flex items-center gap-4">
          <span>REDIS & BULLMQ DECOUPLED QUEUES</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">BLE ESC/POS BUFFER THROTTLING</span>
        </div>
      </div>
    </section>
  );
};
