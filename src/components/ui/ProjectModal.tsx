import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, Cpu, Award } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { isRealUrl } from '../../lib/portfolioUtils';

export const ProjectModal: React.FC = () => {
  const { activeProjectModal, closeProjectModal } = usePortfolioStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProjectModal();
      }
    };
    if (activeProjectModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeProjectModal, closeProjectModal]);

  if (!activeProjectModal) return null;

  const { title, subtitle, description, tags, liveUrl, githubUrl, caseStudy, category } =
    activeProjectModal;

  const hasLiveUrl = isRealUrl(liveUrl);
  const hasGithubUrl = isRealUrl(githubUrl);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProjectModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0B0F1C] border border-slate-300 dark:border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto z-10"
        >
          {/* Header Badges & Close Button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                {category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/30">
                Case Study
              </span>
            </div>
            <button
              onClick={closeProjectModal}
              aria-label="Close dialog"
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Overview */}
          <h2 id="modal-title" className="text-2xl sm:text-3xl font-heading font-bold mb-1">
            {title}
          </h2>
          <p className="text-sm font-mono text-cyan-600 dark:text-cyan-400 mb-4">{subtitle}</p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            {description}
          </div>

          {/* Case Study Breakdown Blocks */}
          {caseStudy && (
            <div className="space-y-4 mb-6">
              {/* Problem Block */}
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-300 dark:border-rose-500/30">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-rose-600 dark:text-rose-400 uppercase mb-1.5">
                  <Layers className="w-4 h-4" />
                  Problem & Challenge
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>

              {/* Architecture Block */}
              <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-300 dark:border-cyan-500/30">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-cyan-700 dark:text-cyan-300 uppercase mb-1.5">
                  <Cpu className="w-4 h-4" />
                  Architecture & Engineering
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {caseStudy.architecture}
                </p>
              </div>

              {/* Results Block */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/30">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-emerald-700 dark:text-emerald-400 uppercase mb-1.5">
                  <Award className="w-4 h-4" />
                  Impact & Key Results
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {caseStudy.impact}
                </p>
              </div>
            </div>
          )}

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            {hasLiveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
            {hasGithubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 text-xs font-semibold transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                Repository
              </a>
            )}
            {!hasLiveUrl && !hasGithubUrl && (
              <span className="text-xs font-mono text-slate-500 italic">
                Backend API / Local development repository
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
