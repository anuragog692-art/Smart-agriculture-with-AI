import React from 'react';
import { Box, Sparkles, Activity, ShieldAlert, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 border-t border-slate-800 text-slate-400 font-mono text-xs py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 p-[1px]">
              <div className="w-full h-full bg-navy-900 rounded-[11px] flex items-center justify-center">
                <Box className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="font-space font-extrabold text-xl text-white">
                AI <span className="gradient-text-cyan">POWER</span>
              </div>
              <p className="text-[10px] text-slate-400">BUILDING PLANNING, DESIGN & CONSTRUCTION INTELLIGENCE</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-300 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>ALL AI NEURAL SYSTEMS OPERATIONAL</span>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="font-bold text-white uppercase text-xs">AI Platform</div>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#hero" className="hover:text-cyan-300">Home Hero</a></li>
              <li><a href="#solutions" className="hover:text-cyan-300">6 Core AI Solutions</a></li>
              <li><a href="#3d-designs" className="hover:text-cyan-300">3D Architecture Showcase</a></li>
              <li><a href="#project-planner" className="hover:text-cyan-300">AI Project Workspace</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-bold text-white uppercase text-xs">Intelligence</div>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#intelligence" className="hover:text-cyan-300">Construction Tracking</a></li>
              <li><a href="#about" className="hover:text-cyan-300">BIM Neural Engine</a></li>
              <li><a href="#contact" className="hover:text-cyan-300">Project Consultation</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-bold text-white uppercase text-xs">Tech Stack</div>
            <ul className="space-y-2 text-slate-400">
              <li>Three.js / React Three Fiber</li>
              <li>Spatial Neural Networks</li>
              <li>Tailwind CSS & Glassmorphism</li>
              <li>BIM IFC / DXF Exporters</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="font-bold text-white uppercase text-xs">Global Offices</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Austin, TX • London, UK • Singapore • Dubai, UAE
            </p>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 space-y-4 text-[10px] text-slate-500">
          <p className="leading-relaxed">
            <strong>Civil Engineering Notice:</strong> AI POWER generates preliminary conceptual building layouts, 3D renderings, and material estimations. All outputs must be audited and stamped by a licensed civil or structural engineer prior to construction.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-slate-400">
            <div>© {new Date().getFullYear()} AI POWER Platform. All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-cyan-300">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-300">Terms of Service</a>
              <a href="#" className="hover:text-cyan-300">Engineering Compliance</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
