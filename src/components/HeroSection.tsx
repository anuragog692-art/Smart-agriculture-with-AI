import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Leaf,
  Bot,
  TrendingUp,
  ShieldCheck,
  Compass,
  Sprout,
  Droplets,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-smart-farm.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionProps {
  onOpenFarmMate?: () => void;
}

export const HeroSection = ({ onOpenFarmMate }: HeroSectionProps) => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated counters state
  const [farmersCount, setFarmersCount] = useState(0);
  const [accuracyCount, setAccuracyCount] = useState(0);
  const [cropsCount, setCropsCount] = useState(0);

  // Mouse parallax state for 3D hero tilt
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Smooth number animation on mount
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();

    const animateCounters = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setFarmersCount(Math.round(ease * 50));
      setAccuracyCount(Math.round(ease * 96.8 * 10) / 10);
      setCropsCount(Math.round(ease * 120));

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    requestAnimationFrame(animateCounters);
  }, []);

  // Agricultural Spores / Floating Particles Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      wobble: number;
    }

    const particles: Particle[] = [];
    const colors = [
      "rgba(16, 185, 129, ", // Emerald
      "rgba(52, 211, 153, ", // Mint
      "rgba(245, 158, 11, ", // Amber Gold
      "rgba(45, 212, 191, ", // Teal
    ];

    for (let i = 0; i < 48; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2, // Drift upward like plant spores
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        wobble: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.wobble += 0.02;
        p.x += p.vx + Math.sin(p.wobble) * 0.3;
        p.y += p.vy;

        // Wrap around
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color + "0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMouseOffset({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20 bg-gradient-to-b from-emerald-950 via-background to-emerald-950/40"
    >
      {/* Background Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[1] opacity-75"
      />

      {/* Ambient Gradient Lighting Orbs */}
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-emerald-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-amber-500/15 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[450px] h-[450px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ============================================================== */}
          {/* LEFT COLUMN: HERO TEXT & CTAS                                 */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 space-y-8 animate-fade-up">
            {/* Top Pill / Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 backdrop-blur-md text-emerald-300 text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Next-Gen AgriTech · Developed by Anurag</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white leading-[1.05]">
                Farm to Field <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                  Hub
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-emerald-200/90 leading-snug">
                Smart technology connecting farmers, crops, markets and agricultural insights.
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-amber-400">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/25">
                  Created & Engineered by Anurag
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-emerald-100/70 max-w-xl leading-relaxed">
              Empowering farmers with AI-driven crop selection, satellite weather monitoring, precision soil analytics, instant plant disease diagnosis, and live mandi market intelligence.
            </p>

            {/* Powerful Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/crop-advisor">
                <button className="relative group px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-emerald-950 font-bold text-sm tracking-wide shadow-[0_0_24px_rgba(16,185,129,0.45)] hover:shadow-[0_0_36px_rgba(16,185,129,0.7)] transition-all duration-300 flex items-center gap-2.5 transform hover:-translate-y-0.5">
                  <Sprout className="w-4 h-4 text-emerald-950 group-hover:rotate-12 transition-transform" />
                  <span>Explore Crop Advisor</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              {onOpenFarmMate ? (
                <button
                  onClick={onOpenFarmMate}
                  className="px-6 py-3.5 rounded-full bg-emerald-950/70 hover:bg-emerald-900/60 border border-emerald-500/35 hover:border-emerald-400/70 text-emerald-200 hover:text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2 backdrop-blur shadow-sm transform hover:-translate-y-0.5"
                >
                  <Bot className="w-4 h-4 text-amber-400" />
                  <span>Launch FarmMate AI</span>
                </button>
              ) : (
                <Link to="/ask-ai">
                  <button className="px-6 py-3.5 rounded-full bg-emerald-950/70 hover:bg-emerald-900/60 border border-emerald-500/35 hover:border-emerald-400/70 text-emerald-200 hover:text-white font-semibold text-sm transition-all duration-300 flex items-center gap-2 backdrop-blur shadow-sm transform hover:-translate-y-0.5">
                    <Bot className="w-4 h-4 text-amber-400" />
                    <span>Launch FarmMate AI</span>
                  </button>
                </Link>
              )}

              <Link to="/market-insights">
                <button className="px-5 py-3.5 rounded-full bg-transparent hover:bg-white/5 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Live Mandi</span>
                </button>
              </Link>
            </div>

            {/* Animated Counters Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-emerald-500/20">
              <div className="p-3.5 rounded-2xl bg-emerald-900/30 border border-emerald-500/15">
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-white font-mono">
                  {farmersCount}K+
                </div>
                <div className="text-[11px] uppercase tracking-wider text-emerald-300/70 font-semibold mt-0.5">
                  Active Farmers
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-900/30 border border-emerald-500/15">
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-amber-300 font-mono">
                  {accuracyCount}%
                </div>
                <div className="text-[11px] uppercase tracking-wider text-emerald-300/70 font-semibold mt-0.5">
                  AI Accuracy
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-900/30 border border-emerald-500/15">
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-white font-mono">
                  {cropsCount}+
                </div>
                <div className="text-[11px] uppercase tracking-wider text-emerald-300/70 font-semibold mt-0.5">
                  Tested Crops
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-900/30 border border-emerald-500/15">
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-300 font-mono">
                  6
                </div>
                <div className="text-[11px] uppercase tracking-wider text-emerald-300/70 font-semibold mt-0.5">
                  Languages
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: 3D PARALLAX HERO CARD & FLOATING WIDGETS       */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 relative">
            <div
              style={{
                transform: `perspective(1000px) rotateY(${mouseOffset.x * 0.4}deg) rotateX(${-mouseOffset.y * 0.4}deg)`,
                transition: "transform 0.2s ease-out",
              }}
              className="relative rounded-3xl p-2 bg-gradient-to-br from-emerald-500/30 via-emerald-800/20 to-amber-500/30 border border-emerald-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(16,185,129,0.25)]"
            >
              {/* Inner Main Image Container */}
              <div className="relative rounded-[22px] overflow-hidden bg-emerald-950">
                <img
                  src={heroImg}
                  alt="Farm to Field Hub — Smart precision agriculture"
                  className="w-full h-auto object-cover rounded-[22px] transform hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent" />

                {/* Overlaid Badges inside image */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white">Live Field Telemetry</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-emerald-950/85 border border-emerald-500/30 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-300/70">
                        Soil Health Index
                      </div>
                      <div className="text-xs font-bold text-white">
                        Optimal · 94% NPK Harmony
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
                    Grade A
                  </span>
                </div>
              </div>

              {/* Floating Glass Widget 1: Top Right */}
              <div
                style={{
                  transform: `translate(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px)`,
                  transition: "transform 0.2s ease-out",
                }}
                className="hidden sm:flex absolute -top-6 -right-6 items-center gap-3 p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-400/40 backdrop-blur-xl shadow-2xl animate-float-slow"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-amber-300/80">
                    Wheat Mandi APMC
                  </div>
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>₹2,450 / qtl</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">(+4.2%)</span>
                  </div>
                </div>
              </div>

              {/* Floating Glass Widget 2: Bottom Left */}
              <div
                style={{
                  transform: `translate(${mouseOffset.x * 0.7}px, ${mouseOffset.y * 0.7}px)`,
                  transition: "transform 0.2s ease-out",
                  animationDelay: "2s",
                }}
                className="hidden sm:flex absolute -bottom-6 -left-6 items-center gap-3 p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-400/40 backdrop-blur-xl shadow-2xl animate-float-slow"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-teal-300" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-teal-300/80">
                    FarmMate AI
                  </div>
                  <div className="text-xs font-bold text-white">
                    24/7 Smart Advisory Ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
