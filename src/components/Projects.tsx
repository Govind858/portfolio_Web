import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Eye, Sparkles, Filter, Terminal } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { PlayStoreIcon } from './SocialIcons';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Backend & K8s', 'Mobile & BLE', 'Enterprise Web'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 lg:mb-16 pb-8 border-b border-white/10">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[11px] sm:text-xs font-mono tracking-widest text-zinc-300 uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
            <span>03 / FEATURED SYSTEMS & APPS</span>
          </div>
          <h2 className="font-display font-extrabold text-[clamp(1.25rem,5.2vw,3.75rem)] uppercase tracking-tight text-white leading-[1.08]">
            Production Implementations.
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-zinc-500 mr-1 hidden sm:inline" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all ${
                activeFilter === cat
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              key={project.id}
              className="group rounded-3xl glass-panel overflow-hidden border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between"
            >
              {/* Media Thumbnail Container */}
              <div 
                onClick={() => onSelectProject(project)}
                className="relative aspect-[16/10] overflow-hidden bg-zinc-900 cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100"
                  loading="lazy"
                />

                {/* Ambient Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Top Badge: Number, Play Store & Category */}
                <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[11px] sm:text-xs font-bold text-white">
                    {project.number}
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.playstoreUrl && (
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-black font-mono text-[10px] font-bold flex items-center gap-1 shadow-md">
                        <PlayStoreIcon className="w-3 h-3 fill-current" />
                        <span>PLAY STORE</span>
                      </span>
                    )}
                    <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 font-mono text-[10px] sm:text-xs text-zinc-300">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Hover Reveal Floating View Pill */}
                <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-white text-black font-mono text-xs font-bold flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-3.5 h-3.5" />
                    <span>INSPECT ARCHITECTURE</span>
                  </div>
                </div>

                {/* Bottom Thumbnail Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2 text-[11px] sm:text-xs font-mono text-zinc-300 pointer-events-none">
                  <span className="truncate">{project.client}</span>
                  <span className="shrink-0">{project.year}</span>
                </div>
              </div>

              {/* Card Body & Details */}
              <div className="p-5 sm:p-7 flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="font-display font-bold text-[clamp(1.1rem,4.6vw,1.5rem)] text-white uppercase tracking-tight group-hover:text-zinc-200 transition-colors cursor-pointer flex items-center justify-between gap-2"
                  >
                    <span className="min-w-0">{project.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                  </h3>

                  <p className="font-body text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Metrics Pills */}
                  <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-white/10">
                    {project.metrics.slice(0, 2).map((metric, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="font-display font-bold text-sm text-white">
                          {metric.value}
                        </span>
                        <span className="font-mono text-[9px] text-zinc-500 uppercase">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills & Dedicated Separate Action Buttons */}
                <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className={`grid gap-2.5 ${project.playstoreUrl ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                    <button
                      onClick={() => onSelectProject(project)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 active:scale-[0.98] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>CASE STUDY</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {project.playstoreUrl && (
                      <a
                        href={project.playstoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 border border-emerald-500/40 text-emerald-400 hover:text-black active:scale-[0.98] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.12)]"
                        title="Download BookMyCuts on Google Play Store"
                      >
                        <PlayStoreIcon className="w-3.5 h-3.5 fill-current" />
                        <span>PLAY STORE</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
