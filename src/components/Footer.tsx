import React from 'react';
import { ArrowUp, ArrowUpRight, Sparkles, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { SOCIAL_LINKS } from '../data/social';

interface FooterProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContact,
  onOpenResume,
  onNavigateSection,
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (onNavigateSection) {
      e.preventDefault();
      onNavigateSection(sectionId);
    }
  };
  const scrollToTop = () => {
    const lenisInstance = (window as unknown as { lenis?: { scrollTo: (target: number) => void } }).lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative pt-16 sm:pt-24 pb-24 md:pb-16 px-4 sm:px-6 lg:px-12 border-t border-white/10 bg-black overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[360px] sm:w-[700px] h-[240px] sm:h-[350px] bg-white/[0.03] rounded-full blur-[120px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Call to Action Monolith */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 sm:pb-20 lg:pb-24 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[11px] sm:text-xs font-mono tracking-widest text-zinc-300 uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
              <span>ACTIVELY INTERVIEWING FOR 2026 ROLES</span>
            </div>

            <h2 className="font-display font-extrabold text-[clamp(1.75rem,7.8vw,6rem)] uppercase tracking-tighter text-white leading-[1.04]">
              Let's Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-700">
                Scalable Systems.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenContact}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2"
            >
              <span>CONNECT WITH GOVIND</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenResume}
              className="px-6 py-3.5 sm:py-4 rounded-full glass-panel text-zinc-200 font-mono text-xs sm:text-sm uppercase tracking-wider hover:text-white hover:border-white/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>VIEW RESUME</span>
            </button>
          </div>
        </div>

        {/* Links & Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 sm:py-16 border-b border-white/10 text-xs font-mono">
          <div>
            <h4 className="text-zinc-500 uppercase tracking-widest mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-zinc-300">
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors">01 About & Philosophy</a>
              </li>
              <li>
                <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className="hover:text-white transition-colors">02 Professional Experience</a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="hover:text-white transition-colors">03 Featured Projects</a>
              </li>
              <li>
                <a href="#tech-stack" onClick={(e) => handleNavClick(e, 'tech-stack')} className="hover:text-white transition-colors">04 Technical Stack</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-500 uppercase tracking-widest mb-4">Direct Channels</h4>
            <ul className="space-y-2.5 text-zinc-300">
              <li>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                  <span>GitHub Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors group min-w-0"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
                  <span className="truncate">{SOCIAL_LINKS.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SOCIAL_LINKS.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                  <span>{SOCIAL_LINKS.phone}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-500 uppercase tracking-widest mb-4">Engineering Focus</h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li>Node.js & Express Architecture</li>
              <li>Docker & Kubernetes (K8s)</li>
              <li>React Native (Expo SDK 54)</li>
              <li>Redis & BullMQ Background Workers</li>
              <li>Hardware ESC/POS Thermal BLE</li>
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-500 uppercase tracking-widest mb-4">Location & Availability</h4>
            <div className="text-zinc-300 space-y-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Kerala, India</span>
              </div>
              <div className="text-zinc-500 text-[11px]">Relocation / Remote Friendly</div>
              <div className="text-emerald-400 text-[11px] pt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Notice Period: Immediate / Fast</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs font-mono text-zinc-500 text-center sm:text-left">
          <div>
            © 2026 GOVIND JAYAKUMAR. ENGINEERED FOR SCALE & SILKY-SMOOTH TRANSITIONS.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-zinc-300 hover:text-white hover:border-white/40 active:scale-95 transition-all"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
