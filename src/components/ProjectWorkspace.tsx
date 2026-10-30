import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  Building,
  Ruler,
  Layers,
  Home,
  DollarSign,
  MapPin,
  FileText,
  CheckCircle,
  BarChart3,
  Compass,
  Box,
  FileSpreadsheet,
  Clock,
  ShieldAlert,
  Download,
  RotateCcw,
  Check,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import ShowcaseBuilding3D, { BuildingStyle } from './3d/ShowcaseBuilding3D';

export const ProjectWorkspace: React.FC = () => {
  // Form State
  const [projectName, setProjectName] = useState<string>('Apex AI Heights');
  const [plotLength, setPlotLength] = useState<number>(50);
  const [plotWidth, setPlotWidth] = useState<number>(80);
  const [floors, setFloors] = useState<number>(3);
  const [buildingType, setBuildingType] = useState<string>('Residential Villa');
  const [archStyle, setArchStyle] = useState<string>('Futuristic High-Tech');
  const [bedrooms, setBedrooms] = useState<number>(4);
  const [budget, setBudget] = useState<string>('$150,000 - $300,000');
  const [location, setLocation] = useState<string>('Austin, TX');
  const [notes, setNotes] = useState<string>('Prioritize natural ventilation, glass facade, and a rooftop solar patio.');

  // UI Flow State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [hasResults, setHasResults] = useState<boolean>(false);
  const [activeResultTab, setActiveResultTab] = useState<'overview' | 'spatial' | 'floorplan' | '3d' | 'materials' | 'cost' | 'timeline' | 'insights'>('overview');

  const computedArea = plotLength * plotWidth;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setHasResults(false);

    // Simulated multi-step neural generation process
    const steps = [
      'Ingesting plot dimensions & setback parameters...',
      'Synthesizing spatial matrix & circulation vectors...',
      'Generating 2D floorplan schematic & room allocation...',
      'Building 3D BIM structural mesh...',
      'Computing material bill of quantities & localized cost breakdown...',
      'Finalizing AI building intelligence package...'
    ];

    let i = 0;
    setGenerationStep(steps[0]);
    const interval = setInterval(() => {
      i++;
      if (i < steps.length) {
        setGenerationStep(steps[i]);
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setHasResults(true);
      }
    }, 600);
  };

  // Map chosen style to 3D model style
  const get3DStyle = (): BuildingStyle => {
    if (buildingType.includes('Commercial') || buildingType.includes('Warehouse')) return 'commercial';
    if (buildingType.includes('Apartment')) return 'tower';
    if (archStyle.includes('Futuristic') || archStyle.includes('Brutalist')) return 'tower';
    return 'villa';
  };

  // Calculated estimates based on plot inputs
  const totalBuiltUpArea = Math.round(computedArea * floors * 0.78);
  const approxCost = Math.round(totalBuiltUpArea * 125);
  const steelTons = Math.round((totalBuiltUpArea * 4) / 1000);
  const concreteM3 = Math.round((totalBuiltUpArea * 0.32));
  const cementBags = Math.round(concreteM3 * 7.5);

  return (
    <section id="project-planner" className="py-24 relative overflow-hidden bg-navy-950 border-t border-slate-800/80">
      {/* Background glow highlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI PROJECT WORKSPACE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            GENERATE YOUR <span className="gradient-text-cyan">AI BUILDING PLAN</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Enter your plot parameters, structural preferences, and project parameters to synthesize a complete architectural & construction intelligence report.
          </p>
        </div>

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-5 glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-space font-bold text-white">Project Parameters</h3>
              </div>
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                REAL-TIME SOLVER
              </span>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4 text-xs font-mono">

              {/* Project Name */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">PROJECT NAME</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full input-cyber"
                  required
                />
              </div>

              {/* Plot Length & Width */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">PLOT LENGTH (FT)</label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={plotLength}
                    onChange={(e) => setPlotLength(Number(e.target.value))}
                    className="w-full input-cyber"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">PLOT WIDTH (FT)</label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={plotWidth}
                    onChange={(e) => setPlotWidth(Number(e.target.value))}
                    className="w-full input-cyber"
                    required
                  />
                </div>
              </div>

              {/* Calculated Area Display */}
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">TOTAL PLOT AREA:</span>
                <span className="text-sm font-bold text-cyan-300">{computedArea.toLocaleString()} SQ. FT</span>
              </div>

              {/* Floors & Bedrooms */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">NUMBER OF FLOORS</label>
                  <select
                    value={floors}
                    onChange={(e) => setFloors(Number(e.target.value))}
                    className="w-full input-cyber bg-slate-900"
                  >
                    <option value={1}>G+0 (Single Floor)</option>
                    <option value={2}>G+1 (2 Floors)</option>
                    <option value={3}>G+2 (3 Floors)</option>
                    <option value={4}>G+3 (4 Floors)</option>
                    <option value={6}>G+5 (High-Rise)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">BEDROOMS / UNITS</label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full input-cyber bg-slate-900"
                  >
                    <option value={2}>2 BHK / Units</option>
                    <option value={3}>3 BHK / Units</option>
                    <option value={4}>4 BHK / Units</option>
                    <option value={5}>5+ Luxury Suites</option>
                  </select>
                </div>
              </div>

              {/* Building Type */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">BUILDING TYPE</label>
                <select
                  value={buildingType}
                  onChange={(e) => setBuildingType(e.target.value)}
                  className="w-full input-cyber bg-slate-900"
                >
                  <option value="Residential Villa">Residential Modern Villa</option>
                  <option value="Commercial Complex">Commercial Office Hub</option>
                  <option value="Apartment Tower">Residential Apartment Tower</option>
                  <option value="Mixed-Use Facility">Mixed-Use Commercial & Living</option>
                </select>
              </div>

              {/* Architectural Style */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">ARCHITECTURAL STYLE</label>
                <select
                  value={archStyle}
                  onChange={(e) => setArchStyle(e.target.value)}
                  className="w-full input-cyber bg-slate-900"
                >
                  <option value="Futuristic High-Tech">Futuristic High-Tech Glass</option>
                  <option value="Modern Minimalist">Modern Minimalist</option>
                  <option value="Biophilic Green">Biophilic Eco-Green</option>
                  <option value="Industrial Brutalist">Industrial Steel & Concrete</option>
                </select>
              </div>

              {/* Budget Range & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">BUDGET RANGE</label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full input-cyber"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">LOCATION</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full input-cyber"
                  />
                </div>
              </div>

              {/* Notes / Special Prompt */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">ADDITIONAL REQUIREMENTS</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full input-cyber"
                />
              </div>

              {/* Generate Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full btn-cyber-primary py-4 text-sm font-space tracking-wider uppercase font-extrabold justify-center"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 animate-spin" />
                      <span>GENERATING PLAN...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      <span>GENERATE MY AI BUILDING PLAN</span>
                    </span>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: AI Generation Results Display */}
          <div className="lg:col-span-7">

            {/* Loading State */}
            {isGenerating && (
              <div className="glass-panel-glow p-12 rounded-3xl border border-cyan-500/40 text-center space-y-6 min-h-[500px] flex flex-col justify-center items-center">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                  <div className="absolute inset-2 rounded-full border-4 border-violet-500/20 border-b-violet-400 animate-spin" style={{ animationDirection: 'reverse' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building className="w-8 h-8 text-cyan-400 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-space font-bold text-white mb-2">
                    AI POWER Neural Synthesis Active
                  </h3>
                  <p className="text-xs font-mono text-cyan-300 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 inline-block animate-pulse">
                    &gt; {generationStep}
                  </p>
                </div>
              </div>
            )}

            {/* Empty State before first click */}
            {!isGenerating && !hasResults && (
              <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-6 min-h-[500px] flex flex-col justify-center items-center">
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Sparkles className="w-10 h-10" />
                </div>
                <div className="max-w-md space-y-2">
                  <h3 className="text-2xl font-space font-bold text-white">
                    Ready to Generate Your Architectural Plan
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Adjust your plot dimensions and design parameters on the left, then click <strong>"GENERATE MY AI BUILDING PLAN"</strong> to build your 3D BIM model and cost analysis.
                  </p>
                </div>
              </div>
            )}

            {/* Results Interface */}
            {!isGenerating && hasResults && (
              <div className="space-y-6 animate-fade-in">

                {/* Results Navigation Tabs Bar */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 font-mono text-xs">
                  {[
                    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-3.5 h-3.5" /> },
                    { id: 'spatial', label: 'Space Allocation', icon: <Compass className="w-3.5 h-3.5" /> },
                    { id: 'floorplan', label: 'Floor Plan', icon: <Layers className="w-3.5 h-3.5" /> },
                    { id: '3d', label: '3D Model', icon: <Box className="w-3.5 h-3.5" /> },
                    { id: 'materials', label: 'Materials BOM', icon: <FileSpreadsheet className="w-3.5 h-3.5" /> },
                    { id: 'cost', label: 'Cost Breakdown', icon: <DollarSign className="w-3.5 h-3.5" /> },
                    { id: 'timeline', label: 'Timeline', icon: <Clock className="w-3.5 h-3.5" /> },
                    { id: 'insights', label: 'AI Insights', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveResultTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                        activeResultTab === tab.id
                          ? 'bg-cyan-500 text-navy-950 font-bold shadow-lg shadow-cyan-500/20'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* TAB 1: OVERVIEW */}
                {activeResultTab === 'overview' && (
                  <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <h3 className="text-xl font-space font-bold text-white">{projectName}</h3>
                        <p className="text-xs font-mono text-cyan-400">
                          {buildingType} • {archStyle} • {location}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        AI COMPLETED
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                        <div className="text-[11px] text-slate-400 font-mono">BUILT-UP AREA</div>
                        <div className="text-xl font-space font-extrabold text-cyan-300 mt-1">
                          {totalBuiltUpArea.toLocaleString()} SQ. FT
                        </div>
                      </div>
                      <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                        <div className="text-[11px] text-slate-400 font-mono">ESTIMATED COST</div>
                        <div className="text-xl font-space font-extrabold text-emerald-300 mt-1">
                          ${approxCost.toLocaleString()}
                        </div>
                      </div>
                      <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                        <div className="text-[11px] text-slate-400 font-mono">AI PLAN SCORE</div>
                        <div className="text-xl font-space font-extrabold text-violet-300 mt-1">
                          98.5 / 100
                        </div>
                      </div>
                      <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
                        <div className="text-[11px] text-slate-400 font-mono">ENERGY RATING</div>
                        <div className="text-xl font-space font-extrabold text-gold-400 mt-1">
                          A+ ECO
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2">
                      <div className="text-xs font-mono font-bold text-cyan-400">AI PLANNER SUMMARY</div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Layout optimized for G+{floors - 1} structure on {computedArea.toLocaleString()} sq.ft plot. Spatial distribution prioritizes optimal daylighting along the east facade while reserving 22% of plot area for parking and green landscaping.
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 2: SPATIAL ALLOCATION */}
                {activeResultTab === 'spatial' && (
                  <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
                    <h3 className="text-lg font-space font-bold text-white">Proposed Space Allocation</h3>
                    <div className="space-y-4 font-mono text-xs">
                      {[
                        { name: 'Living & Dining Hall', pct: 32, area: Math.round(totalBuiltUpArea * 0.32), color: 'bg-cyan-400' },
                        { name: 'Bedrooms & Private Suites', pct: 35, area: Math.round(totalBuiltUpArea * 0.35), color: 'bg-violet-400' },
                        { name: 'Kitchen & Utility Spaces', pct: 15, area: Math.round(totalBuiltUpArea * 0.15), color: 'bg-emerald-400' },
                        { name: 'Circulation & Stairs/Lifts', pct: 10, area: Math.round(totalBuiltUpArea * 0.10), color: 'bg-gold-400' },
                        { name: 'Balconies & Open Terraces', pct: 8, area: Math.round(totalBuiltUpArea * 0.08), color: 'bg-pink-400' },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-slate-300">
                            <span>{item.name} ({item.area} sq.ft)</span>
                            <span className="font-bold text-white">{item.pct}%</span>
                          </div>
                          <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: FLOOR PLAN */}
                {activeResultTab === 'floorplan' && (
                  <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-cyan-400 font-bold">2D SCHEMATIC BLUEPRINT (LEVEL 1)</span>
                      <span className="text-slate-400">SCALE 1:100</span>
                    </div>
                    {/* Visual Blueprint Grid Box */}
                    <div className="w-full h-80 bg-navy-950 rounded-2xl border border-cyan-500/30 blueprint-grid relative p-6 flex flex-col justify-between font-mono">
                      <div className="flex justify-between text-[11px] text-cyan-400">
                        <span>NORTH ORIENTATION ^</span>
                        <span>PLOT: {plotLength}FT x {plotWidth}FT</span>
                      </div>

                      {/* Schematic Box Representation */}
                      <div className="border-2 border-cyan-400 border-dashed rounded-xl p-4 flex-1 my-3 relative bg-cyan-950/20 flex flex-col justify-around">
                        <div className="flex justify-around">
                          <div className="border border-cyan-400/70 p-2 text-[10px] text-cyan-300 bg-slate-900/90 rounded">
                            LIVING ROOM [22ft x 18ft]
                          </div>
                          <div className="border border-purple-400/70 p-2 text-[10px] text-purple-300 bg-slate-900/90 rounded">
                            MASTER BEDROOM [16ft x 14ft]
                          </div>
                        </div>
                        <div className="flex justify-around">
                          <div className="border border-emerald-400/70 p-2 text-[10px] text-emerald-300 bg-slate-900/90 rounded">
                            KITCHEN & DINING [14ft x 12ft]
                          </div>
                          <div className="border border-gold-400/70 p-2 text-[10px] text-gold-300 bg-slate-900/90 rounded">
                            FOYER & STAIRS [12ft x 10ft]
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 text-center">
                        AI GENERATED CONCEPTUAL SCHEMATIC — EXPORTABLE TO AUTOCAD DXF / BIM IFC
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: 3D MODEL */}
                {activeResultTab === '3d' && (
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-cyan-400 flex justify-between px-2">
                      <span>SYNTHESIZED 3D BIM MODEL</span>
                      <span>DRAG TO ROTATE 3D</span>
                    </div>
                    <ShowcaseBuilding3D
                      styleType={get3DStyle()}
                      isWireframe={false}
                      isExploded={false}
                      showScanner={true}
                    />
                  </div>
                )}

                {/* TAB 5: MATERIALS BOM */}
                {activeResultTab === 'materials' && (
                  <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                    <h3 className="text-lg font-space font-bold text-white">Itemized Material Bill of Quantities</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-cyan-400">
                            <th className="py-2.5 px-3">MATERIAL</th>
                            <th className="py-2.5 px-3">ESTIMATED QUANTITY</th>
                            <th className="py-2.5 px-3">UNIT COST</th>
                            <th className="py-2.5 px-3 text-right">TOTAL</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-slate-300">
                          <tr>
                            <td className="py-3 px-3 font-bold text-white">Steel Rebar (Fe-500)</td>
                            <td className="py-3 px-3">{steelTons} Metric Tons</td>
                            <td className="py-3 px-3">$850 / Ton</td>
                            <td className="py-3 px-3 text-right text-cyan-300 font-bold">${(steelTons * 850).toLocaleString()}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-3 font-bold text-white">Ready-Mix Concrete (M25)</td>
                            <td className="py-3 px-3">{concreteM3} m³</td>
                            <td className="py-3 px-3">$110 / m³</td>
                            <td className="py-3 px-3 text-right text-cyan-300 font-bold">${(concreteM3 * 110).toLocaleString()}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-3 font-bold text-white">Cement Bags (OPC 53)</td>
                            <td className="py-3 px-3">{cementBags} Bags</td>
                            <td className="py-3 px-3">$9.50 / Bag</td>
                            <td className="py-3 px-3 text-right text-cyan-300 font-bold">${Math.round(cementBags * 9.5).toLocaleString()}</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-3 font-bold text-white">Facade Glass & Aluminum Panels</td>
                            <td className="py-3 px-3">{Math.round(totalBuiltUpArea * 0.25)} sq.ft</td>
                            <td className="py-3 px-3">$28 / sq.ft</td>
                            <td className="py-3 px-3 text-right text-cyan-300 font-bold">${Math.round(totalBuiltUpArea * 0.25 * 28).toLocaleString()}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 6: COST BREAKDOWN */}
                {activeResultTab === 'cost' && (
                  <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                      <div>
                        <h3 className="text-lg font-space font-bold text-white">Preliminary Cost Breakdown</h3>
                        <p className="text-xs font-mono text-slate-400">Location: {location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-space font-extrabold text-emerald-400">
                          ${approxCost.toLocaleString()}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">TOTAL ESTIMATED BUDGET</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                      <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex justify-between items-center">
                        <span className="text-slate-300">Materials & Supplies (45%):</span>
                        <span className="font-bold text-white">${Math.round(approxCost * 0.45).toLocaleString()}</span>
                      </div>
                      <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex justify-between items-center">
                        <span className="text-slate-300">Labor & Supervision (30%):</span>
                        <span className="font-bold text-white">${Math.round(approxCost * 0.30).toLocaleString()}</span>
                      </div>
                      <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex justify-between items-center">
                        <span className="text-slate-300">Machinery & Equipment (12%):</span>
                        <span className="font-bold text-white">${Math.round(approxCost * 0.12).toLocaleString()}</span>
                      </div>
                      <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex justify-between items-center">
                        <span className="text-slate-300">Permits, Approvals & Buffer (13%):</span>
                        <span className="font-bold text-white">${Math.round(approxCost * 0.13).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 7: TIMELINE */}
                {activeResultTab === 'timeline' && (
                  <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
                    <h3 className="text-lg font-space font-bold text-white">Construction Phase Timeline</h3>
                    <div className="space-y-4 font-mono text-xs">
                      {[
                        { phase: 'Phase 1: Site Prep & Excavation', duration: 'Month 1', status: 'Site Clearing & Soil Test' },
                        { phase: 'Phase 2: Substructure & Foundation', duration: 'Months 2 - 3', status: 'Piling & Concrete Slab' },
                        { phase: 'Phase 3: Structural Framing', duration: 'Months 4 - 6', status: 'Columns, Beams & Slabs' },
                        { phase: 'Phase 4: Exterior Enclosure & MEP', duration: 'Months 7 - 9', status: 'Glass Facade, HVAC, Plumbing' },
                        { phase: 'Phase 5: Interior Finishes & Handover', duration: 'Months 10 - 12', status: 'Fixtures, Painting & Inspection' },
                      ].map((p, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <div className="font-bold text-white">{p.phase}</div>
                            <div className="text-[11px] text-slate-400">{p.status}</div>
                          </div>
                          <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                            {p.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 8: INSIGHTS & DISCLAIMER */}
                {activeResultTab === 'insights' && (
                  <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
                    <h3 className="text-lg font-space font-bold text-white">AI Engineering Insights</h3>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300">
                        <strong>Structural Recommendation:</strong> Soil bearing capacity is assumed at standard 180 kN/m². Reinforced concrete isolated footings with tied column grids are advised.
                      </div>
                      <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-300">
                        <strong>HVAC & Energy Efficiency:</strong> Double-glazed Low-E glass along the south facade reduces solar heat gain by up to 28%.
                      </div>
                    </div>

                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl font-mono text-xs text-amber-200 leading-relaxed flex items-start gap-3">
                      <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>CIVIL ENGINEERING DISCLAIMER:</strong> All plans, 3D models, material lists, and structural estimates generated by AI POWER are preliminary conceptual designs. They do not constitute certified civil or structural engineering documents. Final construction drawings must be reviewed and stamped by a licensed civil/structural engineer in your jurisdiction.
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProjectWorkspace;
