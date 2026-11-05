import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROADSTER_REAL_PHOTOS } from '../data/roadsterAssets';

gsap.registerPlugin(ScrollTrigger);

export const PinnedApertureBreakdown: React.FC = () => {
  const triggerRef = useRef<HTMLElement | null>(null);
  const clipBoxRef = useRef<HTMLDivElement | null>(null);
  const img1Ref = useRef<HTMLImageElement | null>(null);
  const img2Ref = useRef<HTMLImageElement | null>(null);
  const img3Ref = useRef<HTMLImageElement | null>(null);
  const cap1Ref = useRef<HTMLDivElement | null>(null);
  const cap2Ref = useRef<HTMLDivElement | null>(null);
  const cap3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !triggerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=260%',
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 1: Expand clip-path from inset window to full-screen 100vw x 100vh
      tl.fromTo(
        clipBoxRef.current,
        { clipPath: 'inset(16% 20% 16% 20% round 24px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.0, ease: 'none' },
        0
      )
        .fromTo(
          img1Ref.current,
          { scale: 1.18 },
          { scale: 1.0, duration: 1.0, ease: 'none' },
          0
        )
        // Phase 2: Crossfade to Image 2 (Active Aero Open Panels) + Caption 2
        .to(cap1Ref.current, { opacity: 0, y: -32, duration: 0.35, ease: 'none' }, 0.9)
        .fromTo(
          img2Ref.current,
          { opacity: 0, scale: 1.12 },
          { opacity: 1, scale: 1.0, duration: 0.7, ease: 'none' },
          0.95
        )
        .fromTo(
          cap2Ref.current,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'none' },
          1.1
        )
        // Phase 3: Crossfade to Image 3 (Official Suspension Close-Up) + Caption 3
        .to(cap2Ref.current, { opacity: 0, y: -32, duration: 0.35, ease: 'none' }, 1.85)
        .fromTo(
          img3Ref.current,
          { opacity: 0, scale: 1.12 },
          { opacity: 1, scale: 1.0, duration: 0.7, ease: 'none' },
          1.9
        )
        .fromTo(
          cap3Ref.current,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'none' },
          2.05
        );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = ROADSTER_REAL_PHOTOS.officialRearHero;
  };

  return (
    <section
      id="aperture-story"
      ref={triggerRef}
      className="relative h-screen w-full overflow-hidden bg-[#060608]"
    >
      {/* Expanding Clip-Path Photographic Viewport */}
      <div
        ref={clipBoxRef}
        data-cursor-label="SCROLL STORY"
        className="relative w-full h-full overflow-hidden"
      >
        {/* Plate 1: Ano White & Gold Glazed Profile */}
        <img
          ref={img1Ref}
          src={ROADSTER_REAL_PHOTOS.exteriorProfileAnoWhite}
          onError={handleImgError}
          alt="Tesla Roadster Ano White and Gold Glazed Canopy"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Plate 2: Active Aero & Movable Surfaces Open */}
        <img
          ref={img2Ref}
          src={ROADSTER_REAL_PHOTOS.activeAeroOpenPanels}
          onError={handleImgError}
          alt="Tesla Roadster Active Aero Wing and Bargeboards Deployed"
          className="absolute inset-0 w-full h-full object-cover opacity-0"
        />

        {/* Plate 3: Official Tesla Inboard Spool-Valve Suspension */}
        <img
          ref={img3Ref}
          src={ROADSTER_REAL_PHOTOS.officialSuspension}
          onError={handleImgError}
          alt="Tesla Roadster Official Suspension Close-Up"
          className="absolute inset-0 w-full h-full object-cover opacity-0"
        />

        {/* Subtle Edge Vignette so Corner Typography Reads Effortlessly */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(6,6,8,0.88) 0%, transparent 42%, rgba(6,6,8,0.55) 100%)',
          }}
        />
      </div>

      {/* Corner-Anchored Story Captions (Center stays 100% unobstructed) */}
      <div className="absolute inset-0 z-20 pointer-events-none max-w-[1600px] mx-auto p-6 sm:p-12 flex flex-col justify-between">
        <div className="pt-14 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
          <span>02 // EXTERIOR &amp; CHASSIS ARCHITECTURE</span>
          <span>PINNED APERTURE SEQUENCE</span>
        </div>

        {/* Chapter 1 Overlay */}
        <div
          ref={cap1Ref}
          className="absolute bottom-10 left-6 right-6 sm:left-12 sm:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] block mb-2">
              SURFACE 01 // ANO WHITE &amp; GOLD GLAZED
            </span>
            <h3 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[0.96]">
              Spacesuit Visor <span className="serif-gold-italic">Optics.</span>
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-white/70 max-w-xs font-light leading-relaxed">
            Ano White aerospace coating provides UV and cryogenic protection, while Gold Glazed glass mimics the copper coating on astronaut visors.
          </p>
        </div>

        {/* Chapter 2 Overlay */}
        <div
          ref={cap2Ref}
          className="absolute bottom-10 left-6 right-6 sm:left-12 sm:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6 opacity-0"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] block mb-2">
              SURFACE 02 // HIDDEN AERO &amp; BILATERAL WING
            </span>
            <h3 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[0.96]">
              Concealed <span className="serif-gold-italic">Downforce.</span>
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-white/70 max-w-xs font-light leading-relaxed">
            Swivelling hood vents, extending wheelarch bargeboards, and a four-bar linkage rear wing driven by Optimus actuators deploy only when commanded.
          </p>
        </div>

        {/* Chapter 3 Overlay */}
        <div
          ref={cap3Ref}
          className="absolute bottom-10 left-6 right-6 sm:left-12 sm:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6 opacity-0"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] block mb-2">
              SURFACE 03 // MASS CONTROL &amp; SPOOL-VALVE CHASSIS
            </span>
            <h3 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[0.96]">
              First-Principles <span className="serif-gold-italic">Mass.</span>
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-white/70 max-w-xs font-light leading-relaxed">
            Magnesium, titanium, and carbon fiber pair with inboard pushrod rockers and transversely mounted spool-valve dampers to target a sub-1,700 kg curb weight.
          </p>
        </div>
      </div>
    </section>
  );
};

