import React, { useState, useMemo } from 'react';
import { SaleBanner } from './components/SaleBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { DesignCard } from './components/DesignCard';
import { TechniqueLab } from './components/TechniqueLab';
import { McpConnectorView } from './components/McpConnectorView';
import { AcademyView } from './components/AcademyView';
import { UnlimitedPricingView } from './components/UnlimitedPricingView';
import { RestyleDrawer } from './components/RestyleDrawer';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { PromptInspectorModal } from './components/PromptInspectorModal';
import { AnimatedBackgroundsView } from './components/AnimatedBackgroundsView';
import { Footer } from './components/Footer';

import { DESIGN_PROMPTS_CATALOG } from './data/motionsitesCatalog';
import { NavigationTab, PromptCategory, DesignPromptItem } from './types/catalog';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('explore');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [accessFilter, setAccessFilter] = useState<'all' | 'free' | 'pro'>('all');
  const [gridColumns, setGridColumns] = useState<2 | 3>(3);
  const [autoPlayPreviews, setAutoPlayPreviews] = useState<boolean>(true);

  const [inspectedPrompt, setInspectedPrompt] = useState<DesignPromptItem | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isRestyleOpen, setIsRestyleOpen] = useState(false);

  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToGallery = () => {
    const el = document.getElementById('gallery-shelf');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered designs based on activeTab, selectedCategory, accessFilter, and searchQuery
  const filteredDesigns = useMemo(() => {
    return DESIGN_PROMPTS_CATALOG.filter((item) => {
      // Tab filter
      if (activeTab === '3d-websites') {
        const matchesTab =
          item.navSection.includes('3d-websites') ||
          item.categories.includes('3D Website') ||
          item.categories.includes('3D');
        if (!matchesTab) return false;
      } else if (activeTab === 'sections') {
        if (!item.navSection.includes('sections') && !item.categories.includes('Sections')) {
          return false;
        }
      } else if (activeTab === 'apps') {
        if (!item.navSection.includes('apps') && !item.categories.includes('Apps')) {
          return false;
        }
      }

      // Category filter (mainly on explore or if specified)
      if (selectedCategory !== 'All') {
        if (!item.categories.includes(selectedCategory)) return false;
      }

      // Access Filter: all | free | pro
      if (accessFilter === 'free' && !item.isFreeSample) return false;
      if (accessFilter === 'pro' && item.isFreeSample) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSubtitle = item.subtitle.toLowerCase().includes(q);
        const matchesBadge = item.badge.toLowerCase().includes(q);
        const matchesTech = item.techStack.some((t) => t.toLowerCase().includes(q));
        const matchesTechniques = item.techniques.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubtitle && !matchesBadge && !matchesTech && !matchesTechniques) {
          return false;
        }
      }

      return true;
    });
  }, [activeTab, selectedCategory, accessFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0A061A] text-white flex flex-col selection:bg-purple-500/40 selection:text-white">
      {/* 1. Founding Members Sale Countdown Bar */}
      <SaleBanner onNavigateTab={handleTabChange} />

      {/* 2. Fixed Liquid-Glass Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenRestyle={() => setIsRestyleOpen(true)}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1">
        {/* EXPLORE TAB (Full Platform Overview) */}
        {activeTab === 'explore' && (
          <>
            {/* Hero Section with Live 3-Engine Showcase Widget */}
            <HeroSection
              onInspectPrompt={setInspectedPrompt}
              onNavigateTab={handleTabChange}
              onScrollToGallery={handleScrollToGallery}
            />

            {/* Category Filter Bar */}
            <CategoryFilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              accessFilter={accessFilter}
              onAccessFilterChange={setAccessFilter}
              gridColumns={gridColumns}
              onGridColumnsChange={setGridColumns}
              autoPlayPreviews={autoPlayPreviews}
              onToggleAutoPlay={() => setAutoPlayPreviews((p) => !p)}
              totalCount={filteredDesigns.length}
            />

            {/* Flagship Design Cards Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-10">
              {filteredDesigns.length === 0 ? (
                <div className="text-center py-20 liquid-glass rounded-3xl p-8 max-w-md mx-auto">
                  <p className="text-white/60 text-sm mb-3">No prompts match your current filters.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                      setAccessFilter('all');
                    }}
                    className="bg-white text-black px-4 py-2 rounded-full text-xs font-medium cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div
                  className={`grid gap-6 ${
                    gridColumns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {filteredDesigns.map((item) => (
                    <DesignCard
                      key={item.id}
                      item={item}
                      autoPlayPreviews={autoPlayPreviews}
                      onInspect={setInspectedPrompt}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Technique Lab */}
            <TechniqueLab />

            {/* MCP Connector View Section */}
            <McpConnectorView onInspectPrompt={setInspectedPrompt} />

            {/* Academy View Section */}
            <AcademyView onInspectPrompt={setInspectedPrompt} />

            {/* Unlimited Pricing View Section */}
            <UnlimitedPricingView />
          </>
        )}

        {/* 3D WEBSITES DEDICATED VIEW */}
        {activeTab === '3d-websites' && (
          <div>
            <div className="pt-12 pb-6 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto text-center">
              <span className="liquid-glass px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300 inline-block mb-3">
                100+ Flagship 3D Website Prompts
              </span>
              <h2 className="text-4xl sm:text-5xl font-light text-white">
                Spatial & 3D <span className="shimmer-superpowers">Website Prompts</span>
              </h2>
              <p className="text-white/60 text-sm max-w-xl mx-auto mt-3">
                WebGL point-clouds, Three.js product turntables, and mouse-reactive 3D spatial scenes configured for instant compilation.
              </p>
            </div>

            <CategoryFilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              accessFilter={accessFilter}
              onAccessFilterChange={setAccessFilter}
              gridColumns={gridColumns}
              onGridColumnsChange={setGridColumns}
              autoPlayPreviews={autoPlayPreviews}
              onToggleAutoPlay={() => setAutoPlayPreviews((p) => !p)}
              totalCount={filteredDesigns.length}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-10">
              <div
                className={`grid gap-6 ${
                  gridColumns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {filteredDesigns.map((item) => (
                  <DesignCard
                    key={item.id}
                    item={item}
                    autoPlayPreviews={autoPlayPreviews}
                    onInspect={setInspectedPrompt}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTIONS DEDICATED VIEW */}
        {activeTab === 'sections' && (
          <div>
            <div className="pt-12 pb-6 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto text-center">
              <span className="liquid-glass px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300 inline-block mb-3">
                Modular Conversion Blocks
              </span>
              <h2 className="text-4xl sm:text-5xl font-light text-white">
                High-Impact <span className="shimmer-superpowers">Website Sections</span>
              </h2>
              <p className="text-white/60 text-sm max-w-xl mx-auto mt-3">
                Bento spotlights, halftone pricing grids, interactive FAQ accordions, and hero conversions.
              </p>
            </div>

            <CategoryFilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              accessFilter={accessFilter}
              onAccessFilterChange={setAccessFilter}
              gridColumns={gridColumns}
              onGridColumnsChange={setGridColumns}
              autoPlayPreviews={autoPlayPreviews}
              onToggleAutoPlay={() => setAutoPlayPreviews((p) => !p)}
              totalCount={filteredDesigns.length}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-10">
              <div
                className={`grid gap-6 ${
                  gridColumns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {filteredDesigns.map((item) => (
                  <DesignCard
                    key={item.id}
                    item={item}
                    autoPlayPreviews={autoPlayPreviews}
                    onInspect={setInspectedPrompt}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* APPS DEDICATED VIEW */}
        {activeTab === 'apps' && (
          <div>
            <div className="pt-12 pb-6 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto text-center">
              <span className="liquid-glass px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300 inline-block mb-3">
                Next-Gen Web Applications
              </span>
              <h2 className="text-4xl sm:text-5xl font-light text-white">
                AI Apps & <span className="shimmer-superpowers">Command Shells</span>
              </h2>
              <p className="text-white/60 text-sm max-w-xl mx-auto mt-3">
                Full-screen glassmorphic application layouts, command palettes, telemetry HUDs, and real-time agent streams.
              </p>
            </div>

            <CategoryFilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              accessFilter={accessFilter}
              onAccessFilterChange={setAccessFilter}
              gridColumns={gridColumns}
              onGridColumnsChange={setGridColumns}
              autoPlayPreviews={autoPlayPreviews}
              onToggleAutoPlay={() => setAutoPlayPreviews((p) => !p)}
              totalCount={filteredDesigns.length}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-10">
              <div
                className={`grid gap-6 ${
                  gridColumns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {filteredDesigns.map((item) => (
                  <DesignCard
                    key={item.id}
                    item={item}
                    autoPlayPreviews={autoPlayPreviews}
                    onInspect={setInspectedPrompt}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BACKGROUNDS DEDICATED VIEW */}
        {activeTab === 'backgrounds' && <AnimatedBackgroundsView />}

        {/* MCP DEDICATED VIEW */}
        {activeTab === 'mcp' && <McpConnectorView onInspectPrompt={setInspectedPrompt} />}

        {/* ACADEMY DEDICATED VIEW */}
        {activeTab === 'academy' && <AcademyView onInspectPrompt={setInspectedPrompt} />}

        {/* UNLIMITED PRICING DEDICATED VIEW */}
        {activeTab === 'unlimited' && <UnlimitedPricingView />}
      </main>

      {/* Global Modals & Drawers */}
      <PromptInspectorModal
        item={inspectedPrompt}
        onClose={() => setInspectedPrompt(null)}
      />

      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectDesign={setInspectedPrompt}
        onNavigateTab={handleTabChange}
        onOpenRestyle={() => setIsRestyleOpen(true)}
      />

      <RestyleDrawer
        isOpen={isRestyleOpen}
        onClose={() => setIsRestyleOpen(false)}
      />

      {/* 9. Global Liquid Glass Footer */}
      <Footer
        onNavigateTab={handleTabChange}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenRestyle={() => setIsRestyleOpen(true)}
      />
    </div>
  );
};

export default App;

