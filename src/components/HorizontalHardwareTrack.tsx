import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HORIZONTAL_HARDWARE_PLATES,
  ROADSTER_REAL_PHOTOS,
} from '../data/roadsterAssets';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalHardwareTrack: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(1);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const mainTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              HORIZONTAL_HARDWARE_PLATES.length,
              Math.max(1, Math.ceil(self.progress * HORIZONTAL_HARDWARE_PLATES.length))
            );
            setActiveIndex(idx);
          },
        },
      });

      // Internal counter-parallax on each hardware photograph
      const images = track.querySelectorAll('.hw-parallax-img');
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -10, scale: 1.08 },
          {
            xPercent: 10,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${getScrollAmount()}`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      return () => {
        mainTween.kill();
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
      id="hardware-track"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#060608] border-t border-white/10"
    >
      {/* Top Pinned HUD Progress Strip */}
      <div className="absolute top-20 left-6 right-6 sm:left-12 sm:right-12 z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 pointer-events-none">
        <span>03 // EXPOSED PROPULSION, SUCTION &amp; POWERTRAIN TEARDOWN</span>
        <span className="text-[#D4AF37]">
          PLATE 0{activeIndex} / 0{HORIZONTAL_HARDWARE_PLATES.length} — SCROLL TO GLIDE →
        </span>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="flex items-center h-full w-max pl-6 sm:pl-12 pr-12 gap-8 sm:gap-14 pt-12"
      >
        {HORIZONTAL_HARDWARE_PLATES.map((plate) => (
          <article
            key={plate.id}
            data-cursor-label="HARDWARE"
            className="relative w-[86vw] sm:w-[74vw] lg:w-[66vw] h-[72vh] rounded-2xl overflow-hidden bg-[#0C0D11] border border-white/10 shrink-0 flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Real Hardware Photograph with Counter-Parallax */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={plate.imageUrl}
                onError={(e) => handleImgError(e, plate.fallbackUrl)}
                alt={plate.title}
                className="hw-parallax-img w-[122%] h-full max-w-none object-cover opacity-80"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(6,6,8,0.94) 0%, rgba(6,6,8,0.22) 45%, rgba(6,6,8,0.65) 100%)',
                }}
              />
            </div>

            {/* Top Corner Metadata */}
            <div className="relative z-10 flex items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-3">
                <span className="text-[#D4AF37]">{plate.index}</span>
                <span className="h-3 w-[1px] bg-white/20" />
                <span className="text-white/75">{plate.code}</span>
              </div>
              {plate.patentRef && (
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/60">
                  {plate.patentRef}
                </span>
              )}
            </div>

            {/* Bottom Corner Editorial Breakdown (Center of Hardware Photo Stays Open) */}
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-[1.02]">
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

