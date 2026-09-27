import { Sprout, Heart, Shield, Sparkles, Leaf, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="about" className="relative pt-20 pb-12 bg-emerald-950/80 border-t border-emerald-500/20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-500 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-display font-extrabold text-white">
                Farm to Field <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">Hub</span>
              </span>
            </Link>

            <p className="text-sm text-emerald-200/70 max-w-sm leading-relaxed">
              Smart technology for smarter farming. Connecting farmers, crops, markets, and precision agricultural insights with AI-driven intelligence.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Powered by Next-Gen AgriTech
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300/90">
              Platform Features
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/70">
              <li>
                <Link to="/crop-advisor" className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  Crop Advisor <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/disease-detection" className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  Disease Detection <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/market-insights" className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  Market Mandi Insights <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/ask-ai" className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  FarmMate AI Assistant <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/robo" className="hover:text-emerald-300 transition-colors flex items-center gap-1">
                  3D Cyber Robo <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300/90">
              Resources & Insights
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/70">
              <li>
                <Link to="/community" className="hover:text-emerald-300 transition-colors">
                  Farmer Community
                </Link>
              </li>
              <li>
                <a href="#weather" className="hover:text-emerald-300 transition-colors">
                  Hyperlocal Weather
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-emerald-300 transition-colors">
                  Soil Health Analytics
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-emerald-300 transition-colors">
                  Precision Irrigation
                </a>
              </li>
            </ul>
          </div>

          {/* Creator & Credits Card */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              About the Creator
            </h4>
            <div className="p-4 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 backdrop-blur space-y-2">
              <p className="text-xs text-emerald-200/80">
                Created & engineered by:
              </p>
              <p className="text-base font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Anurag
              </p>
              <p className="text-xs text-emerald-300/70">
                Dedicated to empowering Indian farmers through modern artificial intelligence and intuitive technology.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-emerald-200">Farm to Field Hub</span>. All rights reserved.
          </p>
          <p className="flex items-center gap-1 font-medium text-emerald-200">
            Smart technology for smarter farming. · <span className="text-amber-400">Developed by Anurag</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
