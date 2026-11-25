import { useState, useEffect } from 'react';
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
import { CommandPalette } from './components/CommandPalette';
import { CustomCursor } from './components/CustomCursor';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { projects } from './data/projects';

function getProjectIdFromHash(): string | null {
  const hash = window.location.hash;
  const match = hash.match(/^#\/project\/([^/?#]+)/);
  if (match) {
    const found = projects.find((p) => p.id === match[1]);
    return found ? found.id : null;
  }
  return null;
}

export function App() {
  // Initialize Lenis smooth scroll for natural inertia scrolling across all pages
  useLenis();

  // Route state derived from URL hash
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(getProjectIdFromHash());

  // Modal states
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Synchronize route with browser hash and history (Supports Back/Forward browser buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const pid = getProjectIdFromHash();
      setCurrentProjectId(pid);

      if (!pid && window.location.hash === '#projects') {
        setTimeout(() => {
          const el = document.getElementById('projects');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToProject = (id: string) => {
    window.location.hash = `#/project/${id}`;
  };

  const handleBackToPortfolio = () => {
    window.location.hash = '#projects';
    setCurrentProjectId(null);
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] relative bg-grain selection:bg-white selection:text-black">
      {/* Magnetic Smooth Cursor (Desktop) */}
      <CustomCursor />

      {/* RENDER DEDICATED FULL-PAGE CASE STUDY IF PROJECT ROUTE ACTIVE */}
      {currentProjectId ? (
        <ProjectDetailPage
          projectId={currentProjectId}
          onBack={handleBackToPortfolio}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onSelectProject={(id) => navigateToProject(id)}
        />
      ) : (
        /* RENDER MAIN HOMEPAGE SECTIONS */
        <>
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

            {/* 04: Professional Experience (ByteBoot Techno Solutions & Education) */}
            <Experience />

            {/* 05: Production Projects (BookMyCuts, Coffy Byte, OlaCars) */}
            <Projects
              onSelectProject={(project) => navigateToProject(project.id)}
            />

            {/* 06: Technical Stack (High-Contrast Inverted White Card Section) */}
            <TechStackSection />
          </main>

          {/* 07: Editorial Footer */}
          <Footer
            onOpenContact={() => setIsContactOpen(true)}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        </>
      )}

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
