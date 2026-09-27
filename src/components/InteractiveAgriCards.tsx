import React, { useState, useRef } from "react";
import {
  Sprout,
  Droplets,
  CloudSun,
  TrendingUp,
  ShieldAlert,
  Layers,
  ArrowRight,
  Sparkles,
  Compass,
  Gauge,
  Thermometer,
  Wind,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface CardProps {
  title: string;
  category: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  badgeColor: string;
  gradient: string;
  stats: { label: string; value: string }[];
  actionLink: string;
  actionText: string;
}

const AgriCard = ({ card }: { card: CardProps }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  const Icon = card.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out, box-shadow 0.25s ease",
      }}
      className="relative group rounded-3xl p-7 flex flex-col justify-between bg-emerald-950/40 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(16,185,129,0.2)] overflow-hidden"
    >
      {/* Specular Glare Effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glarePosition.opacity}), transparent 60%)`,
        }}
      />

      {/* Ambient Gradient in card corner */}
      <div
        className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${card.gradient}`}
      />

      <div>
        {/* Top bar: Category badge + Icon */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase ${card.badgeColor}`}>
              {card.badge}
            </span>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Icon className="w-6 h-6 text-emerald-300 group-hover:text-emerald-200 transition-colors" />
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-2xl font-display font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
          {card.title}
        </h3>
        <p className="text-xs uppercase font-semibold tracking-wider text-amber-400/90 mb-3">
          {card.tagline}
        </p>
        <p className="text-sm text-emerald-100/70 leading-relaxed mb-6">
          {card.description}
        </p>

        {/* Key Metrics / Live Data Strip */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-2xl bg-emerald-900/30 border border-emerald-500/15">
          {card.stats.map((st, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300/60">
                {st.label}
              </span>
              <span className="text-sm font-bold text-white font-mono">
                {st.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <Link
        to={card.actionLink}
        className="inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/30 hover:border-emerald-400/60 text-xs font-bold text-emerald-200 hover:text-white transition-all duration-200 group/btn"
      >
        <span>{card.actionText}</span>
        <ArrowRight className="w-4 h-4 text-emerald-400 group-hover/btn:translate-x-1.5 transition-transform" />
      </Link>
    </div>
  );
};

export const InteractiveAgriCards = () => {
  const { t } = useLanguage();

  const cards: CardProps[] = [
    {
      title: "Smart Crops",
      category: "Crops",
      tagline: "AI Selection & Sowing Radar",
      description: "Tailored crop suggestions matching your soil chemistry, historical season climate, and expected mandi demand for peak profitability.",
      icon: Sprout,
      badge: "Crop Science",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
      gradient: "bg-emerald-500",
      stats: [
        { label: "Optimal Match", value: "98.4%" },
        { label: "Varieties", value: "100+ Tested" },
      ],
      actionLink: "/crop-advisor",
      actionText: "Launch Crop Advisor",
    },
    {
      title: "Soil Intelligence",
      category: "Soil",
      tagline: "NPK & Organic Carbon Health",
      description: "Multi-parameter soil diagnosis analyzing pH balance, micronutrient deficiencies, and regenerative bio-fertilizer recommendations.",
      icon: Layers,
      badge: "Soil Health",
      badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
      gradient: "bg-amber-500",
      stats: [
        { label: "Ideal pH Target", value: "6.5 – 7.2" },
        { label: "Yield Gain", value: "+28% Avg." },
      ],
      actionLink: "/crop-advisor",
      actionText: "Check Soil Suitability",
    },
    {
      title: "Weather Intelligence",
      category: "Weather",
      tagline: "Hyperlocal Agro-Meteorology",
      description: "Live temperature, frost warnings, precipitation probability, and micro-climate forecasts to safeguard spraying and harvest windows.",
      icon: CloudSun,
      badge: "Live Climate",
      badgeColor: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
      gradient: "bg-sky-500",
      stats: [
        { label: "Rain Radar", value: "15% · Clear" },
        { label: "Spray Window", value: "Optimal Today" },
      ],
      actionLink: "/#weather",
      actionText: "Inspect Weather Radar",
    },
    {
      title: "Precision Irrigation",
      category: "Irrigation",
      tagline: "Smart Water Conservation",
      description: "Evapotranspiration-based irrigation scheduling that optimizes pump run-time, protects aquifers, and prevents water-logging.",
      icon: Droplets,
      badge: "Hydrology",
      badgeColor: "bg-teal-500/20 text-teal-300 border border-teal-500/30",
      gradient: "bg-teal-500",
      stats: [
        { label: "Water Savings", value: "Up to 38%" },
        { label: "Root Health", value: "High Vigour" },
      ],
      actionLink: "/ask-ai",
      actionText: "Get Irrigation Plan",
    },
    {
      title: "Market Mandi Rates",
      category: "Market",
      tagline: "Live Commodity Trends",
      description: "Real-time wholesale APMC rates, price trends, and AI forecasting to help you negotiate better and sell at the most profitable moment.",
      icon: TrendingUp,
      badge: "Market Trends",
      badgeColor: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
      gradient: "bg-yellow-500",
      stats: [
        { label: "Wheat (APMC)", value: "₹2,450/qtl" },
        { label: "Cotton Trend", value: "+6.8% Bullish" },
      ],
      actionLink: "/market-insights",
      actionText: "Analyze Mandi Prices",
    },
    {
      title: "Farming Recommendations",
      category: "Recommendations",
      tagline: "Pest Defense & Advisory",
      description: "Computer vision plant diagnosis, organic spray schedules, and certified seasonal guidelines straight to your fingertips.",
      icon: ShieldAlert,
      badge: "Plant Defense",
      badgeColor: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
      gradient: "bg-rose-500",
      stats: [
        { label: "Detection Speed", value: "< 2 Seconds" },
        { label: "Diagnostic AI", value: "96.5% Precision" },
      ],
      actionLink: "/disease-detection",
      actionText: "Scan Leaf for Disease",
    },
  ];

  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Lighting Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Agriculture Hub</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight mb-5 leading-tight">
            Six Pillars of Modern <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">Precision Agriculture</span>
          </h2>

          <p className="text-base md:text-lg text-emerald-100/70 leading-relaxed">
            Move your cursor across each 3D card to explore real-time telemetry, soil balancing, predictive crop science, and mandi market analytics.
          </p>
        </div>

        {/* 3D Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((c) => (
            <AgriCard key={c.title} card={c} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveAgriCards;
