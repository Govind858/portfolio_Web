import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Server, Cpu, Activity, MapPin, Database, Zap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { SOCIAL_LINKS } from '../data/social';

export const BentoAbout: React.FC = () => {
  const [activeConsoleTab, setActiveConsoleTab] = useState<'k8s' | 'nginx' | 'redis'>('k8s');

  const consoleLogs = {
    k8s: [
      '$ kubectl get hpa bookmycuts-deployment',
      'NAME         REFERENCE          TARGETS   MINPODS   MAXPODS   REPLICAS',
      'bookmycuts   Deployment/api     42%/75%   2         10        3',
      'STATUS: Pods healthy. Port 5000 reachable. Auto-scaled on CPU demand.',
    ],
    nginx: [
      '$ cat /etc/nginx/nginx.conf | grep worker_connections',
      'events { worker_connections 1024; }',
      'upstream backend_nodes { server app1:5000; server app2:5000; server app3:5000; }',
      'STATUS: Reverse proxy upstream healthy. Load distribution optimal.',
    ],
    redis: [
      '$ redis-cli ping && bullmq-mon status',
      'PONG (0.24ms)',
      'Queue: [payouts-queue] -> Active: 0, Completed: 1420, Failed: 0',
      'STATUS: Worker aggregated shop earnings and dispatched NEFT via RazorpayX.',
    ],
  };

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2 mb-2">
            <Activity className="w-3.5 h-3.5 text-white" />
            <span>01 / ABOUT & ENGINEERING PHILOSOPHY</span>
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white">
            Architected for Resilience & Scale.
          </h2>
        </div>
        <p className="font-mono text-xs sm:text-sm text-zinc-400 max-w-md">
          Backend and MERN Stack Developer with experience building scalable Node.js architectures, distributed systems, and cross-platform mobile applications.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Narrative Manifesto */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-2 lg:col-span-2 p-6 sm:p-8 rounded-3xl glass-panel relative overflow-hidden flex flex-col justify-between group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl pointer-events-none group-hover:bg-white/[0.06] transition-all" />
          
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-6">
              <span>ENGINEER PROFILE // 2026</span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                MERN & DEVOPS
              </span>
            </div>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase leading-snug tracking-wide mb-4">
              "A reliable system is one that gracefully survives traffic spikes and hardware buffers."
            </h3>

            <p className="font-body text-zinc-300 text-sm sm:text-base leading-relaxed mb-4">
              I specialize in bridging scalable backend microservices with responsive user interfaces. From configuring multi-replica Kubernetes clusters and tuning Nginx for 1,024 worker connections to authoring low-level Bluetooth Low Energy pagination protocols for physical POS thermal printers, I take pride in building rock-solid software.
            </p>
            <p className="font-body text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Whether diagnosing silent JWT race conditions in Axios interceptors or automating shop owner payouts with Redis and BullMQ, I solve complex engineering bottlenecks end-to-end.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>KERALA, INDIA</span>
            </span>
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors"
                title="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Govind858</span>
              </a>
              <span className="text-zinc-600">•</span>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Interactive System Console / Telemetry */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-3xl glass-panel flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>SYSTEM LOGS</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Console Tab Selectors */}
          <div className="flex gap-1.5 p-1 rounded-xl bg-zinc-900 border border-white/10 mb-3 text-[10px] font-mono">
            <button
              onClick={() => setActiveConsoleTab('k8s')}
              className={`flex-1 py-1 rounded-lg transition-all ${
                activeConsoleTab === 'k8s' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              K8S_HPA
            </button>
            <button
              onClick={() => setActiveConsoleTab('nginx')}
              className={`flex-1 py-1 rounded-lg transition-all ${
                activeConsoleTab === 'nginx' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              NGINX
            </button>
            <button
              onClick={() => setActiveConsoleTab('redis')}
              className={`flex-1 py-1 rounded-lg transition-all ${
                activeConsoleTab === 'redis' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              BULLMQ
            </button>
          </div>

          {/* Terminal Output */}
          <div className="p-3 rounded-xl bg-black border border-white/5 font-mono text-[11px] leading-relaxed text-zinc-300 min-h-[140px] flex flex-col justify-between select-text">
            <div className="space-y-1">
              {consoleLogs[activeConsoleTab].map((line, idx) => (
                <div
                  key={idx}
                  className={idx === 0 ? 'text-zinc-400' : idx === consoleLogs[activeConsoleTab].length - 1 ? 'text-emerald-400 text-[10px]' : 'text-zinc-200'}
                >
                  {line}
                </div>
              ))}
            </div>
            <div className="text-[10px] text-zinc-600 flex items-center justify-between pt-2 border-t border-white/5">
              <span>PORT 5000</span>
              <span>UPTIME: 99.98%</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Live Radar & Availability */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded-3xl glass-panel flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-zinc-300" />
              <span>STATUS // AVAILABILITY</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="my-auto py-3">
            <div className="text-2xl font-display font-extrabold text-white">Full-Stack Ready</div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mt-1">
              Backend • Node.js • Mobile
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full w-full" />
            </div>
            <p className="text-[11px] font-mono text-zinc-400 mt-3 leading-relaxed">
              Available immediately for Software Engineer, Backend, and MERN Developer roles (On-site / Hybrid / Remote).
            </p>
          </div>

          <div className="text-[10px] font-mono text-zinc-500 pt-3 border-t border-white/10 flex justify-between">
            <span>RESUME: VERIFIED</span>
            <span>CITIZENSHIP: INDIA</span>
          </div>
        </motion.div>

        {/* Card 4: Four Key Engineering Proof Metrics */}
        <div className="md:col-span-3 lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '1,024', label: 'Nginx Upstream Worker Connections', icon: Server },
            { value: '2–10', label: 'Kubernetes Autoscaling Pod Range', icon: Cpu },
            { value: '20-Byte', label: 'BLE Hardware Hex Packet Slicing', icon: Zap },
            { value: '0.00%', label: 'Dropped Bluetooth Print Receipts', icon: ShieldCheck },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl glass-panel flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-zinc-500 mb-2">
                  <span className="font-mono text-[10px] uppercase">METRIC_0{idx + 1}</span>
                  <Icon className="w-4 h-4 text-zinc-400" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[11px] text-zinc-400 mt-1 leading-snug">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Card 5: Core Engineering Disciplines */}
        <div className="md:col-span-3 lg:col-span-4 p-6 sm:p-8 rounded-3xl glass-panel">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-white" />
              <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white">
                Core Engineering Competencies
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              PROVEN ACROSS BACKEND, MOBILE & DEVOPS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-zinc-300">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="font-bold text-white mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>Backend & API Design</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Node.js REST APIs, Express middleware, MongoDB & PostgreSQL schemas, BullMQ task workers, and Razorpay payment webhooks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="font-bold text-white mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>Containerization & K8s</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Multi-stage Docker caching, Kubernetes HPA autoscaling (75% CPU threshold), resource limits, and Nginx reverse proxies.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="font-bold text-white mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>Mobile & Systems UI</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                React Native (Expo SDK 54), BLE thermal printer pagination, silent Axios JWT refresh queues, and React 19 enterprise state.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
