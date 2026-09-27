import { Sprout, Menu, X, Sparkles, Bot, CloudSun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  onOpenFarmMate?: () => void;
}

const Header = ({ onOpenFarmMate }: HeaderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "Crops", href: "/crop-advisor" },
    { name: "Weather", href: "/#weather" },
    { name: "Market", href: "/market-insights" },
    { name: "FarmMate AI", href: "/ask-ai", isAI: true },
    { name: "About", href: "/#about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) {
      return location.pathname === "/" && location.hash === href.substring(1);
    }
    return location.pathname.startsWith(href);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (link.isAI && onOpenFarmMate) {
      e.preventDefault();
      onOpenFarmMate();
      setMobileMenuOpen(false);
      return;
    }
    if (link.href.startsWith("/#") && location.pathname === "/") {
      e.preventDefault();
      const id = link.href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 md:px-8 py-3">
      <div
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-emerald-950/80 backdrop-blur-xl border border-emerald-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-emerald-950/50 backdrop-blur-md border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-green-600 to-amber-500 p-0.5 shadow-[0_0_20px_rgba(16,185,129,0.35)] group-hover:shadow-[0_0_28px_rgba(16,185,129,0.6)] transition-all duration-300">
              <div className="w-full h-full bg-emerald-950/90 rounded-[10px] flex items-center justify-center">
                <Sprout className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-display font-extrabold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                Farm to Field <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">Hub</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-400 font-semibold hidden sm:flex items-center gap-1">
                <span>Smart AgriTech</span>
                <span className="text-amber-400">· By Anurag</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-emerald-900/30 border border-emerald-500/15">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? "text-emerald-950 bg-gradient-to-r from-emerald-300 to-amber-300 shadow-[0_0_14px_rgba(52,211,153,0.4)]"
                      : link.isAI
                      ? "text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30"
                      : "text-emerald-100/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.isAI && <Bot className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Area: Language + Auth */}
          <div className="flex items-center gap-2.5">
            <LanguageSelector />

            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs text-emerald-200/80 max-w-[120px] truncate px-2 py-1 rounded-md bg-emerald-900/40 border border-emerald-500/20">
                  {user.email}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogout}
                  className="rounded-full text-xs h-8 px-3 border-emerald-500/30 text-emerald-200 hover:bg-emerald-900/50 hover:text-white"
                >
                  {t("nav.logout")}
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/auth"
                  className="text-xs font-semibold text-emerald-200/90 hover:text-white px-3 py-1.5 transition-colors"
                >
                  {t("nav.login")}
                </Link>
                <Link to="/auth">
                  <Button
                    size="sm"
                    className="rounded-full text-xs h-8 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-emerald-950 font-bold shadow-[0_0_16px_rgba(16,185,129,0.35)]"
                  >
                    {t("nav.signup")}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-xl bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:text-white hover:bg-emerald-800/40 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-5 border-t border-emerald-500/20 bg-emerald-950/95 backdrop-blur-2xl rounded-b-2xl animate-fade-in">
            <nav className="flex flex-col gap-1.5 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : link.isAI
                      ? "bg-amber-500/10 text-amber-300 border border-amber-500/25"
                      : "text-emerald-100/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.isAI && <Bot className="w-4 h-4 text-amber-400" />}
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-emerald-500/20 flex flex-col gap-2">
              {user ? (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-300 truncate max-w-[180px]">
                    {user.email}
                  </span>
                  <Button size="sm" variant="outline" onClick={handleLogout} className="text-xs h-8">
                    {t("nav.logout")}
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full text-xs h-9 border-emerald-500/30 text-emerald-200">
                      {t("nav.login")}
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full text-xs h-9 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold">
                      {t("nav.signup")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
