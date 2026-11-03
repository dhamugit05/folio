import React, { useState, useEffect } from 'react';
import { Sun, Moon, FileText, Menu, X, ArrowUpRight } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, profile, openResumeModal } = usePortfolioStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', target: 'home' },
    { label: 'Projects', target: 'projects' },
    { label: 'Skills & About', target: 'about' },
    { label: 'Contact', target: 'contact' },
  ];

  // Scroll listener to update active section indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'about', 'contact'];
      const scrollY = window.scrollY;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (targetId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 py-3.5 backdrop-blur-md bg-white/80 dark:bg-[#05060A]/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform text-sm font-mono">
            DS
          </div>
          <div>
            <span className="font-heading font-bold text-sm tracking-tight text-slate-900 dark:text-white block leading-tight">
              {profile.name}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-tight block">
              {profile.title}
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center bg-slate-100/90 dark:bg-[#0E1222] p-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-inner"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.target;
            return (
              <button
                key={link.target}
                type="button"
                onClick={() => scrollToSection(link.target)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-violet-600" />
            )}
          </button>

          {/* Resume Download / View */}
          {profile.resumeUrl && (
            <button
              type="button"
              onClick={openResumeModal}
              className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-950" />
              <span>Resume</span>
            </button>
          )}

          {/* Mobile Drawer Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-3 px-2 flex flex-col gap-2 border-t border-slate-200 dark:border-slate-800 mt-3 animate-in fade-in duration-200">
          {navLinks.map((link) => {
            const isActive = activeSection === link.target;
            return (
              <button
                key={link.target}
                type="button"
                onClick={() => scrollToSection(link.target)}
                className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between text-left ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 font-semibold border border-cyan-500/30'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
