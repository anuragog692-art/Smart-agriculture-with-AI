import React, { useState } from 'react';
import { ArrowRight, Sparkles, Eye, Zap, ShieldCheck, Building2, BarChart3, Layers } from 'lucide-react';
import HeroBuilding3D from './3d/HeroBuilding3D';

export const HeroSection: React.FC = () => {
  const [isWireframe, setIsWireframe] = useState(false);
  const [showScanner, setShowScanner] = useState(true);

  const handleScroll = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-20 flex items-center overflow-hidden">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-royal-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle blueprint grid overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-6 space-y-8">

            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-300">
                NEXT-GEN AI ARCHITECTURE PLATFORM
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-space font-extrabold tracking-tight leading-[1.08] text-white">
              BUILD SMARTER.<br />
              <span className="gradient-text-cyan">BUILD BETTER.</span><br />
              BUILD WITH <span className="gradient-text-violet">AI.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Transform your building vision into intelligent architectural designs, optimized construction plans, accurate cost estimates, and smarter project execution — all powered by AI.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => handleScroll('#solutions')}
                className="btn-cyber-primary text-base py-4"
              >
                <span>Explore AI Platform</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <button
                onClick={() => handleScroll('#project-planner')}
                className="btn-cyber-secondary text-base py-4"
              >
                <Sparkles className="w-5 h-5 mr-2 text-cyan-400" />
                <span>Start Your Project</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <div className="text-2xl font-space font-extrabold text-white">99.4%</div>
                <div className="text-xs text-slate-400 font-mono">BIM Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-space font-extrabold text-cyan-400">12,500+</div>
                <div className="text-xs text-slate-400 font-mono">Plans Generated</div>
              </div>
              <div>
                <div className="text-2xl font-space font-extrabold text-violet-400">35%</div>
                <div className="text-xs text-slate-400 font-mono">Cost Reduction</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Architectural Visualizer */}
          <div className="lg:col-span-6 relative">

            {/* 3D Canvas Controls Bar */}
            <div className="flex items-center justify-between mb-3 bg-slate-900/80 border border-slate-800 backdrop-blur-md p-2 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 px-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>3D NEURAL TOWER SCHEMATIC</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsWireframe(!isWireframe)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                    isWireframe ? 'bg-cyan-500 text-navy-950 font-bold' : 'bg-slate-800 text-slate-300 hover:text-cyan-400'
                  }`}
                >
                  {isWireframe ? 'WIREFRAME: ON' : 'WIREFRAME'}
                </button>
                <button
                  onClick={() => setShowScanner(!showScanner)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                    showScanner ? 'bg-violet-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:text-violet-400'
                  }`}
                >
                  {showScanner ? 'LASER: ACTIVE' : 'LASER'}
                </button>
              </div>
            </div>

            {/* Main 3D Canvas */}
            <HeroBuilding3D isWireframe={isWireframe} showScanner={showScanner} />

            {/* Floating Glassmorphism Cards */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 glass-panel-glow p-3.5 max-w-xs animate-float-gentle">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">AI Cost Optimization</div>
                <div className="text-[11px] text-cyan-300 font-mono">Estimated Savings: $48,200</div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-3 glass-panel p-3 max-w-xs">
              <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Structural Safety</div>
                <div className="text-[11px] text-purple-300 font-mono">Eurocode & IBC Compliant</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
