import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Copy, Check, Send, Sparkles, Clock, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { SOCIAL_LINKS } from '../data/social';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Full-Time Software Engineer Opportunity',
    message: '',
  });

  if (!isOpen) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText('govindjayakumar858@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText('+91 9037920297');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#a1a1aa', '#52525b'],
        });
      } catch {
        // Fallback gracefully
      }
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 text-white"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-zinc-300 uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>DIRECT WIRE // CONNECT WITH GOVIND</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white">
                Let's Build Together.
              </h2>
              <p className="font-mono text-xs text-zinc-400 mt-1">
                Open for Software Engineer, Backend, and MERN Developer opportunities.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-white">
                Message Dispatched.
              </h3>
              <p className="font-body text-zinc-400 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, {form.name || 'there'}! I've received your note and will review your message promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-8 px-8 py-3 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all"
              >
                RETURN TO PORTFOLIO
              </button>
            </div>
          ) : (
            <>
              {/* Direct Info Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300 truncate">
                    <Mail className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="truncate">{SOCIAL_LINKS.email}</span>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white hover:text-black transition-all flex-shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Phone className="w-4 h-4 text-white flex-shrink-0" />
                    <span>{SOCIAL_LINKS.phone}</span>
                  </div>
                  <button
                    onClick={copyPhone}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white hover:text-black transition-all flex-shrink-0"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/30 flex items-center justify-between text-xs font-mono group transition-colors"
                >
                  <div className="flex items-center gap-2 text-zinc-300 group-hover:text-white transition-colors truncate">
                    <GithubIcon className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="truncate">GitHub: Govind858</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-white group-hover:text-black transition-all flex-shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </a>

                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/30 flex items-center justify-between text-xs font-mono group transition-colors"
                >
                  <div className="flex items-center gap-2 text-zinc-300 group-hover:text-white transition-colors truncate">
                    <LinkedinIcon className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="truncate">LinkedIn: govind-jayakumar</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-white group-hover:text-black transition-all flex-shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Your Name / Company *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Hiring Manager / Tech Lead"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-600 font-body text-sm focus:outline-none focus:border-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="lead@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-600 font-body text-sm focus:outline-none focus:border-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Opportunity / Inquiry Type
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-body text-sm focus:outline-none focus:border-white transition-all"
                  >
                    <option value="Full-Time Software Engineer Opportunity">Full-Time Software Engineer (Backend / MERN)</option>
                    <option value="Contract / Backend Architecture">Contract / Backend Microservices Project</option>
                    <option value="Kubernetes / DevOps Consultation">Kubernetes / Docker Containerization</option>
                    <option value="General Professional Connection">General Professional Connection</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Message / Project Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your tech stack, role requirements, or project scope..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-600 font-body text-sm focus:outline-none focus:border-white transition-all resize-none"
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Based in Kerala, India • Willing to Relocate / Work Remote</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Clock className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>TRANSMIT MESSAGE</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
