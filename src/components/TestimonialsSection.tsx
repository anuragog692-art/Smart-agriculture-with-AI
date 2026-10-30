import React from 'react';
import { Star, MessageSquareQuote, ShieldCheck, UserCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "AI POWER reduced our initial architectural concept phase from 3 weeks down to less than 10 minutes. The 3D BIM spatial visualization and cost accuracy blew our clients away.",
      name: "Arch. Marcus Vance",
      title: "Principal Architect, Vance Design Studio",
      location: "London, UK",
      rating: 5,
    },
    {
      quote: "As a commercial developer managing multi-million dollar projects, AI POWER's material BOM estimation saved us over $120,000 in material overordering on our first tower build.",
      name: "Elena Rostova",
      title: "VP Development, Horizon Urban Properties",
      location: "Chicago, IL",
      rating: 5,
    },
    {
      quote: "The preliminary structural load insights and setback audits give our engineering team a massive head start. It bridges architectural creativity with real civil engineering math.",
      name: "Dr. David Chen, PE",
      title: "Senior Structural Civil Engineer",
      location: "San Francisco, CA",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-navy-900/90 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-violet-500/30 text-violet-300 text-xs font-mono">
            <UserCheck className="w-3.5 h-3.5 text-violet-400" />
            <span>INDUSTRY RECOGNITION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            TRUSTED BY <span className="gradient-text-violet">LEADING ARCHITECTS & BUILDERS</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Read how global architectural firms and developers use AI POWER to build smarter and faster.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-8 relative border border-slate-800 flex flex-col justify-between space-y-6 group hover:border-cyan-500/40"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-gold-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-sm font-space font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </div>
                  <div className="text-[11px] font-mono text-cyan-400">{item.title}</div>
                  <div className="text-[10px] font-mono text-slate-500">{item.location}</div>
                </div>
                <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0 opacity-80" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
