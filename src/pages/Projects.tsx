import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  List,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Info,
  Sparkles,
} from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { filterProjectsByCategory, isRealUrl } from '../lib/portfolioUtils';
import { ProjectItem } from '../types';

export const Projects: React.FC = () => {
  const {
    projects,
    openProjectModal,
    setCursor,
    projectsViewMode,
    setProjectsViewMode,
  } = usePortfolioStore();

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const categories = ['All', 'Frontend', 'Full Stack', '3D & AI'];
  const filteredProjects = filterProjectsByCategory(projects, activeFilter);

  // Keyboard navigation for carousel
  useEffect(() => {
    if (projectsViewMode !== 'slides') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveSlide((prev) => (prev + 1) % filteredProjects.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveSlide((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projectsViewMode, filteredProjects.length]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const currentProject: ProjectItem | undefined = filteredProjects[activeSlide];

  return (
    <section id="projects" className="min-h-screen max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* Page Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Portfolio Projects
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white">
            Featured Work
          </h1>
          <p className="text-sm font-mono text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
            Live web applications, 3D interactive experiences, and full-stack REST API architectures.
          </p>
        </div>

        {/* View Toggle (Slides vs List) & Category Chips */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Toggle */}
          <div
            role="group"
            aria-label="Project view mode"
            className="flex bg-slate-200 dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-800"
          >
            <button
              type="button"
              onClick={() => setProjectsViewMode('slides')}
              aria-pressed={projectsViewMode === 'slides'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                projectsViewMode === 'slides'
                  ? 'bg-white dark:bg-cyan-500/20 text-slate-950 dark:text-cyan-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Slides</span>
            </button>
            <button
              type="button"
              onClick={() => setProjectsViewMode('list')}
              aria-pressed={projectsViewMode === 'list'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                projectsViewMode === 'list'
                  ? 'bg-white dark:bg-cyan-500/20 text-slate-950 dark:text-cyan-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-1.5" role="toolbar" aria-label="Category filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveFilter(cat);
                  setActiveSlide(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeFilter === cat
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View 1: 3D Floating Carousel View */}
      {projectsViewMode === 'slides' && filteredProjects.length > 0 && currentProject && (
        <div className="relative py-6">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -15 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl bg-white dark:bg-[#0E1324] border border-slate-200 dark:border-cyan-500/30 shadow-2xl p-6 sm:p-10 relative overflow-hidden"
              >
                {/* Header Category and Case Study trigger */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                    {currentProject.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => openProjectModal(currentProject)}
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
                  >
                    <Info className="w-4 h-4" />
                    <span>View Case Study</span>
                  </button>
                </div>

                <h2 className="text-2xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-2">
                  {currentProject.title}
                </h2>
                <p className="text-xs sm:text-sm font-mono text-cyan-600 dark:text-cyan-400 mb-4 font-medium">
                  {currentProject.subtitle}
                </p>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {currentProject.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live Demo and Repository Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  {isRealUrl(currentProject.liveUrl) && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-cyan-500/20 transition-all hover:-translate-y-0.5"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}

                  {isRealUrl(currentProject.githubUrl) && (
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub Repo</span>
                    </a>
                  )}

                  {!isRealUrl(currentProject.liveUrl) && !isRealUrl(currentProject.githubUrl) && (
                    <span className="text-xs font-mono text-slate-500">
                      Local Development Workspace
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation Buttons & Dots */}
            <div className="flex items-center justify-between mt-6 px-4">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous project slide"
                className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-slate-700 dark:text-slate-300 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2" role="tablist" aria-label="Slides indicator">
                {filteredProjects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}: ${proj.title}`}
                    className={`h-2.5 rounded-full transition-all ${
                      activeSlide === idx
                        ? 'w-8 bg-cyan-400'
                        : 'w-2.5 bg-slate-300 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next project slide"
                className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-slate-700 dark:text-slate-300 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Stacked List View */}
      {projectsViewMode === 'list' && (
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1222] border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 shadow-xl transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="w-max px-3 py-0.5 rounded-full text-[11px] font-mono bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/30">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                    ★ Featured
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-white mb-1">
                {project.title}
              </h2>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                {project.subtitle}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-5 max-w-3xl leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                {isRealUrl(project.liveUrl) && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
                {isRealUrl(project.githubUrl) && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs border border-slate-300 dark:border-slate-700 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repo</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => openProjectModal(project)}
                  className="ml-auto text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Case Study</span>
                  <span>→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};
