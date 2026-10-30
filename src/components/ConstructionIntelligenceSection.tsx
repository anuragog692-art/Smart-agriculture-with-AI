import React from 'react';
import { Activity, ShieldCheck, Truck, AlertTriangle, CheckCircle, BarChart2, HardHat, TrendingUp } from 'lucide-react';

export const ConstructionIntelligenceSection: React.FC = () => {
  return (
    <section id="intelligence" className="py-24 relative overflow-hidden bg-navy-900/90 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-gold-500/30 text-gold-300 text-xs font-mono">
            <HardHat className="w-3.5 h-3.5 text-gold-400" />
            <span>REAL-TIME SITE EXECUTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-space font-extrabold text-white tracking-tight">
            SMART <span className="gradient-text-gold">CONSTRUCTION INTELLIGENCE</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Monitor site progress, track material supply chains, predict delay risks, and keep projects on schedule and within budget.
          </p>
        </div>

        {/* Dashboard Preview Box */}
        <div className="glass-panel-glow p-8 sm:p-10 rounded-3xl border border-gold-500/30 space-y-8">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-gold-400">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>LIVE PROJECT INTELLIGENCE DASHBOARD</span>
              </div>
              <h3 className="text-2xl font-space font-bold text-white mt-1">Apex AI Heights — Construction Site #04</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ON SCHEDULE (+2 DAYS AHEAD)
              </span>
            </div>
          </div>

          {/* Progress Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-slate-400">TOTAL OVERALL PROGRESS</div>
              <div className="text-2xl font-space font-extrabold text-cyan-300 mt-1">64.8%</div>
              <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-cyan-400" style={{ width: '64.8%' }} />
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-slate-400">STEEL & REBAR DISPATCH</div>
              <div className="text-2xl font-space font-extrabold text-emerald-300 mt-1">92.0%</div>
              <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: '92%' }} />
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-slate-400">SITE SAFETY AUDIT</div>
              <div className="text-2xl font-space font-extrabold text-violet-300 mt-1">100 / 100</div>
              <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-violet-400" style={{ width: '100%' }} />
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-slate-400">BUDGET VARIANCE</div>
              <div className="text-2xl font-space font-extrabold text-gold-400 mt-1">-3.4% UNDER</div>
              <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gold-400" style={{ width: '85%' }} />
              </div>
            </div>
          </div>

          {/* Live Alerts & Material Delivery Rows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 font-mono text-xs">

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-slate-300 font-bold border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2 text-gold-400">
                  <Truck className="w-4 h-4" />
                  MATERIAL SUPPLY CHAIN LOGISTICS
                </span>
                <span>STATUS</span>
              </div>
              {[
                { item: 'Fe-500 Rebar (40 Tons)', eta: 'Arriving Today 14:00', status: 'IN TRANSIT', color: 'text-cyan-300' },
                { item: 'M30 Grade Ready-Mix Concrete', eta: 'Scheduled Tomorrow', status: 'CONFIRMED', color: 'text-emerald-300' },
                { item: 'Low-E Double Glazed Windows', eta: 'In 4 Days', status: 'PROCESSING', color: 'text-slate-300' },
              ].map((m, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                  <div>
                    <div className="text-white font-bold">{m.item}</div>
                    <div className="text-[11px] text-slate-400">{m.eta}</div>
                  </div>
                  <span className={`font-bold ${m.color}`}>{m.status}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-slate-300 font-bold border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2 text-violet-400">
                  <ShieldCheck className="w-4 h-4" />
                  AI PREDICTIVE SITE INSIGHTS
                </span>
                <span>ACTION</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-slate-300 space-y-1">
                <div className="text-cyan-400 font-bold">&gt; Weather Forecast Insight</div>
                <div className="text-[11px] text-slate-400">Light rain expected Thursday. AI recommends advancing roof waterproofing timeline by 24h.</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-slate-300 space-y-1">
                <div className="text-emerald-400 font-bold">&gt; Structural Curing Verification</div>
                <div className="text-[11px] text-slate-400">3rd Floor slab concrete compression strength reached 28.5 MPa. Safe to begin 4th floor formwork.</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ConstructionIntelligenceSection;
