import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Server, Cpu, Database, Smartphone, CheckCircle2 } from 'lucide-react';
import { skillCategories } from '../data/techStack';

export const TechStackSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getCategoryIcon = (idx: number) => {
    switch (idx) {
      case 0: return Server;
      case 1: return Cpu;
      case 2: return Database;
      case 3: return Smartphone;
      default: return CheckCircle2;
    }
  };

  return (
    <section id="tech-stack" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* HIGH-CONTRAST INVERTED SURGICAL WHITE CONTAINER (Award-Winning Aesthetic) */}
      <div className="bg-white text-black rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 shadow-[0_25px_60px_rgba(255,255,255,0.06)] relative overflow-hidden transition-all">
        
        {/* Subtle Decorative Ambient Lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-100 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 sm:pb-14 border-b border-zinc-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-mono tracking-widest uppercase mb-4">
              <Cpu className="w-3.5 h-3.5 text-zinc-300" />
              <span>04 / TECHNICAL SKILLS & STACK</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-black leading-none">
              Engineering Disciplines.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-body text-zinc-600 text-sm sm:text-base leading-relaxed">
              Full MERN and DevOps capabilities. Every layer of the system is architected for zero dropped requests, optimal container density, and deterministic performance.
            </p>
          </div>
        </div>

        {/* Categorized Skills Accordion */}
        <div className="relative z-10 divide-y divide-zinc-200 mt-4">
          {skillCategories.map((category, index) => {
            const isOpen = expandedIndex === index;
            const CategoryIcon = getCategoryIcon(index);
            return (
              <div key={index} className="py-6 sm:py-8 group">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-start sm:items-center justify-between text-left gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                    <span className="font-mono text-sm sm:text-base font-bold text-zinc-400 group-hover:text-black transition-colors">
                      0{index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <CategoryIcon className="w-5 h-5 text-zinc-600 group-hover:text-black transition-colors" />
                        <h3 className="font-display font-bold text-xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-black group-hover:translate-x-1 transition-transform">
                          {category.title}
                        </h3>
                      </div>
                      <p className="font-mono text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                        {category.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-700 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all flex-shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Skill Cards Drawer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 sm:pt-8 sm:pl-14 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.skills.map((skill, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-black/30 transition-all flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-display font-bold text-base sm:text-lg text-black uppercase">
                                  {skill.name}
                                </h4>
                                <span className="px-2 py-0.5 rounded-full bg-zinc-200 text-black font-mono text-[10px] font-semibold">
                                  {skill.level}
                                </span>
                              </div>

                              <p className="font-body text-zinc-700 text-xs sm:text-sm leading-relaxed mb-4">
                                {skill.description}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-200">
                              {skill.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2.5 py-0.5 rounded-md bg-white border border-zinc-200 text-zinc-800 font-mono text-[11px]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner inside the Inverted White Card */}
        <div className="relative z-10 mt-10 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <span>CONTAINER RUNTIME: DOCKER / UBUNTU</span>
          <span className="hidden sm:inline">•</span>
          <span>ORCHESTRATION: KUBERNETES HPA AUTOSCALER</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-black font-bold">100% PRODUCTION READY</span>
        </div>

      </div>
    </section>
  );
};
