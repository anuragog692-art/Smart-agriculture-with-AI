import React from 'react';
import { Sliders, Cpu, Box, FileSpreadsheet, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Site & Requirements Input',
      icon: <Sliders className="w-6 h-6 text-cyan-400" />,
      description: 'Enter your plot length, width, building style, room counts, location, and budget constraints into the interactive project workspace.',
      detail: 'Supports any plot shape and local setback guidelines.',
    },
    {
      num: '02',
      title: 'Neural Spatial Synthesis',
      icon: <Cpu className="w-6 h-6 text-violet-400" />,
      description: 'Our deep learning spatial models generate mathematically optimized 2D layout schematics and room distribution vectors.',
      detail: 'Calculates daylight angles and circulation paths.',
    },
    {
      num: '03',
      title: '3D BIM Model Synthesis',
      icon: <Box className="w-6 h-6 text-royal-400" />,
      description: 'Generates interactive 3D renderings, structural column grids, floor slabs, and exterior elevations in real time.',
      detail: 'Fully orbitable 3D models directly in browser.',
    },
    {
      num: '04',
      title: 'Execution & Material Intelligence',
      icon: <FileSpreadsheet className="w-6 h-6 text-emerald-400" />,
      description: 'Receive itemized material lists, preliminary cost breakdowns, construction timelines, and downloadable reports.',
      detail: 'Ready for client review and engineering audit.',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-navy-900/60 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <span>AUTOMATED WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            HOW <span className="gradient-text-cyan">AI BUILDING PLANNING</span> WORKS
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From raw plot dimensions to complete 3D architectural models and material estimates in 4 seamless steps.
          </p>
        </div>

        {/* Steps Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 relative group hover:border-cyan-500/40">
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-space font-extrabold text-slate-600 group-hover:text-cyan-400 font-mono">
                  {step.num}
                </span>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-lg font-space font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {step.description}
              </p>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-1.5 text-[11px] text-cyan-300 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{step.detail}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
