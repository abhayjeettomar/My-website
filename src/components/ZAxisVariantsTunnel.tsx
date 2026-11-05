import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROADSTER_VARIANTS, ROADSTER_REAL_PHOTOS } from '../data/roadsterAssets';

gsap.registerPlugin(ScrollTrigger);

interface ZAxisVariantsTunnelProps {
  onSelectVariantAndReserve: (variantName: string) => void;
}

export const ZAxisVariantsTunnel: React.FC<ZAxisVariantsTunnelProps> = ({
  onSelectVariantAndReserve,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=280%',
          pin: true,
          anticipatePin: 1,
          scrub: 0.75,
          onUpdate: (self) => {
            const idx = Math.min(
              ROADSTER_VARIANTS.length - 1,
              Math.floor(self.progress * ROADSTER_VARIANTS.length)
            );
            setActiveIdx(idx);
          },
        },
      });

      const [card0, card1, card2] = cardRefs.current;

      // Initial Z-positions
      gsap.set(card0, { z: 0, opacity: 1, scale: 1 });
      gsap.set(card1, { z: -900, opacity: 0, scale: 0.82 });
      gsap.set(card2, { z: -1800, opacity: 0, scale: 0.68 });

      // Phase 1: Fly past Card 0 (Performance) while Card 1 (Thrust 0.85s) arrives at Z = 0
      tl.to(
        card0,
        { z: 520, opacity: 0, duration: 1.0, ease: 'power2.in', force3D: true },
        0
      )
        .to(
          card1,
          { z: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out', force3D: true },
          0.1
        )
        .to(
          card2,
          { z: -900, opacity: 0.25, scale: 0.82, duration: 1.0, ease: 'none', force3D: true },
          0.1
        )
        // Phase 2: Fly past Card 1 (Thrust) while Card 2 (Rocket 0.59s Airborne) arrives at Z = 0
        .to(
          card1,
          { z: 520, opacity: 0, duration: 1.0, ease: 'power2.in', force3D: true },
          1.15
        )
        .to(
          card2,
          { z: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out', force3D: true },
          1.25
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleImgError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    fallback: string
  ) => {
    if (e.currentTarget.src !== fallback) {
      e.currentTarget.src = fallback;
    } else {
      e.currentTarget.src = ROADSTER_REAL_PHOTOS.studioFallback;
    }
  };

  return (
    <section
      id="z-tunnel"
      ref={sectionRef}
      style={{ perspective: '1300px' }}
      className="relative h-screen w-full overflow-hidden bg-[#050507] flex items-center justify-center"
    >
      {/* Top Tunnel Telemetry Header */}
      <div className="absolute top-20 left-6 right-6 sm:left-12 sm:right-12 z-30 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/60 pointer-events-none">
        <span>05 // 3D Z-AXIS PROPULSION FLIGHT TUNNEL</span>
        <div className="flex items-center gap-4">
          {ROADSTER_VARIANTS.map((v, idx) => (
            <span
              key={v.id}
              className={idx === activeIdx ? 'text-[#D4AF37] font-semibold' : 'text-white/35'}
            >
              0{idx + 1} {v.name.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* 3D Z-Space Variant Planes */}
      <div
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full flex items-center justify-center p-5 sm:p-12"
      >
        {ROADSTER_VARIANTS.map((v, idx) => (
          <article
            key={v.id}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            style={{ zIndex: 30 - idx * 10 }}
            className="absolute w-[92vw] max-w-[1480px] h-[76vh] rounded-3xl overflow-hidden bg-[#0B0C10] border border-white/15 flex flex-col justify-between p-6 sm:p-12 gpu-layer shadow-2xl"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={v.imageUrl}
                onError={(e) => handleImgError(e, v.fallbackUrl)}
                alt={v.name}
                className="w-full h-full object-cover opacity-75"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, #050507 5%, rgba(5,5,7,0.25) 50%, rgba(5,5,7,0.75) 100%)',
                }}
              />
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4 font-mono text-[10px] uppercase tracking-[0.22em]">
              <span className="text-[#D4AF37]">{v.index}</span>
              <span className="px-3.5 py-1 rounded-full bg-black/70 border border-white/15 text-white/90">
                {v.tierBadge}
              </span>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-6">
                <h3 className="text-5xl sm:text-7xl font-light tracking-tight text-white leading-[0.94]">
                  {v.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed mt-4 max-w-md">
                  {v.tagline}
                </p>
                {v.footnote && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D4AF37] mt-3">
                    {v.footnote}
                  </p>
                )}
              </div>

              <div className="lg:col-span-6 gold-visor-glass rounded-2xl p-6">
                <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-4 mb-4 font-mono">
                  <div>
                    <span className="text-[9px] text-white/45 block tracking-widest">
                      0–60 MPH
                    </span>
                    <span className="text-2xl sm:text-3xl text-white font-light">
                      {v.zeroToSixty}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/45 block tracking-widest">
                      POWER
                    </span>
                    <span className="text-2xl sm:text-3xl text-white font-light">
                      1.0 MW
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/45 block tracking-widest">
                      VMAX
                    </span>
                    <span className="text-2xl sm:text-3xl text-[#D4AF37] font-light">
                      {v.topSpeed.split(' ')[0]}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 font-mono text-[11px] text-white/75 mb-5">
                  <div className="flex justify-between gap-4">
                    <span className="text-white/45">SEATING:</span>
                    <span className="text-right">{v.seating}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/45">PROPULSION:</span>
                    <span className="text-right">{v.propulsionSpec}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/45">GAS INVENTORY:</span>
                    <span className="text-right text-[#D4AF37]">{v.gasStorageSpec}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectVariantAndReserve(v.name)}
                  data-cursor-label="RESERVE"
                  className="w-full py-3.5 rounded-full bg-[#F5F5F7] text-[#050507] hover:bg-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.22em] font-semibold transition-colors"
                >
                  Request {v.name} Allocation
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
