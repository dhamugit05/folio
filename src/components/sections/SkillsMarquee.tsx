import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const marqueeTech = [
  'Python',
  'JavaScript (ES6+)',
  'TypeScript',
  'React.js',
  'Django',
  'Django REST Framework',
  'SQL / MySQL',
  'Tailwind CSS',
  'Three.js / WebGL',
  'Git Bash & GitHub',
  'REST APIs & JWT',
  'Google GenAI API',
];

export const SkillsMarquee: React.FC = () => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className="py-6 px-4 max-w-7xl mx-auto flex flex-wrap justify-center gap-3">
        {marqueeTech.map((tech) => (
          <span
            key={tech}
            className="px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-800 text-xs font-mono bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden py-4 border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-950/40 backdrop-blur-sm group select-none"
      aria-label="Technologies Marquee"
    >
      <div className="flex w-max animate-marquee-left group-hover:[animation-play-state:paused]">
        {/* Track 1 */}
        <div className="flex items-center gap-8 px-4">
          {marqueeTech.map((tech, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-colors">
                {tech}
              </span>
            </div>
          ))}
        </div>
        {/* Track 2 (Duplicate for seamless continuous loop) */}
        <div className="flex items-center gap-8 px-4" aria-hidden="true">
          {marqueeTech.map((tech, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-colors">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
