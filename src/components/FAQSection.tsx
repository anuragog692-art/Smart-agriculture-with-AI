import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, Search } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const faqs = [
    {
      q: 'How accurate are the AI POWER building plans and cost estimates?',
      a: 'AI POWER uses spatial neural networks trained on over 50,000 real-world architectural blueprints and regional material market data. Cost estimates achieve an average of 98.4% precision compared to actual construction site bills of quantities.',
    },
    {
      q: 'Can I export generated 3D models and plans into AutoCAD or Revit?',
      a: 'Yes. AI POWER supports exporting floor plans and 3D building models directly to AutoCAD (.DXF), Building Information Modeling (.IFC), and 3D mesh formats (.OBJ / .GLTF) for further refinement.',
    },
    {
      q: 'Are AI POWER structural concepts legally compliant with building codes?',
      a: 'AI POWER incorporates International Building Code (IBC) and Eurocode rules into its spatial algorithms to ensure setback compliance and room dimensions. However, all AI structural concepts require final engineering validation and stamping by a certified civil engineer in your jurisdiction.',
    },
    {
      q: 'Does AI POWER support custom plot shapes and sloped terrain?',
      a: 'Absolutely. You can enter non-rectangular plot dimensions, custom setback bounds, and elevation gradients in the AI Project Workspace.',
    },
    {
      q: 'How does the platform estimate construction timelines?',
      a: 'Our timeline algorithm breaks down project milestones into 5 distinct phases (Site Prep, Substructure, Framing, Enclosure/MEP, Finishes) based on calculated concrete volumes, floor counts, and localized labor productivity data.',
    },
    {
      q: 'Can enterprise clients connect custom LLM API keys or BIM databases?',
      a: 'Yes. AI POWER provides a dedicated API key configuration interface in the workspace settings, allowing enterprise architectural firms to integrate proprietary BIM libraries and private LLM keys.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 relative overflow-hidden bg-navy-950 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            FREQUENTLY ASKED <span className="gradient-text-cyan">QUESTIONS</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Find answers to common questions about our AI architectural engine, BIM exports, and civil engineering compliance.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs (e.g., AutoCAD, Cost, Engineer, BIM)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full input-cyber pl-11 py-3 text-xs font-mono"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-800 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 text-sm font-space font-bold text-white hover:text-cyan-300"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs text-slate-300 leading-relaxed font-normal border-t border-slate-800/60 pt-4 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
