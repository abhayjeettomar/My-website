import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HORIZONTAL_HARDWARE_PLATES,
  ROADSTER_REAL_PHOTOS,
} from '../data/roadsterAssets';

gsap.registerPlugin(ScrollTrigger);

export const VelocityHardwareRibbon: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const cards = gsap.utils.toArray<HTMLElement>('.velocity-ribbon-card');
      const images = gsap.utils.toArray<HTMLElement>('.velocity-ribbon-img');

      let maxScroll = Math.max(0, track.scrollWidth - window.innerWidth);
      const onRefreshInit = () => {
        maxScroll = Math.max(0, track.scrollWidth - window.innerWidth);
      };
      ScrollTrigger.addEventListener('refreshInit', onRefreshInit);

      const skewQuick = cards.map((c) =>
        gsap.quickTo(c, 'skewX', { duration: 0.35, ease: 'power3.out' })
      );
      const scaleQuick = cards.map((c) =>
        gsap.quickTo(c, 'scale', { duration: 0.35, ease: 'power3.out' })
      );

      gsap.to(track, {
        x: () => -maxScroll,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${maxScroll}`,
          scrub: 0.85,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              HORIZONTAL_HARDWARE_PLATES.length,
              Math.max(1, Math.ceil(self.progress * HORIZONTAL_HARDWARE_PLATES.length))
            );
            setActiveIndex(idx);

            // Velocity-reactive ribbon bend (clamped to ±7deg for luxury restraint)
            const rawVel = self.getVelocity() / 650;
            const clampedSkew = Math.max(-7, Math.min(7, -rawVel));
            const clampedScale = Math.max(0.95, 1 - Math.abs(rawVel) * 0.008);
            skewQuick.forEach((fn) => fn(clampedSkew));
            scaleQuick.forEach((fn) => fn(clampedScale));
          },
        },
      });

      // Internal counter-parallax on each photograph
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -9 },
          {
            xPercent: 9,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${maxScroll}`,
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      return () => {
        ScrollTrigger.removeEventListener('refreshInit', onRefreshInit);
      };
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
      id="velocity-ribbon"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#050507]"
    >
      <div className="absolute top-20 left-6 right-6 sm:left-12 sm:right-12 z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 pointer-events-none">
        <span>04 // VELOCITY-REACTIVE 35MM HARDWARE RIBBON</span>
        <span className="text-[#D4AF37]">
          PLATE 0{activeIndex} / 0{HORIZONTAL_HARDWARE_PLATES.length}
        </span>
      </div>

      <div
        ref={trackRef}
        className="flex items-center h-full w-max pl-6 sm:pl-12 pr-12 gap-8 sm:gap-14 pt-10 gpu-layer"
      >
        {HORIZONTAL_HARDWARE_PLATES.map((plate) => (
          <article
            key={plate.id}
            data-cursor-label="HARDWARE"
            className="velocity-ribbon-card relative w-[84vw] sm:w-[70vw] lg:w-[62vw] h-[72vh] rounded-2xl overflow-hidden bg-[#0B0C10] border border-white/10 shrink-0 flex flex-col justify-between p-6 sm:p-10 gpu-layer"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={plate.imageUrl}
                onError={(e) => handleImgError(e, plate.fallbackUrl)}
                alt={plate.title}
                className="velocity-ribbon-img w-[120%] h-full max-w-none object-cover opacity-80 gpu-layer"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(5,5,7,0.94) 0%, rgba(5,5,7,0.2) 48%, rgba(5,5,7,0.65) 100%)',
                }}
              />
            </div>

            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="text-[#D4AF37]">
                {plate.index} — {plate.code}
              </span>
              <span className="hidden sm:inline px-3 py-1 rounded-full bg-black/60 border border-white/15 text-white/60">
                {plate.patentRef}
              </span>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-[1.0]">
                  {plate.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-light mt-3 max-w-md leading-relaxed">
                  {plate.subtitle}
                </p>
              </div>

              <div className="border-l border-[#D4AF37]/60 pl-4 font-mono shrink-0">
                <div className="text-3xl sm:text-5xl font-light text-white tracking-tighter">
                  {plate.metricValue}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] mt-1">
                  {plate.metricUnit}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

