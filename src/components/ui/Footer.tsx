import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export const Footer: React.FC = () => {
  const { profile } = usePortfolioStore();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#05060A]/70 backdrop-blur-md py-8 px-4 sm:px-8 transition-colors mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left copyright */}
        <div className="text-center md:text-left">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            © {currentYear} <span className="text-slate-900 dark:text-white font-semibold">{profile.name}</span>. All copyrights reserved.
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-500 font-mono mt-0.5">
            Entry-Level Software Developer • Chennai, India
          </p>
        </div>

        {/* Quick Social & Top Buttons */}
        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Send Email"
            className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20 transition-colors ml-1"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
