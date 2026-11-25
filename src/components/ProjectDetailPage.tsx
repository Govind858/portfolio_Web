import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Server,
  Cpu,
  Zap,
  Briefcase,
  Layers,
  Smartphone,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { projects } from '../data/projects';
import { PlayStoreIcon, GithubIcon } from './SocialIcons';
import { SOCIAL_LINKS } from '../data/social';

interface ProjectDetailPageProps {
  projectId: string;
  onBack: () => void;
  onOpenContact: () => void;
  onOpenResume: () => void;
  onSelectProject: (projectId: string) => void;
}

type TabType = 'business' | 'architecture' | 'techstack' | 'challenges';

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onBack,
  onOpenContact,
  onOpenResume,
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('business');
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

  const projectIndex = projects.findIndex((p) => p.id === projectId);
  const project = projectIndex !== -1 ? projects[projectIndex] : projects[0];

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  // Scroll to top immediately whenever the project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, opts?: { immediate: boolean }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [projectId]);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] relative selection:bg-white selection:text-black">
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none -z-0" />

      {/* TOP FLOATING NAVIGATOR BAR */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-auto flex items-center justify-between gap-3 w-full max-w-5xl px-3 sm:px-5 py-2.5 rounded-full bg-zinc-950/85 border border-white/15 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
        >
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>PORTFOLIO</span>
          </button>

          {/* Project Indicator (Desktop) */}
          <div className="hidden md:flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold">{project.title}</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-500">{project.category}</span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            {project.playstoreUrl && (
              <a
                href={project.playstoreUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] group"
                title="View on Google Play Store"
              >
                <PlayStoreIcon className="w-3 h-3 fill-current" />
                <span className="hidden sm:inline">PLAY STORE</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white font-mono text-xs transition-all group"
                title="View GitHub Repository"
              >
                <GithubIcon className="w-3 h-3" />
                <span className="hidden sm:inline">REPO</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}

            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 active:scale-95 transition-all shadow-md"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </header>

      {/* MAIN CASE STUDY CONTAINER */}
      <main className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb & Project Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <button onClick={onBack} className="hover:text-white transition-colors">Home</button>
            <span>/</span>
            <button onClick={onBack} className="hover:text-white transition-colors">Projects</button>
            <span>/</span>
            <span className="text-white font-bold">{project.id}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectProject(prevProject.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-400 hover:text-white transition-all"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Prev: {prevProject.number}</span>
            </button>

            <span className="text-zinc-600">|</span>

            <button
              onClick={() => onSelectProject(nextProject.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-400 hover:text-white transition-all"
            >
              <span>Next: {nextProject.number}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Hero Editorial Header */}
        <div className="py-10 sm:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs font-bold uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CASE STUDY // PRODUCTION SPECIFICATION</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-8xl uppercase tracking-tight text-white leading-[1.02]">
            {project.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono text-zinc-400">
            <span className="text-white font-semibold">Client: {project.client}</span>
            <span>•</span>
            <span>Role: {project.role}</span>
            <span>•</span>
            <span>Period: {project.year}</span>
          </div>

          {/* High-Impact Verified KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"
              >
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {metric.value}
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cinematic Showcase Media Banner */}
        <div className="my-8 rounded-3xl overflow-hidden border border-white/15 relative aspect-[16/9] sm:aspect-[21/9] bg-zinc-900 shadow-2xl group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover filter contrast-105 brightness-95 group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-xs font-mono">
            <div className="bg-black/85 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-zinc-200 max-w-xl text-xs sm:text-sm leading-relaxed">
              {project.description}
            </div>

            <div className="flex items-center gap-3">
              {project.playstoreUrl && (
                <a
                  href={project.playstoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-full bg-emerald-500 text-black font-mono text-xs font-bold flex items-center gap-2 hover:bg-emerald-400 transition-colors shadow-lg"
                >
                  <PlayStoreIcon className="w-4 h-4 fill-current" />
                  <span>Verified Google Play Store App</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* INTERACTIVE NAVIGATION TABS */}
        <div className="sticky top-20 z-40 bg-[#050505]/95 backdrop-blur-xl py-3 border-y border-white/10 my-10 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('business')}
            className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'business'
                ? 'bg-white text-black shadow-lg'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>01. Business Logic & Flows</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'architecture'
                ? 'bg-white text-black shadow-lg'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>02. Technical Architecture & Code</span>
          </button>

          <button
            onClick={() => setActiveTab('techstack')}
            className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'techstack'
                ? 'bg-white text-black shadow-lg'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>03. Tech Stack & Decisions</span>
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'challenges'
                ? 'bg-white text-black shadow-lg'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>04. Production Challenges & Fixes</span>
          </button>
        </div>

        {/* TAB 1: BUSINESS LOGIC */}
        {activeTab === 'business' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            {/* Problem vs Solution Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-red-500/20 relative">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-400 font-bold mb-3">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Commercial Problem</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3">
                  {project.businessLogic.headline}
                </h3>
                <p className="font-body text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {project.businessLogic.problem}
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-emerald-500/20 relative">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The Architectural Solution</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3">
                  Autonomous Multi-Role Platform
                </h3>
                <p className="font-body text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {project.businessLogic.solution}
                </p>
              </div>
            </div>

            {/* End-User Journey Steps */}
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-white mb-6 flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-white" />
                <span>Customer & End-User Journey</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.businessLogic.userFlow.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs text-zinc-500 font-bold">
                        PHASE_{step.step}
                      </span>
                      <h4 className="font-display font-bold text-base text-white mt-1">
                        {step.title}
                      </h4>
                    </div>
                    <p className="font-body text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Merchant / Partner Operations Flow */}
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-white mb-6 flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-white" />
                <span>Merchant & Operational Back-Office Journey</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.businessLogic.partnerFlow.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs text-zinc-500 font-bold">
                        WORKFLOW_{step.step}
                      </span>
                      <h4 className="font-display font-bold text-base text-white mt-1">
                        {step.title}
                      </h4>
                    </div>
                    <p className="font-body text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Settlement & Commission Breakdown */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10">
              <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2 font-bold">
                Financial Settlement, Commission & Reconciliation Engine
              </h4>
              <p className="font-body text-zinc-300 text-sm sm:text-base leading-relaxed">
                {project.businessLogic.financialModel}
              </p>
            </div>
          </motion.div>
        )}

        {/* TAB 2: TECHNICAL ARCHITECTURE & SYSTEMS */}
        {activeTab === 'architecture' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Overview Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-white/15">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-2 font-bold">
                Architecture Blueprint & High-Concurrency Principles
              </span>
              <p className="font-body text-zinc-300 text-sm sm:text-base leading-relaxed">
                {project.technicalDeepDive.overview}
              </p>
            </div>

            {/* Deep-Dive Subsystems */}
            <div className="space-y-6">
              {project.technicalDeepDive.components.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                    <div>
                      <h4 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-wide">
                        {comp.title}
                      </h4>
                      <div className="font-mono text-xs sm:text-sm text-zinc-400 mt-1">
                        {comp.subtitle}
                      </div>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-zinc-300 w-fit">
                      {comp.spec}
                    </span>
                  </div>

                  <p className="font-body text-zinc-300 text-sm leading-relaxed">
                    {comp.details}
                  </p>

                  {/* Interactive Code / Config Snippet */}
                  {comp.codeSnippet && (
                    <div className="mt-4 rounded-2xl bg-black border border-white/15 p-4 sm:p-6 font-mono text-xs text-zinc-300 overflow-x-auto relative group">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs text-zinc-500">
                        <span>SYSTEM SPECIFICATION & IMPLEMENTATION</span>
                        <button
                          onClick={() => handleCopyCode(comp.codeSnippet!, idx)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-all text-xs"
                        >
                          {copiedSnippetIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-xs sm:text-sm leading-relaxed text-zinc-200">
                        <code>{comp.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: TECH STACK SPECIFICATIONS & RATIONALE */}
        {activeTab === 'techstack' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.techStackDetailed.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-zinc-500 uppercase">{item.category}</span>
                      <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 text-xs">
                        {item.spec}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-lg text-white">
                      {item.name}
                    </h4>
                  </div>

                  <p className="font-body text-zinc-400 text-xs sm:text-sm mt-4 leading-relaxed border-t border-white/5 pt-3">
                    <span className="text-zinc-500 font-mono uppercase text-xs block mb-1">Architectural Rationale:</span>
                    {item.rationale}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: PRODUCTION CHALLENGES & SOLUTIONS */}
        {activeTab === 'challenges' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {project.productionChallenges.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-4"
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-400 font-bold pb-3 border-b border-white/10">
                  <Zap className="w-4 h-4" />
                  <span>Bottleneck 0{idx + 1}: {item.issue}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-body">
                  <div>
                    <span className="font-mono uppercase text-xs text-zinc-500 block mb-1.5 font-bold">
                      Root Cause:
                    </span>
                    <p className="text-zinc-300 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                      {item.rootCause}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono uppercase text-xs text-emerald-400 block mb-1.5 font-bold">
                      Engineering Solution:
                    </span>
                    <p className="text-zinc-300 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                      {item.engineeringSolution}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong className="text-white">Outcome: </strong>{item.outcome}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* NEXT ARCHITECTURE CASE STUDY CALLOUT */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
            Next Architectural Deep-Dive
          </div>
          <div
            onClick={() => onSelectProject(nextProject.id)}
            className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/15 hover:border-white/30 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                <span>PROJ_{nextProject.number}</span>
                <span>•</span>
                <span>{nextProject.category}</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-4xl uppercase text-white group-hover:text-zinc-200 transition-colors">
                {nextProject.title}
              </h3>
              <p className="font-body text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl">
                {nextProject.description}
              </p>
            </div>

            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold self-start sm:self-auto group-hover:bg-zinc-200 transition-colors">
              <span>EXPLORE CASE STUDY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* BOTTOM MONOLITH CONTACT BANNER */}
        <div className="mt-16 p-8 sm:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-8 text-center sm:text-left">
          <div>
            <h3 className="font-display font-bold text-2xl sm:text-4xl uppercase tracking-tight text-white">
              Want to Discuss This Architecture?
            </h3>
            <p className="font-mono text-xs sm:text-sm text-zinc-400 mt-2">
              Govind Jayakumar · Available immediately for Software Engineer, Backend, and MERN Developer opportunities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-xl"
            >
              CONNECT WITH GOVIND
            </button>
            <button
              onClick={onOpenResume}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-panel text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all"
            >
              VIEW RESUME
            </button>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div>
          © 2026 GOVIND JAYAKUMAR. CASE STUDY SPECIFICATIONS.
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <span>•</span>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <span>•</span>
          <a href={`mailto:${SOCIAL_LINKS.email}`} className="hover:text-white transition-colors">{SOCIAL_LINKS.email}</a>
        </div>
      </footer>
    </div>
  );
};
