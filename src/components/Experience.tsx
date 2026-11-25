import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Layers, GraduationCap } from 'lucide-react';
import { experiences, education } from '../data/experience';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2 mb-2">
            <Briefcase className="w-3.5 h-3.5 text-white" />
            <span>02 / PROFESSIONAL EXPERIENCE</span>
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl uppercase tracking-tight text-white">
            Engineering Track Record.
          </h2>
        </div>
        <p className="font-mono text-xs sm:text-sm text-zinc-400 max-w-md">
          Commercial software engineering experience delivering production microservices, Kubernetes deployments, and IoT hardware drivers.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-8">
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 relative overflow-hidden"
          >
            {/* Ambient Radial Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

            {/* Header / Meta */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs font-bold uppercase mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{exp.type}</span>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-4xl text-white uppercase tracking-tight">
                  {exp.role}
                </h3>
                <div className="text-sm sm:text-base font-mono text-zinc-300 font-semibold mt-1">
                  {exp.company}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{exp.period}</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{exp.location}</span>
                </span>
              </div>
            </div>

            {/* Role Summary */}
            <p className="font-body text-zinc-300 text-sm sm:text-base leading-relaxed my-6">
              {exp.summary}
            </p>

            {/* Detailed Accomplishments */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
                Key Architectural Accomplishments & Impact:
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {exp.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all text-xs sm:text-sm font-body text-zinc-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Used Pill Row */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-500 mr-2 flex items-center gap-1">
                <ChevronRight className="w-3 h-3" />
                <span>STACK:</span>
              </span>
              {exp.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>

          </motion.div>
        ))}

        {/* Education Milestone */}
        {education.map((edu) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white mt-1">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 text-white font-mono text-[11px] font-bold uppercase mb-1">
                    Formal Education
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-tight">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-mono text-zinc-400 mt-1">
                    {edu.institution} · {edu.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-xs font-mono text-zinc-300 w-fit">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>Class of {edu.year}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
