import React from 'react';
import { Sparkles, Terminal, Shield, ArrowUp, Code2 } from 'lucide-react';
import { NavigationTab } from '../types/catalog';

interface FooterProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenCommandPalette: () => void;
  onOpenRestyle: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenCommandPalette,
  onOpenRestyle,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-24 border-t border-white/10 bg-[#070412]/80 backdrop-blur-2xl relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 p-[1.5px]">
                <div className="w-full h-full bg-[#0A061A] rounded-[6px] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                </div>
              </div>
              <span className="font-light tracking-tight text-white text-lg font-display">
                MotionSites <span className="text-[10px] font-mono text-purple-400">AI</span>
              </span>
            </div>
            <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed mb-6 max-w-sm">
              The premier platform for award-winning 3D website prompts, scroll choreography, and shader-grade liquid glass interfaces engineered for Google Antigravity IDE and modern AI builders.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-400/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-4">
              Navigation
            </div>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button
                  onClick={() => onNavigateTab('explore')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('3d-websites')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  3D Websites (100+)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('sections')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Website Sections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('apps')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI Apps & Dashboards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('backgrounds')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Animated Backgrounds
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Integrations & Hub */}
          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-4">
              Resources & Hub
            </div>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button
                  onClick={() => onNavigateTab('mcp')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  MotionSites MCP Connector
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('academy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Academy Interactive Lessons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('unlimited')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Unlimited Pricing & Lifetime Deal
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRestyle}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Restyle Existing Website
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCommandPalette}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Command Palette</span>
                  <kbd className="text-[10px] font-mono bg-white/10 px-1 py-0.2 rounded text-white/60">
                    ⌘K
                  </kbd>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Builders & Scroll-to-top */}
          <div className="md:col-span-2 flex flex-col justify-between items-start md:items-end">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-purple-300 mb-4">
                Supported Builders
              </div>
              <div className="space-y-1.5 text-xs text-white/60">
                <div>Antigravity IDE</div>
                <div>Claude Code</div>
                <div>Cursor Composer</div>
                <div>Lovable.dev</div>
                <div>Bolt.new</div>
                <div>v0.dev</div>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 md:mt-0 p-2.5 rounded-full liquid-glass hover:bg-white/15 text-white/80 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span>© 2026 MotionSites AI · Built with Google Antigravity IDE</span>
          </div>

          <div className="flex items-center gap-4 text-white/40">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span className="text-purple-300">Commercial License Included</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

