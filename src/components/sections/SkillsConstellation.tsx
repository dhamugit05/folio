import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Database, CheckCircle2 } from 'lucide-react';
import { skillsData } from '../../data/portfolioData';

export const SkillsConstellation: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string>('React');

  return (
    <section className="my-12">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white">
          Technical Constellation
        </h2>
        <p className="text-sm font-mono text-slate-500 dark:text-slate-400 mt-1">
          Interactive skill clusters — click any tech badge to inspect implementation experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillsData.map((category, catIdx) => (
          <div
            key={category.title}
            className="p-6 rounded-2xl bg-white dark:bg-[#0C101D] border border-slate-200 dark:border-slate-800 shadow-xl transition-all"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                {catIdx === 0 && <Code2 className="w-5 h-5" />}
                {catIdx === 1 && <Server className="w-5 h-5" />}
                {catIdx === 2 && <Database className="w-5 h-5" />}
              </div>
              <h3 className="font-heading font-semibold text-slate-900 dark:text-white text-base">
                {category.title}
              </h3>
            </div>

            <div className="space-y-3">
              {category.skills.map((skill) => {
                const isSelected = activeSkill === skill.name;
                return (
                  <motion.button
                    type="button"
                    key={skill.name}
                    onClick={() => setActiveSkill(skill.name)}
                    whileHover={{ scale: 1.01 }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-500/10 dark:bg-cyan-500/15 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {skill.level}
                      </span>
                    </div>

                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 font-mono border-t border-slate-200 dark:border-slate-800 pt-2 flex items-start gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{skill.note}</span>
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
