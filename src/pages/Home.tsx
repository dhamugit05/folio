import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Send,
  Copy,
  Check,
  Github,
  Linkedin,
  FileText,
  MapPin,
  Code,
  Terminal,
  Database,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { useTypewriter } from '../hooks/useTypewriter';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { HeroVisual3D } from '../components/canvas/HeroVisual3D';
import { SkillsMarquee } from '../components/sections/SkillsMarquee';

export const Home: React.FC = () => {
  const { profile, showToast, setCursor, openResumeModal } = usePortfolioStore();
  const typewriterText = useTypewriter(profile.specializations, 80, 40, 1800);
  const parallax = useMouseParallax(16);
  const [photoError, setPhotoError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    showToast('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToStats = () => {
    const statsEl = document.getElementById('quick-stats');
    if (statsEl) {
      statsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <section id="home" className="min-h-screen pt-4">
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-14 sm:py-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Left Column: Headline & Pitch */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 max-w-2xl z-10"
        >
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#0E1324] border border-slate-300 dark:border-slate-800 text-xs font-mono mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-800 dark:text-slate-200 font-medium">Open to work</span>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-semibold">
              <MapPin className="w-3 h-3" /> {profile.location}
            </span>
          </div>

          {/* Large Gradient Headline */}
          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight leading-[1.1] mb-3 text-slate-900 dark:text-white">
            Hi, I’m{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
              {profile.name}
            </span>
            ,
            <span className="block text-2xl sm:text-4xl font-bold text-slate-700 dark:text-slate-300 mt-1">
              an {profile.title}.
            </span>
          </h1>

          {/* Cycling Specialization Typewriter */}
          <div className="h-9 flex items-center font-mono text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6">
            <span className="text-cyan-500 mr-2 font-bold">&gt;_</span>
            <span>Focus:&nbsp;</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-bold tracking-wide border-b-2 border-cyan-400/40">
              {typewriterText}
            </span>
            <span className="animate-pulse ml-0.5 text-cyan-400">|</span>
          </div>

          {/* Recruiter One-Line Value Pitch */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            {profile.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              onMouseEnter={() => setCursor({ variant: 'hover', text: 'Work' })}
              onMouseLeave={() => setCursor({ variant: 'default' })}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
            >
              <span>Explore Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:border-violet-500 hover:-translate-y-0.5 transition-all"
            >
              <Send className="w-4 h-4 text-violet-500" />
              <span>Get in Touch</span>
            </button>

            <button
              onClick={handleCopyEmail}
              aria-label="Copy Email Address"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs hover:border-cyan-400 transition-all"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4 text-cyan-500" />
              )}
              <span>{copied ? 'Copied' : 'Copy Email'}</span>
            </button>
          </div>

          {/* Social Row */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800/80">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span>•</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span>•</span>
            {profile.resumeUrl && (
              <button
                type="button"
                onClick={openResumeModal}
                className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Resume (PDF)</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Right Column: Stylized Avatar Frame with 3D Canvas Mesh & Floating Tech Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative flex-1 flex justify-center items-center w-full max-w-md lg:max-w-lg"
          style={{
            transform: `translate3d(${parallax.x * 0.35}px, ${parallax.y * 0.35}px, 0)`,
          }}
        >
          {/* Low-poly 3D artifact behind avatar */}
          <HeroVisual3D />

          {/* Outer glowing frame */}
          <div className="relative p-1 rounded-3xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-violet-600 shadow-2xl shadow-cyan-500/20 group">
            {/* Floating Top-Left Tech Badge */}
            <div className="absolute -top-3.5 -left-3.5 z-20 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-cyan-400/60 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5 shadow-lg">
              <Code className="w-3.5 h-3.5" /> React • TS
            </div>

            {/* Floating Bottom-Right Tech Badge */}
            <div className="absolute -bottom-3.5 -right-3.5 z-20 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-violet-400/60 text-[11px] font-mono text-violet-600 dark:text-violet-400 flex items-center gap-1.5 shadow-lg">
              <Terminal className="w-3.5 h-3.5" /> Python • Django
            </div>

            {/* Floating Side Badge */}
            <div className="absolute top-1/2 -right-5 -translate-y-1/2 z-20 hidden sm:flex px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-emerald-400/60 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 items-center gap-1 shadow-md">
              <Database className="w-3 h-3" /> SQL
            </div>

            {/* Photo / Fallback Avatar Container */}
            <div className="relative w-64 h-72 sm:w-80 sm:h-96 rounded-[22px] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {!photoError ? (
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  onError={() => setPhotoError(true)}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                /* Clean Stylized Avatar with initials "DS" */
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white p-6 text-center select-none">
                  <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-heading font-extrabold text-2xl text-cyan-400 mb-3 shadow-lg">
                    DS
                  </div>
                  <h2 className="font-heading font-bold text-lg">{profile.name}</h2>
                  <p className="text-xs font-mono text-cyan-400 mt-1">{profile.title}</p>
                  <p className="text-[11px] font-mono text-slate-400 mt-2">BCA Graduate • Chennai</p>
                </div>
              )}

              {/* Bottom glass overlay inside photo */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between text-[11px] font-mono text-white">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {profile.name}
                </span>
                <span className="text-slate-300">BCA 2026</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Cue Indicator */}
      <div className="flex justify-center -mt-4 mb-4">
        <button
          onClick={scrollToStats}
          aria-label="Scroll down to quick overview stats"
          className="flex flex-col items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <span>Explore Overview</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>

      {/* Infinite Skills Marquee Strip */}
      <SkillsMarquee />

      {/* Quick Stats Row (True Facts Only) */}
      <section id="quick-stats" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1222] border border-slate-200 dark:border-slate-800 text-center shadow-md">
            <div className="text-3xl font-heading font-extrabold text-cyan-500">3+</div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
              Engineered Web Projects
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1222] border border-slate-200 dark:border-slate-800 text-center shadow-md">
            <div className="text-3xl font-heading font-extrabold text-violet-500">Python • JS • TS</div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
              Core Languages
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1222] border border-slate-200 dark:border-slate-800 text-center shadow-md">
            <div className="text-3xl font-heading font-extrabold text-emerald-500">BCA Graduate</div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
              Manonmaniyam Sundaranar Univ.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1222] border border-slate-200 dark:border-slate-800 text-center shadow-md">
            <div className="text-3xl font-heading font-extrabold text-pink-500">Full Stack</div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
              Django REST + React UIs
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
