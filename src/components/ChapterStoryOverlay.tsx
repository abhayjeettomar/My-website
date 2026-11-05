import React from 'react';
import { WORLD_CHAPTERS } from '../data/roadsterWorldData';

interface ChapterStoryOverlayProps {
  activeChapterIndex: number;
  onSelectChapter: (index: number) => void;
  onOpenReserve: () => void;
}

export const ChapterStoryOverlay: React.FC<ChapterStoryOverlayProps> = ({
  activeChapterIndex,
  onSelectChapter,
  onOpenReserve,
}) => {
  return (
    <section
      id="world-journey"
      aria-label="2026 Tesla Roadster Continuous Camera Journey"
      className="relative z-10 w-full"
    >
      {/* Fixed Right-Edge Route Rail (oso95/scroll-world pattern) */}
      <aside
        aria-label="Chapter progress rail"
        className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3"
      >
        {WORLD_CHAPTERS.map((chap, idx) => {
          const isCurrent = idx === activeChapterIndex;
          return (
            <button
              key={chap.id}
              type="button"
              onClick={() => onSelectChapter(idx)}
              className="group flex items-center gap-3 py-1 focus:outline-none"
            >
              <span
                className={`text-[11px] font-mono-tech uppercase tracking-[0.12em] transition-all duration-200 ${
                  isCurrent
                    ? 'opacity-100 text-[#F4F4F6] translate-x-0'
                    : 'opacity-0 group-hover:opacity-80 text-[#A1A1AA] translate-x-2'
                }`}
              >
                {chap.id.replace('-', ' ')}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'w-7 h-1.5 bg-[#D4AF37]'
                    : 'w-2 h-1.5 bg-white/25 group-hover:bg-white/50'
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* Semantic Scroll Chapters driving the persistent WebGL camera */}
      {WORLD_CHAPTERS.map((chapter, index) => {
        const isHero = index === 0;
        const alignClass =
          chapter.alignment === 'center-right'
            ? 'md:justify-end md:items-center'
            : chapter.alignment === 'center-left'
            ? 'md:justify-start md:items-center'
            : 'md:justify-start md:items-end';

        const parts = chapter.headline.split(chapter.highlightPhrase);

        return (
          <article
            key={chapter.id}
            data-chapter-index={index}
            style={{ minHeight: `${chapter.scrollWeight * 100}dvh` }}
            className={`relative w-full max-w-[1440px] mx-auto px-5 md:px-12 pb-12 pt-24 flex flex-col justify-end ${alignClass} pointer-events-none`}
          >
            {isHero ? (
              /* Chapter 0: Viktor Oddy Bottom-Left Hero Architecture (Max 4 stack elements, fits viewport) */
              <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 pointer-events-auto">
                <div className="max-w-2xl space-y-4">
                  {chapter.eyebrow && (
                    <p className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#D4AF37]">
                      {chapter.eyebrow}
                    </p>
                  )}
                  <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.03] text-[#F4F4F6]">
                    {parts[0]}
                    <span className="font-light text-[#D4AF37]">
                      {chapter.highlightPhrase}
                    </span>
                    {parts[1] || ''}
                  </h1>
                  <p className="text-base md:text-lg text-[#F4F4F6] leading-relaxed max-w-[54ch]">
                    {chapter.body}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={onOpenReserve}
                      className="px-6 py-3.5 rounded-full bg-[#F4F4F6] text-[#09090B] text-sm font-semibold tracking-[0.02em] hover:bg-[#D4AF37] active:scale-[0.98] transition-all duration-200 whitespace-nowrap"
                    >
                      Reserve Roadster
                    </button>
                    <a
                      href="#axial-architecture"
                      className="px-6 py-3.5 rounded-full liquid-glass text-[#F4F4F6] text-sm font-medium hover:border-[#D4AF37]/60 active:scale-[0.98] transition-all duration-200 whitespace-nowrap"
                    >
                      Inspect Cold-Gas Hardware
                    </a>
                  </div>
                </div>

                {/* Hero Telemetry Strip in Liquid Glass */}
                <div className="liquid-glass rounded-2xl p-5 grid grid-cols-3 gap-6 lg:min-w-[420px]">
                  {chapter.telemetry.map((item) => (
                    <div key={item.label} className="space-y-1">
                      <p className="text-[11px] font-mono-tech uppercase tracking-[0.14em] text-[#A1A1AA]">
                        {item.label}
                      </p>
                      <p className="text-2xl md:text-3xl font-display font-semibold text-[#F4F4F6] font-mono-tech">
                        {item.value}
                        <span className="text-sm font-normal text-[#D4AF37] ml-1">
                          {item.unit}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Chapters 1-5: Physical Liquid Glass Story Cards with Secondary Detail Cutaway */
              <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-xl w-full space-y-5 pointer-events-auto">
                {chapter.eyebrow && (
                  <p className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#D4AF37]">
                    {chapter.eyebrow}
                  </p>
                )}
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] text-[#F4F4F6]">
                  {parts[0]}
                  <span className="font-light text-[#D4AF37]">
                    {chapter.highlightPhrase}
                  </span>
                  {parts[1] || ''}
                </h2>
                <p className="text-sm md:text-base text-[#F4F4F6] leading-relaxed">
                  {chapter.body}
                </p>

                {/* Secondary Angle Cutaway Photograph */}
                <div className="relative h-36 md:h-44 w-full rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={chapter.secondaryPhotoUrl}
                    alt={chapter.headline}
                    loading="lazy"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="pt-2 border-t border-white/10 grid grid-cols-3 gap-4">
                  {chapter.telemetry.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#A1A1AA]">
                        {metric.label}
                      </p>
                      <p className="text-lg md:text-xl font-display font-semibold text-[#F4F4F6] font-mono-tech mt-0.5">
                        {metric.value}{' '}
                        <span className="text-xs font-normal text-[#D4AF37]">
                          {metric.unit}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
};

