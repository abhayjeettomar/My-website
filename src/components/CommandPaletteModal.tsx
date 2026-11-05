import React, { useState, useEffect } from 'react';
import { Search, X, Wand2, Plug, BookOpen, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { DESIGN_PROMPTS_CATALOG } from '../data/motionsitesCatalog';
import { DesignPromptItem, NavigationTab } from '../types/catalog';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDesign: (item: DesignPromptItem) => void;
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenRestyle: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectDesign,
  onNavigateTab,
  onOpenRestyle,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredDesigns = DESIGN_PROMPTS_CATALOG.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.badge.toLowerCase().includes(query.toLowerCase()) ||
      item.techniques.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const quickActions = [
    {
      id: 'restyle',
      label: 'Restyle Existing Website with MotionSites AI',
      icon: Wand2,
      action: () => {
        onClose();
        onOpenRestyle();
      },
    },
    {
      id: 'mcp',
      label: 'Connect Antigravity IDE or Claude to MotionSites MCP',
      icon: Plug,
      action: () => {
        onClose();
        onNavigateTab('mcp');
      },
    },
    {
      id: 'academy',
      label: 'Open MotionSites Interactive Academy',
      icon: BookOpen,
      action: () => {
        onClose();
        onNavigateTab('academy');
      },
    },
    {
      id: 'pricing',
      label: 'View Lifetime Deal & Prompt Packs ($399)',
      icon: Sparkles,
      action: () => {
        onClose();
        onNavigateTab('unlimited');
      },
    },
  ];

  const filteredActions = quickActions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-xl">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="liquid-glass-strong rounded-3xl max-w-2xl w-full border border-white/20 shadow-2xl relative z-10 overflow-hidden">
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-purple-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search designs (e.g., 'liquid glass', 'mcp', '3d')..."
            className="flex-1 bg-transparent text-white text-sm placeholder-white/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/50 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Quick Actions */}
          {filteredActions.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-purple-300 px-3 mb-2">
                Quick Actions
              </div>
              <div className="space-y-1">
                {filteredActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 text-white text-xs transition-colors text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                        <span>{action.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Design Prompts */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-purple-300 px-3 mb-2 flex items-center justify-between">
              <span>Matching Design Prompts</span>
              <span className="text-white/40">{filteredDesigns.length} found</span>
            </div>
            {filteredDesigns.length === 0 ? (
              <div className="text-center py-8 text-xs text-white/40 font-light">
                No designs match "{query}". Try searching "agency", "scroll 3d", or "saas".
              </div>
            ) : (
              <div className="space-y-1">
                {filteredDesigns.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onClose();
                      onSelectDesign(item);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 text-white text-xs transition-colors text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-black/40 overflow-hidden shrink-0 border border-white/10">
                        <img
                          src={item.posterUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="truncate">
                        <div className="font-medium text-white group-hover:text-purple-300 transition-colors truncate">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-white/50 truncate">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                        {item.badge}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer shortcuts info */}
        <div className="px-5 py-2.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 font-mono">
          <span>Press ESC to close</span>
          <span>Google Antigravity IDE Ready</span>
        </div>
      </div>
    </div>
  );
};

