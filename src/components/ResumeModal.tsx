import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Printer, Mail, Phone, MapPin, Briefcase, Award, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { SOCIAL_LINKS } from '../data/social';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyContact = () => {
    navigator.clipboard.writeText(
      `Govind Jayakumar | ${SOCIAL_LINKS.email} | ${SOCIAL_LINKS.phone} | GitHub: ${SOCIAL_LINKS.github} | LinkedIn: ${SOCIAL_LINKS.linkedin}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
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
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 text-white"
        >
          {/* Action Header */}
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                VERIFIED CURRICULUM VITAE
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 font-mono text-xs transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>

              <button
                onClick={copyContact}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 font-mono text-xs transition-colors"
                title="Copy Contact Info"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Info'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Body */}
          <div className="py-8 font-body text-zinc-300 space-y-8 select-text">
            
            {/* Header / Identity */}
            <div className="text-center pb-6 border-b border-white/10">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
                Govind Jayakumar
              </h1>
              <div className="font-mono text-sm text-zinc-400 font-semibold mt-1">
                Node.js Developer
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono text-zinc-400 mt-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Kerala, India</span>
                </span>
                <span>•</span>
                <a
                  href={`tel:${SOCIAL_LINKS.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  <span>+91 9037920297</span>
                </a>
                <span>•</span>
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{SOCIAL_LINKS.email}</span>
                </a>
                <span>•</span>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-zinc-300" />
                  <span>github.com/Govind858</span>
                </a>
                <span>•</span>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-zinc-300" />
                  <span>linkedin.com/in/govind-jayakumar</span>
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold mb-2 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-white" />
                <span>Professional Summary</span>
              </h2>
              <p className="text-sm leading-relaxed text-zinc-300">
                Backend and MERN Stack Developer with experience building scalable Node.js architectures, distributed systems, and cross-platform mobile applications. Proficient in leveraging TypeScript and Next.js for robust full-stack development. Proven ability to own end-to-end deployments using Docker, Kubernetes, and Nginx while resolving complex client-side performance bottlenecks.
              </p>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold mb-3 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-white" />
                <span>Technical Skills</span>
              </h2>
              <div className="space-y-2 text-xs sm:text-sm font-mono">
                <div>
                  <span className="text-white font-bold">Languages & Frameworks: </span>
                  <span className="text-zinc-400">TypeScript, Node.js, Express.js, Next.js, React Native (Expo), React 19, Redux Toolkit</span>
                </div>
                <div>
                  <span className="text-white font-bold">Databases: </span>
                  <span className="text-zinc-400">MongoDB, PostgreSQL, Redis</span>
                </div>
                <div>
                  <span className="text-white font-bold">Cloud, DevOps & Architecture: </span>
                  <span className="text-zinc-400">Distributed Systems, Backend Architecture, Docker, Kubernetes (K8s), Nginx, AWS S3, BullMQ</span>
                </div>
                <div>
                  <span className="text-white font-bold">API & Testing Tools: </span>
                  <span className="text-zinc-400">Postman, Swagger (OpenAPI)</span>
                </div>
              </div>
            </div>

            {/* Professional Experience */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-white" />
                <span>Professional Experience</span>
              </h2>

              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-4 border-b border-white/10">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white uppercase">
                      Software Engineer
                    </h3>
                    <div className="font-mono text-xs text-zinc-400">
                      ByteBoot Techno Solutions · Kerala, India
                    </div>
                  </div>
                  <div className="font-mono text-xs text-zinc-400">
                    September 2025 – June 2026
                  </div>
                </div>

                {/* Project 1: BookMyCuts */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-display font-bold text-sm text-white uppercase">
                      BookMyCuts (Full-Stack Salon Booking Platform)
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-zinc-300">
                      Play Store
                    </span>
                  </div>
                  <p className="font-mono text-xs text-zinc-400 italic mb-2">
                    A full-stack marketplace platform connecting users to nearby salons for zero-queue appointment booking, while enabling shop owners to manage operations.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300 leading-relaxed">
                    <li>Architected a RESTful Node.js/TypeScript backend and React Native app from scratch, handling database modeling and UI development to enable zero-queue salon appointments.</li>
                    <li>Scaled backend infrastructure using Kubernetes (HPA 2-10 replicas at 75% CPU) and Nginx (1024 worker connections), ensuring high availability during peak traffic.</li>
                    <li>Implemented distributed locking using Redis as a high-speed transient data layer to prevent double-booking of overlapping time slots during concurrent user requests.</li>
                    <li>Engineered custom Axios interceptors with a failed request queue for silent JWT token refreshes, eliminating client-side timeout errors and ensuring 100% request success under poor network conditions.</li>
                  </ul>
                </div>

                {/* Project 2: Coffy Byte */}
                <div className="pt-4 border-t border-white/5">
                  <h4 className="font-display font-bold text-sm text-white uppercase">
                    Coffy Byte (Point-of-Sale Mobile Application)
                  </h4>
                  <p className="font-mono text-xs text-zinc-400 italic mb-2">
                    A mobile POS system designed for cafe and restaurant staff to process fast-paced orders, manage local inventory, and drive thermal printers.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300 leading-relaxed">
                    <li>Developed a cross-platform React Native POS system for fast-paced restaurant environments to instantly process orders and manage local inventory caching.</li>
                    <li>Engineered direct Bluetooth Low Energy (BLE) integration to drive ESC/POS thermal printers by transmitting raw hexadecimal arrays, bypassing bulky high-level print libraries.</li>
                    <li>Prevented hardware buffer overflows by paginating outbound Bluetooth data into 20-byte payloads with a 50ms delay, achieving zero dropped receipts during peak hours.</li>
                    <li>Implemented a stabilized Bluetooth polling mechanism with exponential backoff (5 retries, 200ms interval), ensuring resilient printer connections in high-interference cafe environments.</li>
                  </ul>
                </div>

                {/* Project 3: OlaCars */}
                <div className="pt-4 border-t border-white/5">
                  <h4 className="font-display font-bold text-sm text-white uppercase">
                    OlaCars (Enterprise Fleet Management Portal)
                  </h4>
                  <p className="font-mono text-xs text-zinc-400 italic mb-2">
                    An enterprise-grade administrative portal used by staff to manage vehicle rentals, driver onboarding, and complex financial ledgers.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300 leading-relaxed">
                    <li>Resolved critical state management and rendering bugs across an enterprise React 19 frontend, stabilizing a complex UI interacting with over 50 domain services and thousands of API endpoints.</li>
                    <li>Debugged and secured a complex Axios JWT token queueing system utilizing execution locks, seamlessly replaying pending network requests to prevent data loss under heavy load.</li>
                    <li>Optimized bulk CSV/Excel data uploads using client-side parsing (PapaParse/XLSX), catching malformed inventory data in the browser to significantly reduce server-side validation overhead.</li>
                    <li>Stabilized client-side PDF generation (jsPDF/html2canvas) and e-signature canvas scaling, ensuring accurate alignment of financial statements across diverse viewport sizes.</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold mb-3 flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-white" />
                <span>Education</span>
              </h2>

              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-base text-white uppercase">
                    Diploma in Computer Engineering
                  </h3>
                  <div className="font-mono text-xs text-zinc-400 mt-0.5">
                    Govt Polytechnic College Kaduthuruthy · Kerala, India
                  </div>
                </div>
                <div className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 w-fit">
                  Class of 2024
                </div>
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-zinc-500">
              AVAILABLE FOR FULL-TIME / CONTRACT ROLES
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all"
              >
                CONTACT GOVIND
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
