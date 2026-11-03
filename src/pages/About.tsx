import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, Target, Compass, Code } from 'lucide-react';
import { SkillsConstellation } from '../components/sections/SkillsConstellation';
import { EducationExperience } from '../components/sections/EducationExperience';
import { AIWorkflowSection } from '../components/sections/AIWorkflowSection';
import { SkillsMarquee } from '../components/sections/SkillsMarquee';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const About: React.FC = () => {
  const { profile } = usePortfolioStore();

  return (
    <section id="about" className="min-h-screen max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      {/* Header Bio */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Technical Profile & Background
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white">
          About {profile.name}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
          Entry-level software engineer with a Bachelor of Computer Applications (BCA) foundation from Manonmaniyam Sundaranar University. Passionate about architecting scalable backend APIs with Python/Django and building accessible, fluid web applications with React and TypeScript.
        </p>
      </motion.div>

      {/* Recruiter Target Role Blurb */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-100/70 dark:bg-[#0E1324] border border-slate-200 dark:border-slate-800 shadow-xl mb-12">
        <div className="flex items-center gap-2.5 mb-4">
          <Target className="w-5 h-5 text-cyan-500" />
          <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
            What I'm Looking For & Professional Focus
          </h2>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          I am actively seeking an entry-level Full Stack / Frontend / Python-Django developer role where I can contribute to production systems, learn from seasoned engineers, write clean, documented code, and take ownership of end-to-end features.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-cyan-500 block mb-1">Growth & Curiosity</span>
            <span className="text-slate-600 dark:text-slate-300">
              Eager to absorb team practices, understand the business domain, and iterate rapidly.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-violet-500 block mb-1">Full-Stack Capability</span>
            <span className="text-slate-600 dark:text-slate-300">
              Seamlessly connect Django REST API viewsets, relational databases, and modern React interfaces.
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-emerald-500 block mb-1">Collaborative & Reliable</span>
            <span className="text-slate-600 dark:text-slate-300">
              Clear communicator, writes semantic HTML, adheres to version control etiquette and documentation.
            </span>
          </div>
        </div>
      </div>

      {/* Grouped Skills Constellation */}
      <SkillsConstellation />

      {/* Visual Continuity Skills Marquee */}
      <div className="my-10">
        <SkillsMarquee />
      </div>

      {/* Education & Experience Section */}
      <EducationExperience />

      {/* AI Interaction & Workflow Section */}
      <AIWorkflowSection />
    </section>
  );
};
