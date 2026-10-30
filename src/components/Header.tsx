import React, { useState, useEffect } from 'react';
import { Box, Cpu, Sparkles, Menu, X, ArrowUpRight, Layers } from 'lucide-react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'AI Solutions', href: '#solutions' },
    { name: '3D Designs', href: '#3d-designs' },
    { name: 'Project Planner', href: '#project-planner' },
    { name: 'Intelligence', href: '#intelligence' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-navy-950/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-royal-600 to-violet-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-navy-900 rounded-[11px] flex items-center justify-center">
                <Box className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-space font-extrabold text-xl tracking-wider text-white">
                  AI <span className="gradient-text-cyan">POWER</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase hidden sm:block">
                BUILDING & CONSTRUCTION INTELLIGENCE
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-800/80">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60 rounded-full transition-all duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#project-planner"
              onClick={(e) => handleNavClick(e, '#project-planner')}
              className="btn-cyber-primary group"
            >
              <Sparkles className="w-4 h-4 mr-1.5 text-navy-950 group-hover:rotate-12 transition-transform" />
              <span>Launch AI Workspace</span>
              <ArrowUpRight className="w-4 h-4 ml-1 text-navy-950" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-200 hover:text-cyan-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-navy-900/95 backdrop-blur-2xl border-b border-cyan-500/30 p-6 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:text-cyan-300 hover:bg-slate-800/60 border border-transparent hover:border-cyan-500/20"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800">
              <a
                href="#project-planner"
                onClick={(e) => handleNavClick(e, '#project-planner')}
                className="w-full btn-cyber-primary justify-center"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Launch AI Workspace</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
