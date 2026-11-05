import React, { useState } from 'react';
import { OFFICIAL_VARIANTS, RoadsterVariant } from '../data/roadsterWorldData';

interface VariantComparisonMatrixProps {
  onSelectVariantForReserve: (variant: RoadsterVariant) => void;
}

export const VariantComparisonMatrix: React.FC<VariantComparisonMatrixProps> = ({
  onSelectVariantForReserve,
}) => {
  const [selectedId, setSelectedId] = useState<RoadsterVariant['id']>('rocket');

  const activeVariant =
    OFFICIAL_VARIANTS.find((v) => v.id === selectedId) || OFFICIAL_VARIANTS[2];

  return (
    <section
      id="variants-matrix"
      className="relative z-20 w-full bg-[#09090B] py-24 px-5 md:px-12 border-t border-white/10"
    >
      <div className="max-w-[1440px] mx-auto space-y-12">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F4F4F6]">
            Three official configurations.{' '}
            <span className="font-light text-[#D4AF37]">
              Road, track, and brief flight.
            </span>
          </h2>
          <p className="text-sm md:text-base text-[#D4D4D8]">
            Select a configuration to compare propulsion hardware, nitrogen COPV capacity, and seating layout.
          </p>
        </div>

        {/* Asymmetric 12-Column Interactive Variant Showroom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 5 Columns: Interactive Variant Selector Stack */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {OFFICIAL_VARIANTS.map((variant) => {
              const isSelected = variant.id === activeVariant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedId(variant.id)}
                  className={`w-full text-left rounded-2xl p-6 transition-all duration-300 border ${
                    isSelected
                      ? 'liquid-glass border-[#D4AF37] shadow-[0_20px_50px_rgba(212,175,55,0.14)]'
                      : 'bg-[#121216]/60 border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono-tech uppercase tracking-[0.14em] text-[#D4AF37]">
                        {variant.tierBadge}
                      </span>
                      <h3 className="font-display text-2xl font-semibold text-[#F4F4F6] mt-1">
                        {variant.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-display font-semibold text-[#F4F4F6] font-mono-tech">
                        {variant.zeroToSixty}
                      </span>
                      <p className="text-[11px] font-mono-tech uppercase tracking-[0.12em] text-[#A1A1AA]">
                        0-60 MPH
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#D4D4D8] mt-3 leading-relaxed">
                    {variant.signatureCapability}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right 7 Columns: Active Variant Full-Bleed Visual + Spec Card Grid */}
          <div className="lg:col-span-7 liquid-glass rounded-2xl overflow-hidden flex flex-col justify-between">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={activeVariant.photoUrl}
                alt={activeVariant.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              <div className="hero-bottom-scrim absolute inset-0" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-xs font-mono-tech uppercase tracking-[0.16em] text-[#D4AF37]">
                    {activeVariant.tierBadge}
                  </p>
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-[#F4F4F6]">
                    {activeVariant.name}
                  </p>
                </div>
                <span className="text-xs font-mono-tech text-[#F4F4F6] bg-[#09090B]/80 px-3 py-1.5 rounded-full border border-white/15">
                  {activeVariant.depositAmount}
                </span>
              </div>
            </div>

            {/* 2x2 Spec Card Grid (taste-skill Section 4.9 compliant) */}
            <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#09090B]/70 border border-white/10">
                <p className="text-[11px] font-mono-tech uppercase tracking-[0.14em] text-[#A1A1AA]">
                  COCKPIT SEATING
                </p>
                <p className="text-base font-medium text-[#F4F4F6] mt-1">
                  {activeVariant.seating}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#09090B]/70 border border-white/10">
                <p className="text-[11px] font-mono-tech uppercase tracking-[0.14em] text-[#A1A1AA]">
                  PROPULSION SYSTEM
                </p>
                <p className="text-base font-medium text-[#F4F4F6] mt-1">
                  {activeVariant.propulsionArchitecture}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#09090B]/70 border border-white/10">
                <p className="text-[11px] font-mono-tech uppercase tracking-[0.14em] text-[#A1A1AA]">
                  COPV NITROGEN CAPACITY
                </p>
                <p className="text-base font-medium text-[#F4F4F6] mt-1">
                  {activeVariant.copvCapacity}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#09090B]/70 border border-white/10">
                <p className="text-[11px] font-mono-tech uppercase tracking-[0.14em] text-[#A1A1AA]">
                  AERO & THRUSTER CHANNELS
                </p>
                <p className="text-base font-medium text-[#F4F4F6] mt-1">
                  {activeVariant.nozzleCount}
                </p>
              </div>
            </div>

            <div className="px-6 md:px-8 pb-6 md:pb-8 flex items-center justify-between gap-4">
              <p className="text-xs font-mono-tech text-[#A1A1AA]">
                1000V Structural Battery · 500 kW Supercharging
              </p>
              <button
                type="button"
                onClick={() => onSelectVariantForReserve(activeVariant)}
                className="px-6 py-3 rounded-full bg-[#F4F4F6] text-[#09090B] text-sm font-semibold hover:bg-[#D4AF37] active:scale-[0.98] transition-all whitespace-nowrap"
              >
                Reserve Roadster
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

