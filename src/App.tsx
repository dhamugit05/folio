import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { CustomCursor } from './components/ui/CustomCursor';
import { ProjectModal } from './components/ui/ProjectModal';
import { ResumeModal } from './components/ui/ResumeModal';
import { Toast } from './components/ui/Toast';
import { SceneBackground } from './components/canvas/SceneBackground';

import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

export default function App() {
  const location = useLocation();

  // Scroll to targeted section if URL has hash or matching route
  useEffect(() => {
    let targetId = '';
    if (location.hash) {
      targetId = location.hash.replace('#', '');
    } else if (location.pathname === '/projects') {
      targetId = 'projects';
    } else if (location.pathname === '/about') {
      targetId = 'about';
    } else if (location.pathname === '/contact') {
      targetId = 'contact';
    }

    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="relative flex flex-col min-h-screen text-slate-900 dark:text-slate-100 transition-colors">
      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] px-4 py-2 bg-cyan-400 text-slate-950 font-bold rounded-lg shadow-lg font-mono text-xs"
      >
        Skip to main content
      </a>

      {/* Dynamic Custom Cursor */}
      <CustomCursor />

      {/* Persistent 3D Interactive Background */}
      <SceneBackground />

      {/* Sticky Header Navbar */}
      <Navbar />

      {/* 4 Seamlessly Scrollable Sections */}
      <main id="main-content" className="flex-grow z-10 flex flex-col space-y-16 sm:space-y-24 pb-16">
        <Home />
        <Projects />
        <About />
        <Contact />
      </main>

      {/* Global Modals & Notifications */}
      <ProjectModal />
      <ResumeModal />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}
