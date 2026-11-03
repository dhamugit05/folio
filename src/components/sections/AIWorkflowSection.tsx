import React from 'react';
import { Sparkles, Terminal, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AIWorkflowSection: React.FC = () => {
  const cards = [
    {
      icon: Terminal,
      title: 'Structured Prompt Engineering',
      desc: 'Writing clear, deterministic prompts to accelerate repetitive scaffolding, unit test boilerplate, and debugging hypotheses.',
    },
    {
      icon: Cpu,
      title: 'AI-Assisted Development',
      desc: 'Using modern AI tools for rapid prototyping and architecture code reviews, while critically reading, benchmarking, and testing every line before shipping.',
    },
    {
      icon: Sparkles,
      title: 'API Integration (Google GenAI)',
      desc: 'Implemented an automated watch advisory query feature in the Horolo showcase using the Google GenAI SDK with structured response handling.',
      isProof: true,
    },
    {
      icon: ShieldCheck,
      title: 'Responsible Engineering & Safety',
      desc: 'Strictly guarding secrets through server proxy layers / environment variables, sanitizing user inputs, and cross-checking against official language specifications.',
    },
  ];

  return (
    <section className="my-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-violet-950/20 via-slate-900/40 to-cyan-950/20 border border-violet-500/20 shadow-2xl">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 font-mono text-xs mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Modern Development Practices
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white">
          AI Workflow & Thoughtful Integration
        </h2>
        <p className="text-sm font-mono text-slate-600 dark:text-slate-400 mt-2">
          An honest, pragmatic perspective on integrating AI into everyday software development.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="p-5 rounded-2xl bg-white/80 dark:bg-[#0B0E1B] border border-slate-200 dark:border-slate-800/80 hover:border-violet-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-semibold text-slate-900 dark:text-white text-sm mb-1.5">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {card.isProof && (
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <Link
                    to="/projects"
                    className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    <span>View in Horolo Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
