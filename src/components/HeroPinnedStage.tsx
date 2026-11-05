import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ROADSTER_REAL_PHOTOS,
  SCROLL_VIDEO_PRIMARY,
} from '../data/roadsterAssets';

gsap.registerPlugin(ScrollTrigger);

interface HeroPinnedStageProps {
  onOpenReserve: () => void;
}

export const HeroPinnedStage: React.FC<HeroPinnedStageProps> = ({
  onOpenReserve,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const topHalfRef = useRef<HTMLDivElement | null>(null);
  const bottomHalfRef = useRef<HTMLDivElement | null>(null);
  const heroTitleRef = useRef<HTMLDivElement | null>(null);
  const innerRevealCopyRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Initial entrance animation for masked hero words
      const words = sectionRef.current?.querySelectorAll('.hero-split-word');
      if (words && words.length) {
        gsap.fromTo(
          words,
          { yPercent: 115, opacity: 0, filter: 'blur(8px)' },
          {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.05,
            ease: 'power4.out',
            stagger: 0.06,
            delay: 0.2,
          }
        );
      }

      // Pinned ScrollTrigger timeline that parts the split-frame photograph to unveil the scroll-scrubbed video
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          scrub: 1.0,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const vid = videoRef.current;
            if (vid && vid.duration && !Number.isNaN(vid.duration)) {
              vid.currentTime = self.progress * (vid.duration - 0.1);
            }
          },
        },
      });

      tl.to(
        heroTitleRef.current,
        { y: -80, opacity: 0, filter: 'blur(10px)', duration: 0.45, ease: 'none' },
        0
      )
        .to(
          topHalfRef.current,
          { yPercent: -102, scale: 1.08, duration: 0.85, ease: 'power2.inOut' },
          0.08
        )
        .to(
          bottomHalfRef.current,
          { yPercent: 102, scale: 1.08, duration: 0.85, ease: 'power2.inOut' },
          0.08
        )
        .fromTo(
          innerRevealCopyRef.current,
          { opacity: 0, y: 48, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' },
          0.42
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = ROADSTER_REAL_PHOTOS.studioFallback;
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#060608]"
    >
      {/* UNDERLYING LAYER (Z-0): Scroll-Scrubbed 3D Video Core + Corner Telemetry */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          loop
          autoPlay
          src={SCROLL_VIDEO_PRIMARY}
          className="w-full h-full object-cover opacity-80"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, transparent 35%, #060608 95%), linear-gradient(to bottom, rgba(6,6,8,0.5) 0%, transparent 30%, transparent 70%, #060608 100%)',
          }}
        />

        {/* Sparse Corner Architecture Revealed After Split-Frame Parts */}
        <div
          ref={innerRevealCopyRef}
          className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-12 pointer-events-none"
        >
          <div className="flex justify-between items-start pt-14">
            <div className="border-l border-[#D4AF37] pl-3.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] block">
                OUT OF THIS WORLD
              </span>
              <span className="font-mono text-xs text-white/80">
                We already put Roadster in a rocket. Now we put a rocket in Roadster.
              </span>
            </div>
            <div className="hidden sm:block text-right font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
              <div>ACTIVE AERO // DEPLOYED</div>
              <div>COLD-GAS THRUSTERS // 10 NOZZLES</div>
              <div>MULTI-MODE SUCTION // ARMED</div>
            </div>
          </div>

          {/* Center stays 100% open so the scroll-scrubbed visual breathes */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-lg">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50 block mb-2">
                01 // BEYOND PLAID
              </span>
              <h2 className="text-4xl sm:text-6xl font-light tracking-tight leading-[0.98] text-white">
                A True Pilot&apos;s <span className="serif-gold-italic">Machine.</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/65 max-w-xs font-light leading-relaxed">
              Roadster challenges the limits of design, engineering, and physics to deliver an expertly crafted extra-terrestrial vehicle.
            </p>
          </div>
        </div>
      </div>

      {/* FOREGROUND SPLIT-FRAME SHUTTER TOP HALF (Z-10) */}
      <div
        ref={topHalfRef}
        className="absolute inset-x-0 top-0 h-1/2 overflow-hidden z-10 bg-[#060608]"
      >
        <img
          src={ROADSTER_REAL_PHOTOS.officialRearHero}
          onError={handleImgError}
          alt="2026 Tesla Roadster Official Launch Stage Rear View"
          className="w-screen h-screen max-w-none object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060608]/55 via-transparent to-transparent" />
      </div>

      {/* FOREGROUND SPLIT-FRAME SHUTTER BOTTOM HALF (Z-10) */}
      <div
        ref={bottomHalfRef}
        className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden z-10 bg-[#060608]"
      >
        <img
          src={ROADSTER_REAL_PHOTOS.officialRearHero}
          onError={handleImgError}
          alt="2026 Tesla Roadster Official Launch Stage Rear View"
          className="w-screen h-screen max-w-none object-cover object-center -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/35 to-transparent" />
      </div>

      {/* INITIAL HERO TYPOGRAPHY ANCHORED TO VIEWPORT EDGES (Z-20) */}
      <div
        ref={heroTitleRef}
        className="relative z-20 h-full w-full max-w-[1600px] mx-auto flex flex-col justify-between p-6 sm:p-12 pointer-events-none"
      >
        <div className="pt-16 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/65">
          <span>ACTIVE AERO · COLD-GAS THRUSTERS · MULTI-MODE SUCTION</span>
          <span className="hidden sm:inline text-[#D4AF37]">SCROLL TO PART APERTURE ↓</span>
        </div>

        {/* Bottom-Aligned Editorial Composition (Center of car photo remains unobstructed) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
              UNVEILED OCTOBER 2026 // PRODUCTION-INTENT ALPHA
            </div>
            <h1 className="text-6xl sm:text-8xl lg:text-[7.2rem] font-light tracking-[-0.04em] leading-[0.92] text-white">
              <span className="split-word-mask mr-4">
                <span className="hero-split-word">Roadster</span>
              </span>
              <span className="split-word-mask">
                <span className="hero-split-word serif-gold-italic">2026.</span>
              </span>
            </h1>
          </div>

          {/* Right Minimal Telemetry Strip + CTA */}
          <div className="flex flex-col items-start md:items-end gap-5 pointer-events-auto">
            <div className="grid grid-cols-3 gap-6 border-t border-white/15 pt-4 font-mono">
              <div>
                <span className="text-[9px] text-white/45 block tracking-widest">0–60 MPH</span>
                <span className="text-xl sm:text-2xl text-white font-normal">0.59s</span>
              </div>
              <div>
                <span className="text-[9px] text-white/45 block tracking-widest">PEAK POWER</span>
                <span className="text-xl sm:text-2xl text-white font-normal">1.0 MW</span>
              </div>
              <div>
                <span className="text-[9px] text-white/45 block tracking-widest">SUCTION</span>
                <span className="text-xl sm:text-2xl text-[#D4AF37] font-normal">INVERTED</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenReserve}
                data-cursor-label="RESERVE"
                className="bg-[#F5F5F7] text-[#060608] hover:bg-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.2em] font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Reserve Now
              </button>
              <a
                href="#aperture-story"
                className="liquid-glass font-mono text-[10px] uppercase tracking-[0.2em] text-white px-5 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Explore Engineering
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

