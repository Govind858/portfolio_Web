import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AlertCircle,
  Briefcase,
  Check,
  CheckCircle2,
  Copy,
  Cpu,
  Layers,
  Server,
  Smartphone,
  Terminal,
  Zap,
} from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { GithubIcon, PlayStoreIcon } from './SocialIcons';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
  onOpenContact: () => void;
}

type SectionId = 'business' | 'architecture' | 'techstack' | 'challenges';

const SECTIONS: { id: SectionId; number: string; label: string; shortLabel: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'business', number: '01', label: 'Business Logic & Flows', shortLabel: '01. Business', icon: Briefcase },
  { id: 'architecture', number: '02', label: 'System Architecture', shortLabel: '02. Architecture', icon: Server },
  { id: 'techstack', number: '03', label: 'Tech Stack & Rationale', shortLabel: '03. Tech Stack', icon: Cpu },
  { id: 'challenges', number: '04', label: 'Production Challenges', shortLabel: '04. Challenges', icon: Zap },
];

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onSelectProject,
  onOpenContact,
}) => {
  const [activeSection, setActiveSection] = useState<SectionId>('business');
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Track active section while scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const id = visible[0].target.id.replace('section-', '') as SectionId;
          setActiveSection(id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.05,
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(`section-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [project.id]);

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (!el) return;

    const lenis = (window as unknown as {
      lenis?: { scrollTo: (target: HTMLElement, options?: { offset?: number }) => void };
    }).lenis;

    if (lenis) {
      lenis.scrollTo(el, { offset: -100 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen"
    >
      {/* Dedicated Standalone Page Sticky Header */}
      <div className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-200 hover:text-white font-mono text-[11px] sm:text-xs transition-all group shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden xs:inline sm:hidden">BACK</span>
              <span className="hidden sm:inline">BACK TO PROJECTS</span>
            </button>

            <span className="px-2 sm:px-2.5 py-1 rounded-full bg-white text-black font-mono text-[10px] sm:text-[11px] font-bold shrink-0">
              PROJ_{project.number}
            </span>

            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300 hidden md:inline shrink-0">
              {project.category}
            </span>

            <span className="font-mono text-xs text-zinc-400 truncate hidden lg:inline">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {project.playstoreUrl && (
              <a
                href={project.playstoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-[11px] sm:text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] group"
                title="Download on Google Play Store"
              >
                <PlayStoreIcon className="w-3.5 h-3.5 fill-current shrink-0" />
                <span className="sm:hidden">PLAY</span>
                <span className="hidden sm:inline">GOOGLE PLAY STORE</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white font-mono text-[11px] sm:text-xs transition-all group"
                title="GitHub Repository"
              >
                <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5 hidden sm:inline group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}

            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-black font-mono text-[11px] sm:text-xs font-bold hover:bg-zinc-200 active:scale-95 transition-all"
            >
              <span>CONTACT</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <article className="pt-6 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Hero Title & Verified Metrics */}
      <header className="pb-8 sm:pb-10 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300 uppercase mb-3 sm:mb-4">
              <span>{project.category}</span>
              <span className="text-zinc-600">•</span>
              <span>{project.year}</span>
            </div>
            <h1 className="font-display font-extrabold text-[clamp(1.5rem,6.4vw,3.75rem)] uppercase tracking-tight text-white leading-[1.06] break-words">
              {project.title}
            </h1>
            <div className="font-mono text-xs sm:text-sm text-zinc-400 mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="text-zinc-500">CLIENT / PRODUCT:</span>
              <span className="text-white font-medium">{project.client}</span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-zinc-300">ROLE: {project.role}</span>
            </div>

            {project.playstoreUrl && (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={project.playstoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500 border border-emerald-500/40 text-emerald-400 hover:text-black font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.18)] group"
                >
                  <PlayStoreIcon className="w-4 h-4 fill-current shrink-0" />
                  <span>
                    {project.id === 'bookmycuts'
                      ? 'GET BOOKMYCUTS ON GOOGLE PLAY'
                      : 'GET ON GOOGLE PLAY'}
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 shrink-0">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="px-3.5 sm:px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-center min-w-0"
              >
                <div className="font-display font-bold text-base sm:text-lg text-white">
                  {metric.value}
                </div>
                <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Clean Visual Showcase Banner (No overlapping mobile text) */}
      <div className="my-8 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 relative aspect-[16/9] sm:aspect-[21/9] bg-zinc-900 group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover filter contrast-105 brightness-95 group-hover:scale-[1.02] transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2">
          <span className={`px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[10px] sm:text-[11px] text-zinc-200 ${project.playstoreUrl ? 'hidden sm:inline-flex' : 'inline-flex'}`}>
            PRODUCTION CASE STUDY // {project.year}
          </span>

          {project.playstoreUrl && (
            <a
              href={project.playstoreUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-black font-mono font-bold text-[11px] inline-flex items-center gap-1.5 hover:bg-emerald-400 transition-colors shadow-lg"
            >
              <PlayStoreIcon className="w-3.5 h-3.5" />
              <span>Verified Google Play Store App</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Executive Summary & Deliverables */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 border-b border-white/10">
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel flex flex-col justify-between min-w-0">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3">
              Executive Overview
            </div>
            <p className="font-body text-zinc-200 text-sm sm:text-base leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-white/10 min-w-0">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">
            Key Engineering Deliverables
          </div>
          <ul className="space-y-3">
            {project.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-body text-zinc-300 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mobile / Tablet Section Jump Bar */}
      <div className="lg:hidden my-8">
        <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2.5">
          Jump to Case Study Section
        </div>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`px-3.5 py-2.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-all border ${
                  isActive
                    ? 'bg-white text-black border-white'
                    : 'bg-white/[0.03] text-zinc-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{sec.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout: Sticky Index Sidebar + Full Scrollable Deep Dive */}
      <div className="pt-6 lg:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Desktop Sticky Navigation Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28 space-y-6">
            <div className="p-5 rounded-3xl glass-panel space-y-2">
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 px-2 pb-2 border-b border-white/10">
                Case Study Index
              </div>
              {SECTIONS.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl font-mono text-xs flex items-center gap-2.5 transition-all ${
                      isActive
                        ? 'bg-white text-black font-bold shadow-md'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{sec.number}. {sec.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-5 rounded-3xl bg-zinc-900/50 border border-white/10 space-y-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  Interested in this build?
                </div>
                <p className="font-body text-xs text-zinc-300 mt-1.5 leading-relaxed">
                  Walk through the architecture, tradeoffs, and production telemetry directly with Govind.
                </p>
              </div>
              <button
                onClick={onOpenContact}
                className="w-full py-2.5 px-4 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-1.5"
              >
                <span>START A CONVERSATION</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Scrollable Content Sections */}
        <div className="lg:col-span-9 min-w-0 space-y-16 sm:space-y-20">
          {/* SECTION 01: BUSINESS LOGIC & PRODUCT FLOWS */}
          <section id="section-business" className="scroll-mt-24 space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block">
                  Section 01
                </span>
                <h2 className="font-display font-bold text-[clamp(1.15rem,4.8vw,1.875rem)] text-white uppercase tracking-tight leading-[1.1]">
                  Business Logic & Product Flows
                </h2>
              </div>
            </div>

            {/* Problem vs Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-red-500/20">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-400 font-bold mb-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>The Commercial Problem</span>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  {project.businessLogic.headline}
                </h3>
                <p className="font-body text-zinc-300 text-sm leading-relaxed">
                  {project.businessLogic.problem}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>The Architectural Solution</span>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">
                  End-to-End Automated Platform
                </h3>
                <p className="font-body text-zinc-300 text-sm leading-relaxed">
                  {project.businessLogic.solution}
                </p>
              </div>
            </div>

            {/* End-User Journey */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-white" />
                <span>Customer / End-User Execution Journey</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.businessLogic.userFlow.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs text-zinc-500 font-bold">
                        STEP_{step.step}
                      </span>
                      <div className="font-display font-bold text-base text-white mt-1">
                        {step.title}
                      </div>
                    </div>
                    <p className="font-body text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Merchant / Operational Back-Office Flow */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-white" />
                <span>Merchant / Operational Back-Office Journey</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {project.businessLogic.partnerFlow.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs text-zinc-500 font-bold">
                        PHASE_{step.step}
                      </span>
                      <div className="font-display font-bold text-base text-white mt-1">
                        {step.title}
                      </div>
                    </div>
                    <p className="font-body text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Settlement Model */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
                Financial Settlement & Reconciliation Model
              </h3>
              <p className="font-body text-zinc-300 text-sm leading-relaxed">
                {project.businessLogic.financialModel}
              </p>
            </div>
          </section>

          {/* SECTION 02: SYSTEM ARCHITECTURE & DEEP DIVE */}
          <section id="section-architecture" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                <Server className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block">
                  Section 02
                </span>
                <h2 className="font-display font-bold text-[clamp(1.15rem,4.8vw,1.875rem)] text-white uppercase tracking-tight leading-[1.1]">
                  System Architecture & Deep Dive
                </h2>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-2">
                Architecture Overview
              </span>
              <p className="font-body text-zinc-200 text-sm sm:text-base leading-relaxed">
                {project.technicalDeepDive.overview}
              </p>
            </div>

            <div className="space-y-5">
              {project.technicalDeepDive.components.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-7 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4 min-w-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-white/10">
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-[clamp(1rem,4.2vw,1.25rem)] text-white uppercase tracking-wide leading-snug">
                        {comp.title}
                      </h3>
                      <div className="font-mono text-xs text-zinc-400 mt-1">
                        {comp.subtitle}
                      </div>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-300 w-fit shrink-0">
                      {comp.spec}
                    </span>
                  </div>

                  <p className="font-body text-zinc-300 text-sm leading-relaxed">
                    {comp.details}
                  </p>

                  {comp.codeSnippet && (
                    <div className="mt-3 rounded-xl bg-black border border-white/10 p-4 font-mono text-xs text-zinc-300 min-w-0">
                      <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-white/10 text-[10px] text-zinc-500">
                        <span>SYSTEM CONFIG / IMPLEMENTATION</span>
                        <button
                          onClick={() => handleCopyCode(comp.codeSnippet!, idx)}
                          className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors shrink-0"
                        >
                          {copiedSnippetIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <pre className="text-xs leading-relaxed text-zinc-300">
                          <code>{comp.codeSnippet}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 03: TECH STACK & RATIONALE */}
          <section id="section-techstack" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block">
                  Section 03
                </span>
                <h2 className="font-display font-bold text-[clamp(1.15rem,4.8vw,1.875rem)] text-white uppercase tracking-tight leading-[1.1]">
                  Tech Stack & Engineering Rationale
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.techStackDetailed.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between min-w-0"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-2.5">
                      <span className="text-zinc-500 uppercase">{item.category}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[10px]">
                        {item.spec}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {item.name}
                    </h3>
                  </div>

                  <p className="font-body text-zinc-400 text-xs sm:text-sm mt-3.5 leading-relaxed border-t border-white/10 pt-3">
                    <span className="text-zinc-500 font-mono uppercase text-[10px] block mb-1">
                      Engineering Rationale:
                    </span>
                    {item.rationale}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 04: PRODUCTION CHALLENGES & FIXES */}
          <section id="section-challenges" className="scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block">
                  Section 04
                </span>
                <h2 className="font-display font-bold text-[clamp(1.15rem,4.8vw,1.875rem)] text-white uppercase tracking-tight leading-[1.1]">
                  Production Challenges & Fixes
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              {project.productionChallenges.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-7 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4"
                >
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold pb-3 border-b border-white/10">
                    <Zap className="w-4 h-4 shrink-0" />
                    <span>Bottleneck 0{idx + 1}: {item.issue}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-body">
                    <div className="flex flex-col">
                      <span className="font-mono uppercase text-[10px] text-zinc-500 block mb-1.5">
                        Root Cause:
                      </span>
                      <p className="text-zinc-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5 flex-1">
                        {item.rootCause}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <span className="font-mono uppercase text-[10px] text-emerald-400 block mb-1.5">
                        Engineering Solution:
                      </span>
                      <p className="text-zinc-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5 flex-1">
                        {item.engineeringSolution}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-start gap-2 text-xs sm:text-sm font-mono text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Outcome: </strong>
                      {item.outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Action Bar & Next / Previous Project Switcher */}
      <div className="mt-16 pt-10 border-t border-white/10 space-y-10">
        <div className="p-6 sm:p-8 rounded-3xl glass-panel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              Architecture & Code Walkthrough
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-1">
              Want to discuss {project.title} in detail?
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.playstoreUrl && (
              <a
                href={project.playstoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-500 text-black font-mono text-xs font-bold hover:bg-emerald-400 active:scale-95 transition-all"
              >
                <PlayStoreIcon className="w-4 h-4 fill-current" />
                <span>GOOGLE PLAY</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs font-bold active:scale-95 transition-all"
              >
                <Terminal className="w-4 h-4" />
                <span>GITHUB REPO</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 active:scale-95 transition-all"
            >
              <span>CONTACT GOVIND</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Prev / Next Case Study Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onSelectProject(prevProject)}
            className="p-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 border border-white/10 hover:border-white/25 text-left transition-all group"
          >
            <div className="font-mono text-[11px] text-zinc-500 flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>PREVIOUS CASE STUDY</span>
            </div>
            <div className="font-display font-bold text-lg sm:text-xl text-white mt-2">
              {prevProject.number} / {prevProject.title}
            </div>
            <div className="font-mono text-xs text-zinc-400 mt-1">
              {prevProject.category}
            </div>
          </button>

          <button
            onClick={() => onSelectProject(nextProject)}
            className="p-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 border border-white/10 hover:border-white/25 text-left sm:text-right transition-all group"
          >
            <div className="font-mono text-[11px] text-zinc-500 flex items-center sm:justify-end gap-1.5">
              <span>NEXT CASE STUDY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-display font-bold text-lg sm:text-xl text-white mt-2">
              {nextProject.number} / {nextProject.title}
            </div>
            <div className="font-mono text-xs text-zinc-400 mt-1">
              {nextProject.category}
            </div>
          </button>
        </div>
      </div>
      </article>
    </motion.div>
  );
};
