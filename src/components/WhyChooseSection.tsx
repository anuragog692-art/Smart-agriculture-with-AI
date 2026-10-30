import React from 'react';
import { ShieldCheck, Zap, Sparkles, Check, X } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const comparison = [
    {
      feature: 'Initial Architectural Layout Generation',
      aiPower: 'Seconds (3D BIM + 2D Floor Plans)',
      traditional: '2 to 4 Weeks Manual Drafting',
    },
    {
      feature: 'Material & Cost Estimation Precision',
      aiPower: '98.6% Accuracy with Live Market Pricing',
      traditional: 'Rough Manual Spreadsheets (±25% Error)',
    },
    {
      feature: 'Interactive 3D Visual Experience',
      aiPower: 'Real-time Browser Three.js Orbit & Exploded Views',
      traditional: 'Static Render Images or Extra $5K Fee',
    },
    {
      feature: 'Structural & Code Compliance Pre-Audit',
      aiPower: 'Automated Neural Setback & Code Audit',
      traditional: 'Manual Architectural Review Cycles',
    },
    {
      feature: 'Material Waste & Carbon Reduction',
      aiPower: '28% Optimized BOM Reduction',
      traditional: 'High On-Site Material Overordering',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-navy-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>PLATFORM ADVANTAGES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            WHY CHOOSE <span className="gradient-text-cyan">AI POWER</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            See how AI POWER compares against legacy, traditional architectural firm workflows and manual construction estimation.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="glass-panel-glow rounded-3xl border border-cyan-500/30 p-6 sm:p-8 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-4 px-4 w-1/3 text-sm font-space font-bold text-white">CAPABILITY / METRIC</th>
                <th className="py-4 px-4 w-1/3 text-sm font-space font-bold text-cyan-400 bg-cyan-950/40 rounded-t-xl">
                  AI POWER PLATFORM
                </th>
                <th className="py-4 px-4 w-1/3 text-sm font-space font-bold text-slate-500">
                  TRADITIONAL METHODS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {comparison.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-200">{item.feature}</td>
                  <td className="py-4 px-4 bg-cyan-950/20 text-cyan-300 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item.aiPower}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{item.traditional}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseSection;
