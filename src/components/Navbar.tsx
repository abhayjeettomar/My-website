import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Wand2, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationTab } from '../types/catalog';

interface NavbarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onOpenCommandPalette: () => void;
  onOpenRestyle: () => void;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'explore', label: 'Explore' },
  { id: '3d-websites', label: '3D Websites', badge: '100+' },
  { id: 'sections', label: 'Sections' },
  { id: 'apps', label: 'Apps', badge: 'NEW' },
  { id: 'backgrounds', label: 'Backgrounds' },
  { id: 'mcp', label: 'MCP', badge: 'NEW' },
  { id: 'academy', label: 'Academy' },
  { id: 'unlimited', label: 'Pricing' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenCommandPalette,
  onOpenRestyle,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenCommandPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenCommandPalette]);

  return (
    <>
      <header className="sticky top-0 z-50 px-4 sm:px-8 md:px-12 py-3.5 transition-all">
        <div className="liquid-glass-strong rounded-full max-w-7xl mx-auto px-5 py-2.5 flex items-center justify-between gap-4 shadow-2xl">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onTabChange('explore')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              {/* Custom Prism SVG Logo */}
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 p-[1.5px] transition-transform duration-500 group-hover:rotate-12">
                <div className="w-full h-full bg-[#0A061A] rounded-[10px] flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-4 h-4 text-purple-300 transition-colors group-hover:text-white"
                  >
                    <polygon
                      points="12 2 2 22 22 22"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="fill-purple-500/20"
                    />
                    <path
                      d="M12 2v20"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                      className="text-pink-300"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-light tracking-tight text-white text-lg font-display">
                  MotionSites
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  AI
                </span>
              </div>
            </button>

            {/* Live badge */}
            <div className="hidden xl:inline-flex items-center gap-1.5 text-[11px] text-white/60 pl-3 border-l border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Fresh Drops Everyday</span>
            </div>
          </div>

          {/* Center Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'border border-white/50 bg-white/10 text-white shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full font-semibold ${
                        item.badge === 'NEW'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/15 text-purple-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Command Search button */}
            <button
              onClick={onOpenCommandPalette}
              className="liquid-glass rounded-full px-3 py-1.5 text-xs text-white/75 hover:text-white flex items-center gap-2 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              title="Search and Commands (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-purple-300" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-flex items-center text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/60">
                ⌘K
              </kbd>
            </button>

            {/* Restyle Site button */}
            <button
              onClick={onOpenRestyle}
              className="liquid-glass rounded-full px-3.5 py-1.5 text-xs text-purple-200 hover:text-white flex items-center gap-1.5 border border-purple-400/30 hover:border-purple-400/60 transition-all cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5 text-purple-300" />
              <span className="hidden sm:inline font-medium">Restyle Site</span>
            </button>

            {/* Go Unlimited CTA */}
            <button
              onClick={() => onTabChange('unlimited')}
              className="bg-white text-black text-xs font-medium px-4 py-2 rounded-full hover:bg-purple-100 transition-all flex items-center gap-1 shadow-md cursor-pointer"
            >
              <span>Go Unlimited</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="lg:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 text-white cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-40 lg:hidden bg-[#0A061A]/95 backdrop-blur-2xl border-b border-white/10 p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2 max-w-md mx-auto">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-white/15 text-white border border-white/20'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white/40" />
                </button>
              ))}

              <div className="pt-4 border-t border-white/10 mt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRestyle();
                  }}
                  className="w-full liquid-glass py-2.5 rounded-xl text-xs font-medium text-purple-200 flex items-center justify-center gap-2"
                >
                  <Wand2 className="w-4 h-4 text-purple-400" />
                  Restyle Existing Website
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onTabChange('unlimited');
                  }}
                  className="w-full bg-white text-black py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
                >
                  Claim Lifetime Deal $399
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

