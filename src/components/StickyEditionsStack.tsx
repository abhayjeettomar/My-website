import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROADSTER_VARIANTS, ROADSTER_REAL_PHOTOS } from '../data/roadsterAssets';

gsap.registerPlugin(ScrollTrigger);

interface StickyEditionsStackProps {
  onSelectVariantAndReserve: (variantName: string) => void;
}

export const StickyEditionsStack: React.FC<StickyEditionsStackProps> = ({
  onSelectVariantAndReserve,
}) => {
  const stackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !stackRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.variant-stack-card');
      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];
        if (!nextCard) return;

        gsap.to(card, {
          scale: 0.91 + index * 0.02,
          opacity: 0.35,
          y: -28,
          filter: 'blur(6px)',
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 85%',
            end: 'top 12%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, stackRef);

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
      id="editions-stack"
      className="py-28 px-5 sm:px-12 max-w-[1600px] mx-auto border-t border-white/10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] block mb-3">
            05 // OFFICIAL LINEUP &amp; AUGMENTS
          </span>
          <h2 className="text-5xl sm:text-7xl font-light tracking-[-0.035em] text-white leading-[0.95]">
            Performance. Thrust. <span className="serif-gold-italic">Rocket.</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-white/60 max-w-xs font-light">
          Scroll to stack and compare all three factory propulsion architectures—from two-seat ground-effect suction to single-seat perimeter flight.
        </p>
      </div>

      {/* Sticky Receding Stack Container */}
      <div ref={stackRef} className="relative space-y-12 pb-12">
        {ROADSTER_VARIANTS.map((v) => (
          <article
            key={v.id}
            style={{ top: '8vh' }}
            className="variant-stack-card sticky min-h-[82vh] w-full rounded-3xl overflow-hidden bg-[#0C0D11] border border-white/15 flex flex-col justify-between p-6 sm:p-12 origin-top shadow-2xl"
          >
            {/* Full-Bleed Real Photograph Background */}
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
                    'linear-gradient(to top, #060608 5%, rgba(6,6,8,0.28) 50%, rgba(6,6,8,0.75) 100%)',
                }}
              />
            </div>

            {/* Top Bar: Variant Index & Tier Badge */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-5 font-mono text-[10px] uppercase tracking-[0.22em]">
              <span className="text-[#D4AF37]">{v.index}</span>
              <span className="px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-white/90">
                {v.tierBadge}
              </span>
            </div>

            {/* Bottom Split: Left Title & Tagline / Right Telemetry Table & Reserve CTA */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-20">
              <div className="lg:col-span-6">
                <h3 className="text-5xl sm:text-7xl font-light tracking-tight text-white leading-[0.95]">
                  {v.name}
                </h3>
                <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed mt-4 max-w-md">
                  {v.tagline}
                </p>
                {v.footnote && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D4AF37] mt-4">
                    {v.footnote}
                  </p>
                )}
              </div>

              <div className="lg:col-span-6 gold-visor-glass rounded-2xl p-6 sm:p-8">
                <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-5 mb-5 font-mono">
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
                      OUTPUT
                    </span>
                    <span className="text-2xl sm:text-3xl text-white font-light">
                      {v.powerOutput.split(' ')[0]} MW
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/45 block tracking-widest">
                      TOP SPEED
                    </span>
                    <span className="text-2xl sm:text-3xl text-[#D4AF37] font-light">
                      {v.topSpeed.split(' ')[0]}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 font-mono text-[11px] text-white/75 mb-6">
                  <div className="flex justify-between gap-4">
                    <span className="text-white/45">COCKPIT:</span>
                    <span className="text-right">{v.seating}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/45">PROPULSION:</span>
                    <span className="text-right">{v.propulsionSpec}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/45">COLD-GAS STORAGE:</span>
                    <span className="text-right text-[#D4AF37]">{v.gasStorageSpec}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectVariantAndReserve(v.name)}
                  data-cursor-label="RESERVE"
                  className="w-full py-3.5 rounded-full bg-[#F5F5F7] text-[#060608] hover:bg-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.22em] font-semibold transition-colors"
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

