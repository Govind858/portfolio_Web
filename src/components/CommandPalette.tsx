import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Briefcase, Terminal, User, Mail, Copy, FileText, ArrowRight, X, Phone, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon, PlayStoreIcon } from './SocialIcons';
import { SOCIAL_LINKS } from '../data/social';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenContact,
  onOpenResume,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scrollTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('govindjayakumar858@gmail.com');
    alert('Email copied: govindjayakumar858@gmail.com');
    onClose();
  };

  const copyPhone = () => {
    navigator.clipboard.writeText('+91 9037920297');
    alert('Phone copied: +91 9037920297');
    onClose();
  };

  const actions = [
    {
      title: 'Inspect Featured Production Projects',
      category: 'Navigation',
      icon: Terminal,
      handler: () => scrollTo('projects'),
    },
    {
      title: 'View BookMyCuts on Google Play Store',
      category: 'Production Apps',
      icon: PlayStoreIcon,
      handler: () => {
        window.open('https://play.google.com/store/apps/details?id=com.anazk.bookmycuts&hl=en_IN', '_blank', 'noreferrer');
        onClose();
      },
    },
    {
      title: 'Professional Experience & Career History',
      category: 'Navigation',
      icon: Briefcase,
      handler: () => scrollTo('experience'),
    },
    {
      title: 'Review Full Tech Stack & Disciplines',
      category: 'Navigation',
      icon: Cpu,
      handler: () => scrollTo('tech-stack'),
    },
    {
      title: 'About Engineering Philosophy & Metrics',
      category: 'Navigation',
      icon: User,
      handler: () => scrollTo('about'),
    },
    {
      title: 'View & Print Curriculum Vitae (Resume)',
      category: 'Documents',
      icon: FileText,
      handler: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      title: 'Copy Email Address (govindjayakumar858@gmail.com)',
      category: 'Contact',
      icon: Copy,
      handler: copyEmail,
    },
    {
      title: 'Copy Direct Phone Number (+91 9037920297)',
      category: 'Contact',
      icon: Phone,
      handler: copyPhone,
    },
    {
      title: 'Open GitHub Profile (Govind858)',
      category: 'Social / Connect',
      icon: GithubIcon,
      handler: () => {
        window.open(SOCIAL_LINKS.github, '_blank', 'noreferrer');
        onClose();
      },
    },
    {
      title: 'Open LinkedIn Profile (Govind Jayakumar)',
      category: 'Social / Connect',
      icon: LinkedinIcon,
      handler: () => {
        window.open(SOCIAL_LINKS.linkedin, '_blank', 'noreferrer');
        onClose();
      },
    },
    {
      title: 'Initiate Direct Inquiry Message',
      category: 'Contact',
      icon: Mail,
      handler: () => {
        onClose();
        onOpenContact();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-zinc-950 border border-white/20 rounded-2xl p-4 shadow-2xl z-10 text-white overflow-hidden"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10">
            <Search className="w-4 h-4 text-zinc-400" />
            <input
              autoFocus
              type="text"
              placeholder="Type a command or jump to section..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm font-mono placeholder-zinc-500 text-white focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-md text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action List */}
          <div className="mt-3 max-h-80 overflow-y-auto space-y-1">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-zinc-500">
                No commands matching "{query}"
              </div>
            ) : (
              filtered.map((action, i) => {
                const Icon = action.icon;
                return (
                  <button
                    key={i}
                    onClick={action.handler}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-mono text-zinc-200 group-hover:text-white">
                          {action.title}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500">
                          {action.category}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">ESC</kbd> to close
            </span>
            <span>GOVIND.DEV NAVIGATION SYSTEM</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
