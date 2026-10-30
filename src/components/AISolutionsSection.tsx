import React, { useState } from 'react';
import {
  Compass,
  Palette,
  HardHat,
  Calculator,
  Activity,
  Boxes,
  ArrowRight,
  CheckCircle,
  Sparkles,
  ChevronRight,
  FileText
} from 'lucide-react';

export const AISolutionsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const features = [
    {
      id: '01',
      title: 'AI Building Planner',
      subtitle: 'Spatial Layout & Site Optimization',
      icon: <Compass className="w-6 h-6 text-cyan-400" />,
      color: 'from-cyan-500 to-blue-600',
      description: 'Intelligent building planning based on plot dimensions, setback regulations, room density, and orientation to maximize natural sunlight and spatial efficiency.',
      capabilities: [
        'Plot dimension & orientation ingestion',
        'Setback & local building code compliance',
        'Dynamic room space optimization',
        'Smart zoning & circulation planning',
        'AI plot utility & driveway recommendations'
      ],
      metrics: { primary: '35%', label: 'Better Space Utilization' }
    },
    {
      id: '02',
      title: 'AI Architectural Designer',
      subtitle: 'Conceptual Design & 3D Previews',
      icon: <Palette className="w-6 h-6 text-violet-400" />,
      color: 'from-violet-500 to-purple-600',
      description: 'Generates conceptual architectural designs across diverse modern architectural styles, presenting interactive 2D floor plans and high-fidelity 3D building models.',
      capabilities: [
        'Multi-style generation (Modern, Parametric, Villa)',
        'Interactive 2D floor-plan schematic renderer',
        '3D elevation & exterior visualizer',
        'Interior space relationship mapping',
        'Instant style customization & iteration'
      ],
      metrics: { primary: '45+', label: 'Architectural Styles' }
    },
    {
      id: '03',
      title: 'AI Construction Intelligence',
      subtitle: 'Workflow & Phase Monitoring',
      icon: <HardHat className="w-6 h-6 text-gold-400" />,
      color: 'from-gold-500 to-amber-600',
      description: 'Streamlines construction workflow planning, phase tracking, equipment scheduling, and site risk monitoring to avoid delays and cost overruns.',
      capabilities: [
        'Phase-by-phase construction Gantt charts',
        'Equipment & site logistics planning',
        'Construction progress milestone tracking',
        'Material requirement time-phasing',
        'Site safety & delay risk prediction'
      ],
      metrics: { primary: '40%', label: 'Faster Execution Time' }
    },
    {
      id: '04',
      title: 'AI Cost Estimator',
      subtitle: 'Financial Planning & Itemized Reports',
      icon: <Calculator className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-500 to-teal-600',
      description: 'Computes highly accurate preliminary construction costs, itemizing materials, labor, equipment, permit estimates, and generating downloadable reports.',
      capabilities: [
        'Area-based & volumetric cost algorithms',
        'Live local material market price updates',
        'Labor cost calculation by skill grade',
        'Contingency & permit allowance modeling',
        'Exportable PDF & JSON cost breakdowns'
      ],
      metrics: { primary: '98.4%', label: 'Budget Precision' }
    },
    {
      id: '05',
      title: 'AI Structural Insights',
      subtitle: 'Load Analysis & Engineering Guidance',
      icon: <Activity className="w-6 h-6 text-royal-400" />,
      color: 'from-royal-500 to-indigo-600',
      description: 'Assists with preliminary structural load estimation, column grid visualization, and building component specifications for review by licensed civil engineers.',
      capabilities: [
        'Preliminary gravity & wind load estimates',
        'Structural column & beam grid layout',
        'Foundation load distribution guidance',
        'Component material specification',
        'Engineering review recommendations'
      ],
      metrics: { primary: '100%', label: 'Pre-Engineering Ready' }
    },
    {
      id: '06',
      title: 'AI Material Intelligence',
      subtitle: 'Resource Efficiency & Sustainability',
      icon: <Boxes className="w-6 h-6 text-pink-400" />,
      color: 'from-pink-500 to-rose-600',
      description: 'Provides itemized material comparisons, quantity calculations, sustainable material recommendations, and budget optimization options.',
      capabilities: [
        'Steel, concrete & glass quantity breakdown',
        'Eco-friendly & low-carbon material options',
        'Material durability & lifespan comparison',
        'Supplier availability & budget balancing',
        'Embodied carbon reduction score'
      ],
      metrics: { primary: '-25%', label: 'Embodied Carbon' }
    }
  ];

  return (
    <section id="solutions" className="py-24 relative overflow-hidden bg-navy-900/80">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>THE 6 CORE AI MODULES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            INTELLIGENT BUILDING <span className="gradient-text-cyan">SOLUTIONS</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            An end-to-end AI platform covering every phase of building planning, architectural rendering, structural insights, cost prediction, and site execution.
          </p>
        </div>

        {/* Feature Grid Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feat, idx) => (
            <div
              key={feat.id}
              onClick={() => setActiveTab(idx)}
              className={`glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                activeTab === idx
                  ? 'border-cyan-400 bg-slate-900/90 shadow-2xl shadow-cyan-500/20'
                  : 'hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-space font-extrabold text-slate-500 group-hover:text-cyan-400 font-mono">
                  {feat.id}
                </span>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  {feat.icon}
                </div>
              </div>

              <h3 className="text-xl font-space font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {feat.title}
              </h3>
              <p className="text-xs text-cyan-400/90 font-mono mb-3">
                {feat.subtitle}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                {feat.description}
              </p>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{feat.metrics.label}:</span>
                <span className="font-bold text-cyan-300">{feat.metrics.primary}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Module Detail Panel */}
        <div className="glass-panel-glow p-8 rounded-3xl border border-cyan-500/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-space font-extrabold text-cyan-400 font-mono">
                  {features[activeTab].id}
                </span>
                <div>
                  <h3 className="text-2xl font-space font-bold text-white">
                    {features[activeTab].title}
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono">
                    {features[activeTab].subtitle}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {features[activeTab].description}
              </p>

              <div className="space-y-2.5">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Core Module Capabilities:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {features[activeTab].capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-200">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#project-planner"
                  className="inline-flex items-center gap-2 btn-cyber-primary text-xs py-3"
                >
                  <span>Run {features[activeTab].title} in Workspace</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Metric Graphic Box */}
            <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-slate-400">MODULE STATUS</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ONLINE & ACTIVE
                </span>
              </div>

              <div className="text-center py-4 space-y-2">
                <div className="text-5xl font-space font-extrabold gradient-text-cyan">
                  {features[activeTab].metrics.primary}
                </div>
                <div className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                  {features[activeTab].metrics.label}
                </div>
              </div>

              {features[activeTab].id === '05' && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-[11px] text-amber-200 font-mono leading-relaxed">
                  <strong>Engineering Note:</strong> Structural outputs provide preliminary design assistance. Final structural calculations must be validated by a licensed professional civil engineer.
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>AI MODEL LATENCY: &lt;120ms</span>
                <span className="text-cyan-400">PRECISION: HIGH</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AISolutionsSection;
