import React from 'react';
import { motion } from 'framer-motion';
import { Command, ArrowUpRight, Sparkles, Briefcase, Terminal, Mail, Cpu, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { SOCIAL_LINKS } from '../data/social';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenCommand: () => void;
  onOpenResume: () => void;
  isProjectPage?: boolean;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenCommand,
  onOpenResume,
  isProjectPage = false,
  onNavigateSection,
}) => {
  const scrollTo = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (onNavigateSection) {
      onNavigateSection('top');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* DESKTOP & TABLET TOP FLOATING PILL NAVBAR */}
      <header className="fixed top-4 lg:top-5 left-0 right-0 z-50 hidden md:flex justify-center px-4 lg:px-6 pointer-events-none">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center gap-1 lg:gap-2 px-3 lg:px-4 py-2 lg:py-2.5 rounded-full bg-zinc-950/85 border border-white/10 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] max-w-full"
        >
          {/* Logo / Monogram */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 pl-1.5 pr-2 lg:pl-2 lg:pr-3 py-1 group text-left shrink-0"
          >
            <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center font-display font-bold text-xs tracking-tighter group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <span className="font-display font-bold text-xs lg:text-sm tracking-widest text-white group-hover:text-zinc-300 transition-colors whitespace-nowrap">
              GOVIND.DEV
            </span>
          </button>

          {/* Divider */}
          <div className="w-px h-4 bg-white/10 mx-0.5 lg:mx-1 shrink-0" />

          {/* Navigation Links */}
          <div className="flex items-center gap-0.5 lg:gap-1 text-[11px] lg:text-xs font-mono tracking-wider text-zinc-400 whitespace-nowrap">
            <button
              onClick={() => scrollTo('about')}
              className="px-2.5 lg:px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollTo('experience')}
              className="px-2.5 lg:px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              EXPERIENCE
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className={`px-2.5 lg:px-3 py-1.5 rounded-full transition-all ${
                isProjectPage
                  ? 'bg-white/10 text-white'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              PROJECTS
            </button>
            <button
              onClick={() => scrollTo('tech-stack')}
              className="px-2.5 lg:px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              TECH STACK
            </button>
            <button
              onClick={onOpenResume}
              className="px-2.5 lg:px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 text-zinc-300"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </button>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-4 bg-white/10 mx-1 shrink-0" />

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommand}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-zinc-400 hover:text-white transition-all shrink-0"
            title="Press Cmd + K"
          >
            <Command className="w-3 h-3" />
            <span className="text-[10px] text-zinc-500">⌘K</span>
          </button>

          {/* Social Quick Links */}
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="hidden xl:inline-flex p-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-400 hover:text-white transition-all shrink-0"
            title="GitHub: Govind858"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden xl:inline-flex p-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-400 hover:text-white transition-all shrink-0"
            title="LinkedIn: Govind Jayakumar"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>

          {/* Primary Action Button */}
          <button
            onClick={onOpenContact}
            className="ml-1 flex items-center gap-1.5 px-3.5 lg:px-4 py-1.5 rounded-full bg-white text-black font-mono text-[11px] lg:text-xs font-semibold hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] whitespace-nowrap shrink-0"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </motion.nav>
      </header>

      {/* MOBILE BOTTOM FLOATING THUMB-ZONE BAR */}
      <nav className="fixed bottom-4 left-3 right-3 z-50 md:hidden flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center justify-between gap-0.5 w-full max-w-md px-2.5 py-1.5 rounded-full bg-zinc-950/90 border border-white/15 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
        >
          <button
            onClick={scrollToTop}
            className="flex flex-col items-center justify-center p-2 rounded-full text-zinc-400 hover:text-white active:scale-90 transition-all"
            title="Home"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[9px] font-mono mt-0.5">TOP</span>
          </button>

          <button
            onClick={() => scrollTo('experience')}
            className="flex flex-col items-center justify-center p-2 rounded-full text-zinc-400 hover:text-white active:scale-90 transition-all"
            title="Experience"
          >
            <Briefcase className="w-4 h-4" />
            <span className="text-[9px] font-mono mt-0.5">EXP</span>
          </button>

          <button
            onClick={() => scrollTo('projects')}
            className="flex flex-col items-center justify-center p-2 rounded-full text-zinc-400 hover:text-white active:scale-90 transition-all"
            title="Projects"
          >
            <Terminal className="w-4 h-4" />
            <span className="text-[9px] font-mono mt-0.5">PROJECTS</span>
          </button>

          <button
            onClick={() => scrollTo('tech-stack')}
            className="flex flex-col items-center justify-center p-2 rounded-full text-zinc-400 hover:text-white active:scale-90 transition-all"
            title="Tech Stack"
          >
            <Cpu className="w-4 h-4" />
            <span className="text-[9px] font-mono mt-0.5">STACK</span>
          </button>

          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-black font-mono text-xs font-bold active:scale-90 transition-all shadow-lg"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>TALK</span>
          </button>
        </motion.div>
      </nav>
    </>
  );
};
