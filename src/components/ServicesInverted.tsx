import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { services } from '../data/services';

interface ServicesInvertedProps {
  onOpenPricing: () => void;
}

export const ServicesInverted: React.FC<ServicesInvertedProps> = ({ onOpenPricing }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="services" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* HIGH-CONTRAST INVERTED SURGICAL WHITE CONTAINER */}
      <div className="bg-white text-black rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-12 lg:p-16 shadow-[0_25px_60px_rgba(255,255,255,0.06)] relative overflow-hidden transition-all">
        
        {/* Subtle Decorative Architectural Grid */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-100 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 sm:pb-14 border-b border-zinc-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-mono tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
              <span>02 / SERVICES & CAPABILITIES</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-black leading-none">
              Capabilities Built For Conversion.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-body text-zinc-600 text-sm sm:text-base leading-relaxed mb-4">
              High-concept artistic presentation backed by rigorous engineering. Every line of code is structured for speed, SEO, and visual memorability.
            </p>
            <button
              onClick={onOpenPricing}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white font-mono text-xs font-bold tracking-wider hover:bg-zinc-800 active:scale-95 transition-all shadow-md"
            >
              <span>ESTIMATE SERVICE SCOPE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Accordion / Interactive Capabilities List */}
        <div className="relative z-10 divide-y divide-zinc-200 mt-4">
          {services.map((service, index) => {
            const isOpen = expandedIndex === index;
            return (
              <div key={service.id} className="py-6 sm:py-8 group">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-start sm:items-center justify-between text-left gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8">
                    <span className="font-mono text-sm sm:text-base font-bold text-zinc-400 group-hover:text-black transition-colors">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-black group-hover:translate-x-1 transition-transform">
                        {service.title}
                      </h3>
                      <p className="font-mono text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-700 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all flex-shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Drawer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 sm:pt-8 sm:pl-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                            Overview
                          </h4>
                          <p className="font-body text-zinc-700 text-sm sm:text-base leading-relaxed">
                            {service.description}
                          </p>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {service.techStack.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-800 font-mono text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3">
                            Key Deliverables Included
                          </h4>
                          <ul className="space-y-2.5">
                            {service.deliverables.map((item, i) => (
                              <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-body text-zinc-800">
                                <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
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
          <span>STANDARD SPRINT: 3-6 WEEKS</span>
          <span className="hidden sm:inline">•</span>
          <span>FULL SOURCE CODE & ASSET OWNERSHIP HANDOFF</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-black font-bold">100% SATISFACTION GUARANTEE</span>
        </div>

      </div>
    </section>
  );
};
