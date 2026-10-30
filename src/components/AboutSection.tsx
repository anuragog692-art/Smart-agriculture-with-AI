import React from 'react';
import { Cpu, Layers, Brain, CheckCircle2, Shield, Zap, Sparkles, TrendingUp } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: <Brain className="w-6 h-6 text-cyan-400" />,
      title: 'Generative Spatial Synthesis',
      description: 'Generates mathematically optimized spatial layouts based on plot geometry, sunlight trajectories, local building codes, and client lifestyle requirements.',
      badge: 'NEURAL CORE v4.2',
    },
    {
      icon: <Layers className="w-6 h-6 text-violet-400" />,
      title: 'Automated 3D BIM Modeling',
      description: 'Converts conceptual blueprints into rich 3D Building Information Models (BIM) with real-time structural load and material spatial mapping.',
      badge: '3D BIM ENGINE',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
      title: 'Predictive Construction Analytics',
      description: 'Calculates real-time material requirements, labor overheads, supply chain lead times, and phase-by-phase project schedules with 98%+ precision.',
      badge: 'COST INTELLIGENCE',
    },
    {
      icon: <Shield className="w-6 h-6 text-gold-400" />,
      title: 'Structural Safety Guidance',
      description: 'Provides preliminary structural load analysis, seismic coefficient checks, and safety recommendations prior to licensed civil engineer review.',
      badge: 'STRUCTURAL INSIGHTS',
    },
  ];

  const stats = [
    { label: 'Faster Project Planning', value: '10x', detail: 'From weeks to minutes' },
    { label: 'Material Waste Reduction', value: '28%', detail: 'Optimized bill of materials' },
    { label: 'Global Building Styles Supported', value: '45+', detail: 'From Minimalist to Parametric' },
    { label: 'Cost Calculation Accuracy', value: '98.6%', detail: 'Benchmarked with real sites' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-navy-950/60 border-t border-slate-800/80">
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-violet-500/30 text-violet-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-violet-400" />
            <span>THE NEXT EVOLUTION IN ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            REDEFINING BUILDING PLANNING WITH <span className="gradient-text-cyan">INTELLIGENT AI</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            AI POWER bridges the gap between conceptual architectural vision and executable civil engineering. We replace manual trial-and-error with high-dimensional spatial neural networks.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 relative group hover:border-cyan-500/40">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                  {pillar.icon}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {pillar.badge}
                </span>
              </div>
              <h3 className="text-lg font-space font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Platform Architecture Diagram Visual Box */}
        <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-cyan-500/30 relative mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Sparkles className="w-4 h-4" />
                <span>INTELLIGENT ARCHITECTURE ENGINE ARCHITECTURE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-space font-bold text-white">
                How AI POWER Synthesizes Architectural Blueprint Intelligence
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our platform ingests plot parameters, setback rules, sunlight vectors, and user space preferences into our neural architecture model. In seconds, it generates balanced floorplan geometries, structural spatial frames, material estimations, and 3D interactive BIM models.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Automatic Setback & Zoning Check',
                  'Sunlight & Daylight Optimization',
                  'Structural Column Placement Grid',
                  'Real-Time Material Quantity BOM',
                  'Parametric Architectural Renderings',
                  'Exportable Construction PDF Reports'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Specs Terminal */}
            <div className="lg:col-span-5 bg-navy-950 rounded-2xl p-5 border border-slate-800 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
                <span className="text-cyan-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  NEURAL_ENGINE_STATUS
                </span>
                <span className="text-[10px]">v4.8.0-PROD</span>
              </div>
              <div className="space-y-1.5 text-slate-300">
                <div className="text-purple-400">&gt; INITIALIZING SPATIAL SYNTHESIS...</div>
                <div className="text-slate-400">&gt; Loading plot bounds: 40ft x 60ft [2,400 sq.ft]</div>
                <div className="text-cyan-300">&gt; Computing floor height: G+2 Residential</div>
                <div className="text-emerald-400">&gt; Optimizing room distribution: 4 Bedrooms</div>
                <div className="text-gold-400">&gt; Generating 3D structural mesh... Done (0.42s)</div>
                <div className="text-cyan-400">&gt; Cost calculation ready: $142,500 preliminary</div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                <span>LATENCY: 42ms</span>
                <span className="text-cyan-400">STATUS: OPTIMAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="glass-panel p-6 text-center rounded-2xl border border-slate-800">
              <div className="text-3xl sm:text-4xl font-space font-extrabold gradient-text-cyan mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-white mb-0.5">{stat.label}</div>
              <div className="text-[11px] text-slate-400 font-mono">{stat.detail}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
