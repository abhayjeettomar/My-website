import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LIVE_DEMO_SEQUENCE, ROADSTER_REAL_PHOTOS } from '../data/roadsterAssets';

gsap.registerPlugin(ScrollTrigger);

export const AirborneSequenceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const figures = gsap.utils.toArray<HTMLElement>('.demo-clip-figure');
      figures.forEach((fig) => {
        const img = fig.querySelector('img');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: fig,
            start: 'top 82%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.fromTo(
          fig,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'power4.out' }
        );

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.16, filter: 'brightness(0.5)' },
            { scale: 1.0, filter: 'brightness(0.92)', duration: 1.35, ease: 'power3.out' },
            0
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = ROADSTER_REAL_PHOTOS.officialRearHero;
  };

  return (
    <section
      id="airborne-demo"
      ref={sectionRef}
      className="py-28 px-5 sm:px-12 max-w-[1600px] mx-auto border-t border-white/10"
    >
      {/* Editorial Section Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-20">
        <div className="lg:col-span-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] mb-3">
            04 // SEE FOR YOURSELF — FEAT OF STRENGTH: COMPLETE
          </div>
          <h2 className="text-5xl sm:text-7xl font-light tracking-[-0.035em] text-white leading-[0.95]">
            Beyond the flat plane.<br />
            <span className="serif-gold-italic">Gravity defying.</span>
          </h2>
        </div>
        <div className="lg:col-span-4">
          <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed max-w-xs lg:ml-auto">
            Tire loading, 1 MW electric power delivery, underbody fan suction, and 10-nozzle cold-gas thrust converge into a single vehicle-motion-control system.
          </p>
        </div>
      </div>

      {/* Asymmetric Editorial Spreads with Curtain Clip-Path Reveals */}
      <div className="space-y-24">
        {LIVE_DEMO_SEQUENCE.map((item, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={item.step}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-8 border-t border-white/10"
            >
              <div
                className={`lg:col-span-4 flex flex-col justify-between h-full ${
                  isEven ? 'lg:order-1' : 'lg:order-2 lg:pl-8'
                }`}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4AF37]">
                  {item.step} — {item.timestamp}
                </div>
                <div className="mt-8 lg:mt-auto">
                  <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-white leading-[1.04]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed mt-3 max-w-xs">
                    {item.body}
                  </p>
                </div>
              </div>

              <div
                className={`lg:col-span-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
              >
                <figure
                  data-cursor-label="LIVE DEMO"
                  className="demo-clip-figure relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#0C0D11]"
                >
                  <img
                    src={item.image}
                    onError={handleImgError}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/75 via-transparent to-transparent" />
                  <figcaption className="absolute bottom-4 left-5 right-5 flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                    <span>{item.timestamp}</span>
                    <span>TEXAS LIVE DEMONSTRATION RECORD</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

