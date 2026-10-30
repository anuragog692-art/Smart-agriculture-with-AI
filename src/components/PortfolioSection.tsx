import React, { useState } from 'react';
import { Building2, Layers, Eye, Sparkles, MapPin, X } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'Skyscrapers' | 'Villas' | 'Commercial' | 'Eco';
  style: string;
  location: string;
  area: string;
  floors: string;
  cost: string;
  description: string;
  highlights: string[];
}

export const PortfolioSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    {
      id: 'p1',
      title: 'Aetheria Cyber Tower',
      category: 'Skyscrapers',
      style: 'Futuristic Parametric',
      location: 'Dubai, UAE',
      area: '42,000 m²',
      floors: 'G+42 Floors',
      cost: '$68.5M',
      description: 'A 42-story parametric skyscraper designed with dynamic solar tracking glass fins, integrated wind turbine crowns, and zero-carbon concrete structural core.',
      highlights: ['30% Wind Load Reduction', 'Solar Facade Powering 40% Grid', 'AI Spatial Circulation Matrix']
    },
    {
      id: 'p2',
      title: 'The Luminar Eco Villa',
      category: 'Villas',
      style: 'Biophilic Modern',
      location: 'Austin, TX',
      area: '520 m²',
      floors: 'G+1 Floor',
      cost: '$1.4M',
      description: 'A luxury residential villa integrating rainwater harvesting roofs, subterranean geothermal cooling, and cantilevers customized for optimal natural lighting.',
      highlights: ['Zero Energy Footprint', 'Subterranean Geothermal HVAC', 'Passive Solar Lighting']
    },
    {
      id: 'p3',
      title: 'Nexus Commercial Atrium',
      category: 'Commercial',
      style: 'High-Tech Glass & Steel',
      location: 'Singapore',
      area: '18,500 m²',
      floors: 'G+6 Floors',
      cost: '$24.0M',
      description: 'Commercial corporate headquarters featuring a central diagrid atrium dome, robotic automated parking, and self-healing glass facades.',
      highlights: ['Central Glass Diagrid Dome', 'Robotic Underground Parking', 'BIM Level 3 Integrated']
    },
    {
      id: 'p4',
      title: 'Solaria Parametric Hub',
      category: 'Eco',
      style: 'Biophilic Eco-Structure',
      location: 'Zurich, Switzerland',
      area: '9,800 m²',
      floors: 'G+3 Floors',
      cost: '$14.2M',
      description: 'A sustainable innovation hub constructed with engineered cross-laminated timber (CLT) and AI-optimized structural timber trusses.',
      highlights: ['Cross-Laminated Timber (CLT)', 'Massive Carbon Sequestration', 'Leed Platinum Certified']
    },
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="py-24 relative overflow-hidden bg-navy-900/80 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI DESIGNED ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            FLAGSHIP <span className="gradient-text-cyan">PROJECT PORTFOLIO</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Explore world-class architectural designs synthesized and optimized by the AI POWER neural platform.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 bg-slate-900/80 p-2 rounded-2xl border border-slate-800/80 max-w-xl mx-auto font-mono text-xs">
          {['All', 'Skyscrapers', 'Villas', 'Commercial', 'Eco'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === cat
                  ? 'bg-cyan-500 text-navy-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="glass-card rounded-3xl p-6 relative group border border-slate-800 hover:border-cyan-500/40 space-y-4"
            >
              <div className="w-full h-52 bg-slate-950 rounded-2xl border border-cyan-500/20 blueprint-grid relative flex flex-col justify-between p-5 overflow-hidden">
                <div className="flex justify-between items-start text-xs font-mono">
                  <span className="px-2.5 py-1 rounded bg-slate-900/90 text-cyan-300 border border-cyan-500/30">
                    {proj.category}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-900/90 text-emerald-300 border border-emerald-500/30">
                    {proj.cost}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-space font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {proj.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{proj.location} • {proj.floors}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {proj.description}
              </p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">BUILT-UP: <strong className="text-cyan-300">{proj.area}</strong></span>
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold"
                >
                  <Eye className="w-4 h-4" />
                  <span>VIEW SPECS</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Dialog */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="glass-panel-glow p-8 rounded-3xl max-w-xl w-full border border-cyan-500/40 relative space-y-6 animate-scale-in">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">{selectedProject.category} • {selectedProject.style}</span>
                <h3 className="text-2xl font-space font-bold text-white mt-1">{selectedProject.title}</h3>
                <p className="text-xs font-mono text-slate-400">{selectedProject.location}</p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {selectedProject.description}
              </p>

              <div className="space-y-2 font-mono text-xs">
                <div className="font-bold text-cyan-300">KEY AI HIGHLIGHTS:</div>
                <div className="space-y-1">
                  {selectedProject.highlights.map((h, idx) => (
                    <div key={idx} className="p-2 bg-slate-900 rounded-lg text-slate-200 border border-slate-800">
                      ✓ {h}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center font-mono text-xs">
                <span className="text-slate-400">ESTIMATED CAPEX: <strong className="text-emerald-300">{selectedProject.cost}</strong></span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn-cyber-primary py-2 px-4 text-xs"
                >
                  Close Specs
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default PortfolioSection;
