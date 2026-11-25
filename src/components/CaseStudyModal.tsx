import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Terminal,
  Cpu,
  Server,
  Zap,
  Briefcase,
  AlertCircle,
  Copy,
  Check,
  Smartphone
} from 'lucide-react';
import type { Project } from '../data/projects';
import { PlayStoreIcon, GithubIcon } from './SocialIcons';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

type TabType = 'business' | 'architecture' | 'techstack' | 'challenges';

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenContact,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('business');
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);

  if (!project) return null;

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[94vh] overflow-y-auto bg-zinc-950 border border-white/15 rounded-[2rem] p-5 sm:p-8 md:p-10 shadow-2xl z-10 text-white selection:bg-white selection:text-black custom-scrollbar"
        >
          {/* Top Bar: Navigation & Direct Action Links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 sticky top-0 bg-zinc-950/90 backdrop-blur-xl z-20 -mt-2 pt-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white text-black font-mono text-xs font-bold">
                PROJ_{project.number}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-zinc-300">
                {project.category}
              </span>
              <span className="text-xs font-mono text-zinc-500 hidden md:inline">
                ✦ {project.year}
              </span>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Play Store CTA if available */}
              {project.playstoreUrl && (
                <a
                  href={project.playstoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] group"
                  title="View on Google Play Store"
                >
                  <PlayStoreIcon className="w-3.5 h-3.5 fill-current" />
                  <span>PLAY STORE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {/* GitHub Repo */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white font-mono text-xs transition-all group"
                  title="View GitHub Repository"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">GITHUB</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-400 hover:text-white transition-all ml-1"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Hero Header Presentation */}
          <div className="py-6 border-b border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-none">
                  {project.title}
                </h1>
                <p className="font-mono text-xs sm:text-sm text-zinc-400 mt-2 flex items-center gap-2">
                  <span className="text-zinc-500">CLIENT / PRODUCT:</span>
                  <span className="text-white font-medium">{project.client}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-300">ROLE: {project.role}</span>
                </p>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-center min-w-[100px]"
                  >
                    <div className="font-display font-bold text-base sm:text-lg text-white">
                      {metric.value}
                    </div>
                    <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Showcase Banner */}
          <div className="my-6 rounded-2xl overflow-hidden border border-white/10 relative aspect-[21/9] sm:aspect-[24/9] bg-zinc-900 group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover filter contrast-105 brightness-95 group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-xs font-mono">
              <div className="bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 text-zinc-300 max-w-xl text-[11px] leading-relaxed">
                {project.description}
              </div>

              {project.playstoreUrl && (
                <a
                  href={project.playstoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-bold text-[11px] flex items-center gap-1.5 self-start sm:self-auto hover:bg-emerald-400 transition-colors"
                >
                  <PlayStoreIcon className="w-3.5 h-3.5" />
                  <span>Verified Google Play Store App</span>
                </a>
              )}
            </div>
          </div>

          {/* Detailed Section Tabs */}
          <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-px mb-8 text-xs font-mono scrollbar-none">
            <button
              onClick={() => setActiveTab('business')}
              className={`px-4 py-3 border-b-2 font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'business'
                  ? 'border-white text-white bg-white/5 rounded-t-lg'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>01. Business Logic & Product Flows</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-3 border-b-2 font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'architecture'
                  ? 'border-white text-white bg-white/5 rounded-t-lg'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>02. System Architecture & Deep Dive</span>
            </button>

            <button
              onClick={() => setActiveTab('techstack')}
              className={`px-4 py-3 border-b-2 font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'techstack'
                  ? 'border-white text-white bg-white/5 rounded-t-lg'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>03. Tech Stack & Rationale</span>
            </button>

            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-4 py-3 border-b-2 font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'challenges'
                  ? 'border-white text-white bg-white/5 rounded-t-lg'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>04. Production Challenges & Fixes</span>
            </button>
          </div>

          {/* TAB 1: BUSINESS LOGIC & PRODUCT FLOWS */}
          {activeTab === 'business' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Problem vs Solution Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-red-500/20 relative overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-400 font-bold mb-3">
                    <AlertCircle className="w-4 h-4" />
                    <span>The Commercial Problem</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    {project.businessLogic.headline}
                  </h3>
                  <p className="font-body text-zinc-300 text-sm leading-relaxed">
                    {project.businessLogic.problem}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-emerald-500/20 relative overflow-hidden">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3">
                    <CheckCircle2 className="w-4 h-4" />
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

              {/* End-User Journey Steps */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-white" />
                  <span>Customer / End-User Execution Journey</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {project.businessLogic.userFlow.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
                    >
                      <div>
                        <span className="font-mono text-xs text-zinc-500 font-bold">
                          STEP_{step.step}
                        </span>
                        <div className="font-display font-bold text-sm text-white mt-1">
                          {step.title}
                        </div>
                      </div>
                      <p className="font-body text-zinc-400 text-xs mt-2 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Merchant / Partner Operations Flow */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-white" />
                  <span>Merchant / Operational Back-Office Journey</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {project.businessLogic.partnerFlow.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
                    >
                      <div>
                        <span className="font-mono text-xs text-zinc-500 font-bold">
                          PHASE_{step.step}
                        </span>
                        <div className="font-display font-bold text-sm text-white mt-1">
                          {step.title}
                        </div>
                      </div>
                      <p className="font-body text-zinc-400 text-xs mt-2 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial & Settlement Mechanics */}
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10">
                <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
                  Financial Settlement & Reconciliation Model
                </h4>
                <p className="font-body text-zinc-300 text-sm leading-relaxed">
                  {project.businessLogic.financialModel}
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 2: TECHNICAL ARCHITECTURE & SYSTEMS DEEP DIVE */}
          {activeTab === 'architecture' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-1">
                  Architecture Overview
                </span>
                <p className="font-body text-zinc-300 text-sm leading-relaxed">
                  {project.technicalDeepDive.overview}
                </p>
              </div>

              {/* Subsystem Components */}
              <div className="space-y-4">
                {project.technicalDeepDive.components.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                      <div>
                        <h4 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-wide">
                          {comp.title}
                        </h4>
                        <div className="font-mono text-xs text-zinc-400 mt-0.5">
                          {comp.subtitle}
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-300 w-fit">
                        {comp.spec}
                      </span>
                    </div>

                    <p className="font-body text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {comp.details}
                    </p>

                    {/* Interactive Code Snippet if present */}
                    {comp.codeSnippet && (
                      <div className="mt-3 rounded-xl bg-black border border-white/10 p-3 sm:p-4 font-mono text-xs text-zinc-300 overflow-x-auto relative group">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-zinc-500">
                          <span>SYSTEM CONFIG / IMPLEMENTATION</span>
                          <button
                            onClick={() => handleCopyCode(comp.codeSnippet!, idx)}
                            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                          >
                            {copiedSnippetIndex === idx ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-[11px] leading-relaxed text-zinc-300">
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {project.techStackDetailed.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-zinc-500 uppercase">{item.category}</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 text-[10px]">
                          {item.spec}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base text-white">
                        {item.name}
                      </h4>
                    </div>

                    <p className="font-body text-zinc-400 text-xs mt-3 leading-relaxed border-t border-white/5 pt-2.5">
                      <span className="text-zinc-500 font-mono uppercase text-[10px] block mb-0.5">Engineering Rationale:</span>
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {project.productionChallenges.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold pb-2 border-b border-white/10">
                    <Zap className="w-4 h-4" />
                    <span>Bottleneck 0{idx + 1}: {item.issue}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body">
                    <div>
                      <span className="font-mono uppercase text-[10px] text-zinc-500 block mb-1">
                        Root Cause:
                      </span>
                      <p className="text-zinc-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                        {item.rootCause}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono uppercase text-[10px] text-emerald-400 block mb-1">
                        Engineering Solution:
                      </span>
                      <p className="text-zinc-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                        {item.engineeringSolution}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Outcome: </strong>{item.outcome}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Modal Action Footer */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
              {project.playstoreUrl && (
                <a
                  href={project.playstoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-black font-mono text-xs font-bold hover:bg-emerald-400 active:scale-95 transition-all shadow-lg"
                >
                  <PlayStoreIcon className="w-4 h-4 fill-current" />
                  <span>VIEW ON GOOGLE PLAY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold hover:bg-zinc-200 active:scale-95 transition-all shadow-lg"
                >
                  <Terminal className="w-4 h-4" />
                  <span>GITHUB REPO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-full sm:w-auto text-xs font-mono text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Discuss {project.title} architecture with Govind →
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
