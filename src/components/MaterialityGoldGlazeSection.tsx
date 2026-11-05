import React, { useState } from 'react';
import { Sun, Scale, EyeOff } from 'lucide-react';

export const MaterialityGoldGlazeSection: React.FC = () => {
  const [visorTintPercent, setVisorTintPercent] = useState<number>(78);

  return (
    <section id="materiality" className="py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300 block mb-3">
          05 // FIRST-PRINCIPLES MATERIALITY
        </span>
        <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white">
          Gold Glazed. <span className="gold-glazed-serif">Mass Controlled.</span> Hidden Aero.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1: Gold Glazed Spacesuit Visor Glass (7 cols) */}
        <div className="lg:col-span-7 gold-glazed-glass rounded-3xl p-7 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-300 flex items-center gap-2">
                <Sun className="w-4 h-4" />
                GOLD GLAZED // SPACESUIT VISOR OPTICS
              </span>
              <span className="font-mono text-xs text-white/60">
                IR REJECTION: {visorTintPercent}%
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-white">
              Copper-Coated Spacesuit Visor Glass
            </h3>
            <p className="text-sm text-white/75 font-light leading-relaxed mt-2">
              Tinted glass windows and the removable roof panel are engineered to mimic the thin-film copper coating that gives astronauts&apos; spacesuit visors their gold radiance—paired with machined titanium accents.
            </p>

            {/* Interactive Visor Glaze Preview Box */}
            <div
              style={{
                background: `linear-gradient(135deg, rgba(245, 158, 11, ${
                  visorTintPercent / 140
                }) 0%, rgba(15, 23, 42, 0.9) 70%, rgba(232, 33, 39, 0.25) 100%)`,
              }}
              className="mt-6 h-40 rounded-2xl border border-amber-400/40 p-5 flex flex-col justify-between transition-all"
            >
              <div className="flex justify-between font-mono text-[11px] text-amber-100">
                <span>THIN-FILM AU/CU VAPOR DEPOSITION</span>
                <span>UV / SOLAR ATTENUATION: {visorTintPercent}%</span>
              </div>
              <div className="text-xs text-white/85 font-mono">
                Drag slider below to inspect copper-gold radiance under orbital solar load.
              </div>
            </div>
          </div>

          <div className="mt-5">
            <input
              type="range"
              min={35}
              max={98}
              value={visorTintPercent}
              onChange={(e) => setVisorTintPercent(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Right 5 Cols: Mass Control & Hidden Aero Stack */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="liquid-glass rounded-3xl p-7 flex-1">
            <span className="font-mono text-xs uppercase tracking-widest text-purple-300 flex items-center gap-2 mb-3">
              <Scale className="w-4 h-4" />
              MASS CONTROL
            </span>
            <h3 className="text-2xl font-light text-white">
              Magnesium, Titanium &amp; Carbon Fiber
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mt-2">
              First-principles engineering, manual controls, and a fixed seat position reduce overall vehicle mass. By fixing the carbon seat shell directly to the structural tub and moving the steer-by-wire yoke and pedal box to the pilot, Roadster responds almost instantly during extra-dimensional driving.
            </p>
          </div>

          <div className="liquid-glass rounded-3xl p-7 flex-1">
            <span className="font-mono text-xs uppercase tracking-widest text-sky-300 flex items-center gap-2 mb-3">
              <EyeOff className="w-4 h-4" />
              HIDDEN AERO
            </span>
            <h3 className="text-2xl font-light text-white">
              Minimalist Form. Concealed Force.
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mt-2">
              Hidden headlights, a full-length rear laser taillight, and flush-mounted active aerodynamics conceal the vehicle&apos;s true form—grounded by super-light forged wheels with ultra-thin titanium spokes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

