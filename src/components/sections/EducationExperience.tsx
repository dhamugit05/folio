import React from 'react';
import { GraduationCap, Award, Briefcase, CheckCircle2 } from 'lucide-react';

export const EducationExperience: React.FC = () => {
  return (
    <section className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Education Timeline */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0C101D] border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Education
            </h2>
            <p className="text-xs font-mono text-slate-500">Degree & Affiliation</p>
          </div>
        </div>

        <div className="relative pl-6 border-l-2 border-cyan-500/40 space-y-6">
          <div className="relative">
            <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-400 ring-4 ring-cyan-500/20" />
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 inline-block mb-1">
              2023 – 2026
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Bachelor of Computer Applications (BCA)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-0.5">
              Govt. Arts and Science College, Kanniyakumari
            </p>
            <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono mt-0.5">
              Affiliated with Manonmaniyam Sundaranar University
            </p>
            <div className="mt-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                Relevant Coursework:
              </span>
              Data Structures and Algorithms, Database Management Systems (SQL), Web Technologies, Object-Oriented Programming with Python.
            </div>
          </div>
        </div>
      </div>

      {/* Experience & Certifications */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0C101D] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Experience & Training
              </h2>
              <p className="text-xs font-mono text-slate-500">Hands-on internship and certified skill programs</p>
            </div>
          </div>

          {/* Internship */}
          <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  CODEC Technologies
                </h3>
                <p className="text-xs text-violet-600 dark:text-violet-400 font-mono">
                  Remote & App Development Intern
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                Sept 2026 – Oct 2026
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Developed and maintained responsive web and mobile application interfaces using React.js, JavaScript, and modern frontend workflows. Designed reusable UI components and integrated RESTful APIs.
            </p>
          </div>

          {/* Certifications list */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2.5">
              <Award className="w-3.5 h-3.5 text-cyan-500" />
              Verified Certifications
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
              <li className="flex items-center justify-between p-2 rounded-lg bg-slate-100/70 dark:bg-slate-900/40">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" /> Python Full Stack Development
                </span>
                <span className="text-slate-500 text-[10px]">Besant Inst. (2026)</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-slate-100/70 dark:bg-slate-900/40">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" /> Responsive Web Design
                </span>
                <span className="text-slate-500 text-[10px]">freeCodeCamp (2026)</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-lg bg-slate-100/70 dark:bg-slate-900/40">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" /> Python Coding Foundations
                </span>
                <span className="text-slate-500 text-[10px]">Infosys Springboard (2025)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
