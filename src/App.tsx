import { useEffect, useState } from 'react';
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
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { CommandPalette } from './components/CommandPalette';
import { CustomCursor } from './components/CustomCursor';
import { projects, type Project } from './data/projects';

const DEFAULT_TITLE = 'Govind Jayakumar ✦ Node.js & MERN Stack Developer';

function getProjectFromUrl(): Project | null {
  if (typeof window === 'undefined') return null;

  const hashMatch = window.location.hash.match(/^#\/?projects\/([^/?#]+)/);
  if (hashMatch) {
    return projects.find((p) => p.id === hashMatch[1]) ?? null;
  }

  const pathMatch = window.location.pathname.match(/\/projects\/([^/?#]+)/);
  if (pathMatch) {
    return projects.find((p) => p.id === pathMatch[1]) ?? null;
  }

  return null;
}

function scrollPageTo(target: number | string, immediate = false) {
  const lenis = (window as unknown as {
    lenis?: { scrollTo: (target: number | string | HTMLElement, options?: { immediate?: boolean }) => void };
  }).lenis;

  if (typeof target === 'number') {
    if (lenis) {
      lenis.scrollTo(target, { immediate });
    } else {
      window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
    }
    return;
  }

  const el = document.getElementById(target);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { immediate });
  } else {
    el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
  }
}

export function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  // Modal states
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(() => getProjectFromUrl());

  // Sync browser back/forward & hash changes
  useEffect(() => {
    const syncFromUrl = () => {
      const matched = getProjectFromUrl();
      setSelectedProject(matched);
      if (matched) {
        requestAnimationFrame(() => scrollPageTo(0, true));
      }
    };

    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, []);

  // Update document title when switching pages
  useEffect(() => {
    document.title = selectedProject
      ? `${selectedProject.title} — Case Study | Govind Jayakumar`
      : DEFAULT_TITLE;
  }, [selectedProject]);

  const handleSelectProject = (project: Project) => {
    const targetHash = `#/projects/${project.id}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState({ projectId: project.id }, '', targetHash);
    }
    setSelectedProject(project);
    requestAnimationFrame(() => scrollPageTo(0, true));
  };

  const handleNavigateSection = (sectionId: string) => {
    const wasOnProjectPage = selectedProject !== null;

    if (wasOnProjectPage) {
      const baseUrl = window.location.pathname.includes('/projects/')
        ? '/'
        : `${window.location.pathname}${window.location.search}`;
      window.history.pushState(null, '', baseUrl);
      setSelectedProject(null);

      setTimeout(() => {
        if (sectionId === 'top') {
          scrollPageTo(0, false);
        } else {
          scrollPageTo(sectionId, false);
        }
      }, 60);
      return;
    }

    if (sectionId === 'top') {
      scrollPageTo(0, false);
    } else {
      scrollPageTo(sectionId, false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] relative bg-grain selection:bg-white selection:text-black overflow-x-clip">
      {/* Magnetic Smooth Cursor (Desktop) */}
      <CustomCursor />

      {/* Floating Navbar (Home Page Only — ProjectDetailPage has its own dedicated top header) */}
      {!selectedProject && (
        <Navbar
          onOpenContact={() => setIsContactOpen(true)}
          onOpenCommand={() => setIsCommandOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          isProjectPage={false}
          onNavigateSection={handleNavigateSection}
        />
      )}

      {/* Main Content Sections or Dedicated Project Case Study Page */}
      <main>
        {selectedProject ? (
          <ProjectDetailPage
            project={selectedProject}
            onBack={() => handleNavigateSection('projects')}
            onSelectProject={handleSelectProject}
            onOpenContact={() => setIsContactOpen(true)}
          />
        ) : (
          <>
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
            <Projects onSelectProject={handleSelectProject} />

            {/* 06: Technical Stack (High-Contrast Inverted White Card Section) */}
            <TechStackSection />
          </>
        )}
      </main>

      {/* 07: Editorial Footer */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onNavigateSection={handleNavigateSection}
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

      {/* Quick Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onSelectProject={handleSelectProject}
        onNavigateSection={handleNavigateSection}
      />
    </div>
  );
}

export default App;
