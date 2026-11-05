import React from 'react';
import { Check, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { ROADSTER_EDITIONS } from '../data/roadsterSpecs';
import { RoadsterEditionId } from '../types/roadster';

interface EditionsBentoSectionProps {
  selectedEdition: RoadsterEditionId;
  onSelectEdition: (id: RoadsterEditionId) => void;
  onOpenReserve: () => void;
}

export const EditionsBentoSection: React.FC<EditionsBentoSectionProps> = ({
  selectedEdition,
  onSelectEdition,
  onOpenReserve,
}) => {
  return (
    <section id="editions" className="py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="liquid-glass px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest text-amber-300 inline-block mb-4">
          04 // THREE ALLOCATION SPECIFICATIONS
        </span>
        <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white">
          Road Ready. Race Ready. <span className="gold-glazed-serif">Air Ready.</span>
        </h2>
        <p className="text-white/65 text-base font-light mt-4">
          From multi-mode ground-sealing track dominance to full-perimeter cold-gas flight capability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {ROADSTER_EDITIONS.map((edition) => {
          const isSelected = selectedEdition === edition.id;
          return (
            <div
              key={edition.id}
              onClick={() => onSelectEdition(edition.id)}
              className={`rounded-3xl p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                edition.id === 'race-ready'
                  ? 'gold-glazed-glass'
                  : 'liquid-glass spotlight-card'
              } ${isSelected ? 'ring-2 ring-amber-400/80 -translate-y-1' : 'hover:-translate-y-1'}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    style={{ color: edition.accentColor }}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold"
                  >
                    {edition.badge}
                  </span>
                  <span className="text-[11px] font-mono text-white/55">
                    {edition.seating}
                  </span>
                </div>

                <h3 className="text-3xl font-light text-white mb-2">
                  {edition.title}
                </h3>
                <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
                  {edition.description}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-black/55 border border-white/10 mb-6 font-mono">
                  <div>
                    <span className="text-[9px] text-white/45 block">0–60 MPH</span>
                    <span className="text-sm sm:text-base text-white font-semibold">
                      {edition.zeroToSixty}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/45 block">TOP SPEED</span>
                    <span className="text-sm sm:text-base text-white font-semibold">
                      {edition.topSpeed}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/45 block">RANGE</span>
                    <span className="text-sm sm:text-base text-amber-300 font-semibold">
                      {edition.rangeMiles}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-white/80 mb-6">
                  {edition.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {edition.note && (
                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/25 text-[11px] font-mono text-sky-200 mb-5 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{edition.note}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-xs font-mono text-white/60 mb-3">
                  {edition.basePriceLabel}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEdition(edition.id);
                    onOpenReserve();
                  }}
                  className="w-full py-3 px-4 rounded-full bg-white text-black hover:bg-amber-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <span>Select &amp; Reserve {edition.title}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

