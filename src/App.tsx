import { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeShowcase } from './components/MarqueeShowcase';
import { BentoAbout } from './components/BentoAbout';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { TechStackSection } from './components/TechStackSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ResumeModal } from './components/ResumeModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { CommandPalette } from './components/CommandPalette';
import { CustomCursor } from './components/CustomCursor';
import type { Project } from './data/projects';

export function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  // Modal states
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] relative bg-grain selection:bg-white selection:text-black">
      {/* Magnetic Smooth Cursor (Desktop) */}
      <CustomCursor />

      {/* Floating Navbar (Top on Desktop, Bottom Thumb-Zone on Mobile) */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        onOpenCommand={() => setIsCommandOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 01: Hero with 3D Centerpiece */}
        <Hero
          onOpenContact={() => setIsContactOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 02: Counter-Rotating Marquee Tickers with Real Skills */}
        <MarqueeShowcase />

        {/* 03: Bento Grid About & Engineering Philosophy */}
        <BentoAbout />

        {/* 04: Professional Experience (ByteBoot Techno Solutions) */}
        <Experience />

        {/* 05: Production Projects (BookMyCuts, Coffy Byte, OlaCars) */}
        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 06: Technical Stack (High-Contrast Inverted White Card Section) */}
        <TechStackSection />
      </main>

      {/* 07: Editorial Footer */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Direct Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Curriculum Vitae / Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Deep-Dive Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Quick Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />
    </div>
  );
}

export default App;
