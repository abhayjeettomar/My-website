import React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  ROADSTER_EDITIONS,
  EXTERIOR_COLORS,
  INTERIOR_TRIMS,
} from '../data/roadsterSpecs';
import { RoadsterEditionId } from '../types/roadster';
import { RoadsterAeroCanvas } from './RoadsterAeroCanvas';

interface RoadsterConfiguratorProps {
  selectedEdition: RoadsterEditionId;
  onSelectEdition: (id: RoadsterEditionId) => void;
  selectedColorId: string;
  onSelectColorId: (id: string) => void;
  selectedTrimId: string;
  onSelectTrimId: (id: string) => void;
  onOpenReserve: () => void;
}

export const RoadsterConfigurator: React.FC<RoadsterConfiguratorProps> = ({
  selectedEdition,
  onSelectEdition,
  selectedColorId,
  onSelectColorId,
  selectedTrimId,
  onSelectTrimId,
  onOpenReserve,
}) => {
  const activeEdition =
    ROADSTER_EDITIONS.find((e) => e.id === selectedEdition) ||
    ROADSTER_EDITIONS[1];

  const activeColor =
    EXTERIOR_COLORS.find((c) => c.id === selectedColorId) ||
    EXTERIOR_COLORS[0];

  const activeTrim =
    INTERIOR_TRIMS.find((t) => t.id === selectedTrimId) ||
    INTERIOR_TRIMS[0];

  const mappedDriveMode =
    selectedEdition === 'air-ready'
      ? 'air-hover'
      : selectedEdition === 'race-ready'
      ? 'spacex-thruster'
      : 'track-suction';

  return (
    <section id="configurator" className="py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <div className="mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300 block mb-2">
          07 // BESPOKE ALLOCATION STUDIO
        </span>
        <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white">
          Configure Your <span className="gold-glazed-serif">Roadster.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Sticky Live Configured Roadster Stage */}
        <div className="lg:col-span-7 gold-glazed-glass rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300 block">
                {activeEdition.badge}
              </span>
              <h3 className="text-2xl font-light text-white">
                Tesla Roadster — {activeEdition.title}
              </h3>
            </div>
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/10 text-white">
              {activeColor.name}
            </span>
          </div>

          <div className="h-64 sm:h-80 my-2">
            <RoadsterAeroCanvas
              driveMode={mappedDriveMode}
              primaryColorHex={activeColor.primaryHex}
              glazeColorHex={activeColor.glazeHex}
            />
          </div>

          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-white/10 font-mono text-center">
            <div>
              <span className="text-[10px] text-white/45 block">0–60 MPH</span>
              <span className="text-sm sm:text-base text-white font-semibold">
                {activeEdition.zeroToSixty}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-white/45 block">TOP SPEED</span>
              <span className="text-sm sm:text-base text-white font-semibold">
                {activeEdition.topSpeed}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-white/45 block">RANGE</span>
              <span className="text-sm sm:text-base text-amber-300 font-semibold">
                {activeEdition.rangeMiles}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-white/45 block">WHEEL TORQUE</span>
              <span className="text-sm sm:text-base text-white font-semibold">
                10,000 Nm
              </span>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Edition, Paint & Trim Selector */}
        <div className="lg:col-span-5 liquid-glass rounded-3xl p-6 sm:p-8 space-y-6">
          {/* 1. Edition */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-white/60 block mb-2.5">
              1. Select Propulsion &amp; Aero Edition
            </span>
            <div className="space-y-2">
              {ROADSTER_EDITIONS.map((ed) => (
                <button
                  key={ed.id}
                  onClick={() => onSelectEdition(ed.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedEdition === ed.id
                      ? 'bg-white/15 border-amber-400 text-white shadow-md'
                      : 'bg-black/40 border-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium">{ed.title}</div>
                    <div className="text-[11px] font-mono text-white/50">
                      0–60 in {ed.zeroToSixty} · {ed.thrusterSystem}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-amber-300">
                    ${ed.depositToday.toLocaleString()} Deposit
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Exterior Paint */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-white/60 block mb-2.5">
              2. Exterior Finish &amp; Gold-Glazed Canopy
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {EXTERIOR_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectColorId(c.id)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                    selectedColorId === c.id
                      ? 'bg-white/15 border-white text-white shadow-md'
                      : 'bg-black/40 border-white/10 text-white/65 hover:text-white'
                  }`}
                >
                  <span
                    style={{ backgroundColor: c.primaryHex }}
                    className="w-5 h-5 rounded-full border border-white/40 shrink-0"
                  />
                  <span className="text-xs font-medium truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Interior Cockpit Trim */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-white/60 block mb-2.5">
              3. Supersonic Cockpit Trim
            </span>
            <div className="space-y-2">
              {INTERIOR_TRIMS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onSelectTrimId(t.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedTrimId === t.id
                      ? 'bg-white/15 border-white text-white shadow-md'
                      : 'bg-black/40 border-white/10 text-white/65'
                  }`}
                >
                  <div>
                    <div className="text-xs font-medium">{t.name}</div>
                    <div className="text-[10px] text-white/50">{t.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Reserve Action Button */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex justify-between text-xs font-mono text-white/70 mb-3">
              <span>INITIAL CARD DEPOSIT DUE TODAY</span>
              <span className="text-white font-semibold">
                ${activeEdition.depositToday.toLocaleString()} USD
              </span>
            </div>
            <button
              onClick={onOpenReserve}
              className="w-full py-3.5 px-6 rounded-full bg-white text-black hover:bg-amber-100 font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
            >
              <span>Lock {activeEdition.title} Allocation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

