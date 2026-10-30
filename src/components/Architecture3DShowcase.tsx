import React, { useState } from 'react';
import { Layers, Eye, Zap, Box, Compass, Sparkles, Building, Home, Shield, Activity } from 'lucide-react';
import ShowcaseBuilding3D, { BuildingStyle } from './3d/ShowcaseBuilding3D';

export const Architecture3DShowcase: React.FC = () => {
  const [styleType, setStyleType] = useState<BuildingStyle>('tower');
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [showScanner, setShowScanner] = useState<boolean>(true);

  const styleOptions: { id: BuildingStyle; name: string; icon: React.ReactNode; area: string; floors: string; steel: string; concrete: string; timeline: string }[] = [
    { id: 'tower', name: 'High-Rise Skyscraper', icon: <Building className="w-4 h-4" />, area: '14,500 m²', floors: 'G+28 Floors', steel: '1,280 Tons', concrete: '4,200 m³', timeline: '18 Months' },
    { id: 'villa', name: 'Modern Luxury Villa', icon: <Home className="w-4 h-4" />, area: '450 m²', floors: 'G+1 Floor', steel: '38 Tons', concrete: '180 m³', timeline: '6 Months' },
    { id: 'commercial', name: 'Commercial Atrium', icon: <Box className="w-4 h-4" />, area: '8,200 m²', floors: 'G+4 Floors', steel: '650 Tons', concrete: '2,800 m³', timeline: '12 Months' },
    { id: 'structural', name: 'Structural Framework', icon: <Activity className="w-4 h-4" />, area: '12,000 m²', floors: 'G+12 Floors', steel: '950 Tons', concrete: '3,100 m³', timeline: '14 Months' },
    { id: 'floorplan', name: '3D Floor Plan Schematic', icon: <Compass className="w-4 h-4" />, area: '280 m²', floors: 'Single Level', steel: '12 Tons', concrete: '65 m³', timeline: '4 Months' },
  ];

  const currentDetails = styleOptions.find((s) => s.id === styleType)!;

  return (
    <section id="3d-designs" className="py-24 relative overflow-hidden bg-navy-950 border-t border-slate-800/80">
      {/* Glow backgrounds */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-royal-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-violet-500/30 text-violet-300 text-xs font-mono">
            <Box className="w-3.5 h-3.5 text-violet-400" />
            <span>PREMIUM 3D VISUAL EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            INTERACTIVE <span className="gradient-text-cyan">3D ARCHITECTURE</span> SHOWCASE
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Rotate, inspect, explode, and analyze real-time 3D building models rendered directly in your browser using Three.js technology.
          </p>
        </div>

        {/* Style Selection Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-slate-900/80 p-2 rounded-2xl border border-slate-800/80 max-w-4xl mx-auto backdrop-blur-md">
          {styleOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setStyleType(opt.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all duration-300 ${
                styleType === opt.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-navy-950 font-bold shadow-lg shadow-cyan-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {opt.icon}
              <span>{opt.name}</span>
            </button>
          ))}
        </div>

        {/* 3D Canvas Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main 3D Interactive Viewer */}
          <div className="lg:col-span-8 space-y-4">

            {/* View Controls Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 px-2">
                <Sparkles className="w-4 h-4" />
                <span>3D MODEL: {currentDetails.name.toUpperCase()}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsWireframe(!isWireframe)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    isWireframe ? 'bg-cyan-500 text-navy-950 font-bold' : 'bg-slate-800 text-slate-300 hover:text-cyan-400'
                  }`}
                >
                  Wireframe
                </button>
                <button
                  onClick={() => setIsExploded(!isExploded)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    isExploded ? 'bg-purple-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:text-purple-400'
                  }`}
                >
                  Explode Layers
                </button>
                <button
                  onClick={() => setShowScanner(!showScanner)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    showScanner ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:text-emerald-400'
                  }`}
                >
                  Laser Scanner
                </button>
              </div>
            </div>

            {/* 3D Canvas */}
            <ShowcaseBuilding3D
              styleType={styleType}
              isWireframe={isWireframe}
              isExploded={isExploded}
              showScanner={showScanner}
            />
          </div>

          {/* Model Specification Card Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel-glow p-6 rounded-2xl border border-cyan-500/30 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-space font-bold text-white">{currentDetails.name}</h3>
                  <p className="text-xs text-cyan-400 font-mono">BIM Parameter Specs</p>
                </div>
                <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  {currentDetails.icon}
                </span>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Total Built-Up Area:</span>
                  <span className="font-bold text-white">{currentDetails.area}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Height / Elevation:</span>
                  <span className="font-bold text-cyan-300">{currentDetails.floors}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Estimated Rebar Steel:</span>
                  <span className="font-bold text-violet-300">{currentDetails.steel}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Concrete Volume:</span>
                  <span className="font-bold text-emerald-300">{currentDetails.concrete}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Estimated Execution:</span>
                  <span className="font-bold text-gold-400">{currentDetails.timeline}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <a
                  href="#project-planner"
                  className="w-full btn-cyber-primary text-center justify-center text-xs py-3"
                >
                  <span>Customize This Model in Planner</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Architecture3DShowcase;
