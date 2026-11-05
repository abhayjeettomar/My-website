import React from 'react';
import { motion } from 'framer-motion';
import { Search, LayoutGrid, Grid3X3, Play, Pause } from 'lucide-react';
import { PromptCategory } from '../types/catalog';
import { ALL_CATEGORIES } from '../data/motionsitesCatalog';

interface CategoryFilterBarProps {
  selectedCategory: PromptCategory;
  onSelectCategory: (cat: PromptCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  accessFilter: 'all' | 'free' | 'pro';
  onAccessFilterChange: (filter: 'all' | 'free' | 'pro') => void;
  gridColumns: 2 | 3;
  onGridColumnsChange: (cols: 2 | 3) => void;
  autoPlayPreviews: boolean;
  onToggleAutoPlay: () => void;
  totalCount: number;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  accessFilter,
  onAccessFilterChange,
  gridColumns,
  onGridColumnsChange,
  autoPlayPreviews,
  onToggleAutoPlay,
  totalCount,
}) => {
  return (
    <div id="gallery-shelf" className="sticky top-[68px] z-40 bg-[#0A061A]/90 backdrop-blur-xl border-y border-white/10 py-3.5 px-4 sm:px-8 md:px-12 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Top Controls Row: Search + Access Filter + Grid & Auto-play Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder='Search "liquid glass", "scroll 3d", "agency", "fintech"...'
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Access Filter: All, Free Samples (3), Unlimited Pro */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10">
            <button
              onClick={() => onAccessFilterChange('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                accessFilter === 'all'
                  ? 'bg-white text-black shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              All Prompts ({totalCount})
            </button>
            <button
              onClick={() => onAccessFilterChange('free')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                accessFilter === 'free'
                  ? 'bg-emerald-500 text-white shadow'
                  : 'text-emerald-400/80 hover:text-emerald-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Free Samples (3)
            </button>
            <button
              onClick={() => onAccessFilterChange('pro')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                accessFilter === 'pro'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-purple-300/80 hover:text-purple-200'
              }`}
            >
              Unlimited Pro
            </button>
          </div>

          {/* Density & Autoplay Switchers */}
          <div className="flex items-center gap-2">
            {/* Auto Play Toggle */}
            <button
              onClick={onToggleAutoPlay}
              className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 border transition-all cursor-pointer ${
                autoPlayPreviews
                  ? 'bg-purple-500/20 text-purple-200 border-purple-400/40'
                  : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
              }`}
              title={autoPlayPreviews ? 'Pause Video Previews' : 'Auto-Play Video Previews'}
            >
              {autoPlayPreviews ? <Pause className="w-3 h-3 text-purple-400" /> : <Play className="w-3 h-3 text-white/60" />}
              <span className="hidden sm:inline">Auto-Play Previews</span>
            </button>

            {/* Grid layout switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10">
              <button
                onClick={() => onGridColumnsChange(2)}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  gridColumns === 2 ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                }`}
                title="Cinema 2-Column Grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onGridColumnsChange(3)}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  gridColumns === 3 ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                }`}
                title="Bento 3-Column Grid"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Category Scroll Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {ALL_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  isSelected ? 'text-white' : 'text-white/65 hover:text-white hover:bg-white/5'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 bg-white/15 border border-white/30 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

