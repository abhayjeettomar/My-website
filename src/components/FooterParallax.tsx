import React from 'react';
import { ROADSTER_REAL_PHOTOS } from '../data/roadsterAssets';

interface FooterParallaxProps {
  onOpenReserve: () => void;
}

export const FooterParallax: React.FC<FooterParallaxProps> = ({
  onOpenReserve,
}) => {
  return (
    <footer className="relative min-h-[85vh] w-full overflow-hidden bg-[#060608] border-t border-white/10 flex flex-col justify-between p-6 sm:p-12">
      <div className="absolute inset-0 z-0">
        <img
          src={ROADSTER_REAL_PHOTOS.officialRearHero}
          alt="Tesla Roadster Finale"
          className="w-full h-full object-cover opacity-45"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, #060608 0%, rgba(6,6,8,0.4) 50%, #060608 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1600px] w-full mx-auto flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
        <span>SEE FOR YOURSELF</span>
        <span>FEAT OF STRENGTH: COMPLETE</span>
      </div>

      <div className="relative z-10 max-w-[1600px] w-full mx-auto my-auto py-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block mb-4">
          TESLA ROADSTER // 2026 UNVEIL
        </span>
        <h2 className="text-6xl sm:text-8xl lg:text-9xl font-light tracking-[-0.04em] text-white leading-[0.92]">
          Feat of strength:<br />
          <span className="serif-gold-italic">complete.</span>
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenReserve}
            data-cursor-label="RESERVE"
            className="bg-[#F5F5F7] text-[#060608] hover:bg-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.22em] font-semibold px-8 py-4 rounded-full transition-colors"
          >
            Reserve Roadster
          </button>
          <a
            href="#top"
            className="liquid-glass font-mono text-[10px] uppercase tracking-[0.22em] text-white px-6 py-4 rounded-full hover:bg-white/10 transition-colors"
          >
            Back to Top ↑
          </a>
        </div>
      </div>

      <div className="relative z-10 max-w-[1600px] w-full mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
        <span>TESLA © 2026 · ROADSTER PERFORMANCE · THRUST · ROCKET</span>
        <span>1 AVAILABLE WITH ROCKET TRIM ONLY · NOT APPROVED FOR PUBLIC ROAD USE</span>
      </div>
    </footer>
  );
};

