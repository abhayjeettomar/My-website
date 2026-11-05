import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AMBIENT_HERO_VIDEO, ROADSTER_REAL_PHOTOS } from '../data/roadsterAssets';

gsap.registerPlugin(ScrollTrigger);

interface PortalHeroStageProps {
  onOpenReserve: () => void;
}

export const PortalHeroStage: React.FC<PortalHeroStageProps> = ({
  onOpenReserve,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroPhotoLayerRef = useRef<HTMLDivElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const portalMaskLayerRef = useRef<HTMLDivElement | null>(null);
  const portalSvgTextRef = useRef<SVGGElement | null>(null);
  const innerPortalCopyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=220%',
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Step 1: Initial hero copy glides upward while the SVG Knockout Portal Mask ("0.59s") locks in
      tl.to(
        heroCopyRef.current,
        { y: -60, opacity: 0, duration: 0.35, ease: 'none' },
        0
      )
        .fromTo(
          portalMaskLayerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'none' },
          0.18
        )
        // Step 2: Fly camera straight through the hollow "0" of "0.59s" (scale 1 -> 68)
        .fromTo(
          portalSvgTextRef.current,
          { scale: 1, transformOrigin: '24.5% 50%' },
          { scale: 68, duration: 0.85, ease: 'power3.in', force3D: true },
          0.28
        )
        .to(
          heroPhotoLayerRef.current,
          { scale: 1.18, opacity: 0, duration: 0.55, ease: 'none', force3D: true },
          0.35
        )
        // Step 3: Reveal the underlying full-bleed video telemetry once through the portal
        .fromTo(
          innerPortalCopyRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', force3D: true },
          0.78
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#050507]"
    >
      {/* LAYER 0 (DEEPEST): Native Hardware-Decoded Video Playing Through the Portal */}
      <div className="absolute inset-0 z-0 gpu-layer">
        <video
          autoPlay
          muted
          loop
          playsInline
          src={AMBIENT_HERO_VIDEO}
          className="w-full h-full object-cover opacity-85"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(5,5,7,0.45) 0%, transparent 35%, transparent 65%, #050507 100%)',
          }}
        />

        {/* Post-Portal Telemetry Overlay */}
        <div
          ref={innerPortalCopyRef}
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 max-w-[1600px] mx-auto opacity-0 pointer-events-none"
        >
          <div className="pt-16 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4AF37]">
            <span>PORTAL TRANSIT // 4.64G LONGITUDINAL</span>
            <span>600L COPV + TWIN SUCTION FANS</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/55 block mb-2">
                OUT OF THIS WORLD
              </span>
              <h2 className="text-5xl sm:text-7xl font-light tracking-tight text-white leading-[0.95]">
                A rocket inside <span className="serif-gold-italic">Roadster.</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/70 max-w-xs font-light leading-relaxed">
              We already put a Roadster in a rocket. Now ten perimeter cold-gas nozzles and underbody suction redefine vehicle physics.
            </p>
          </div>
        </div>
      </div>

      {/* LAYER 1: SVG Knockout Text-Mask Portal ("0.59s") */}
      <div
        ref={portalMaskLayerRef}
        className="absolute inset-0 z-10 pointer-events-none opacity-0 gpu-layer"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="roadsterPortalMask">
              <rect width="1600" height="900" fill="white" />
              <g ref={portalSvgTextRef}>
                <text
                  x="800"
                  y="545"
                  textAnchor="middle"
                  fill="black"
                  fontSize="360"
                  fontWeight="600"
                  fontFamily="HelveticaNowDisplay-Medium, Inter, sans-serif"
                  letterSpacing="-12"
                >
                  0.59s
                </text>
              </g>
            </mask>
          </defs>
          <rect
            width="1600"
            height="900"
            fill="#050507"
            mask="url(#roadsterPortalMask)"
          />
        </svg>
      </div>

      {/* LAYER 2 (TOP INITIAL): Full-Bleed Official 2026 Tesla Roadster Photograph */}
      <div
        ref={heroPhotoLayerRef}
        className="absolute inset-0 z-20 pointer-events-none gpu-layer"
      >
        <img
          src={ROADSTER_REAL_PHOTOS.officialRearHero}
          onError={(e) => {
            e.currentTarget.src = ROADSTER_REAL_PHOTOS.studioFallback;
          }}
          alt="2026 Tesla Roadster Official Launch Stage"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #050507 0%, rgba(5,5,7,0.18) 45%, rgba(5,5,7,0.55) 100%)',
          }}
        />
      </div>

      {/* LAYER 3: Initial Perimeter Editorial Typography */}
      <div
        ref={heroCopyRef}
        className="relative z-30 h-full w-full max-w-[1600px] mx-auto flex flex-col justify-between p-6 sm:p-12 pointer-events-none gpu-layer"
      >
        <div className="pt-16 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/65">
          <span>ACTIVE AERO · COLD-GAS THRUSTERS · MULTI-MODE SUCTION</span>
          <span className="hidden sm:inline text-[#D4AF37]">
            SCROLL TO FLY THROUGH 0.59S PORTAL ↓
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
              UNVEILED OCTOBER 2026 // A TRUE PILOT&apos;S CAR
            </div>
            <h1 className="text-6xl sm:text-8xl lg:text-[7.5rem] font-light tracking-[-0.04em] leading-[0.9] text-white">
              Roadster <span className="serif-gold-italic">2026.</span>
            </h1>
          </div>

          <div className="flex flex-col items-start md:items-end gap-5 pointer-events-auto">
            <div className="grid grid-cols-3 gap-6 border-t border-white/15 pt-4 font-mono">
              <div>
                <span className="text-[9px] text-white/45 block tracking-widest">
                  0–60 MPH
                </span>
                <span className="text-xl sm:text-2xl text-white">0.59s</span>
              </div>
              <div>
                <span className="text-[9px] text-white/45 block tracking-widest">
                  OUTPUT
                </span>
                <span className="text-xl sm:text-2xl text-white">1.0 MW</span>
              </div>
              <div>
                <span className="text-[9px] text-white/45 block tracking-widest">
                  DOWNFORCE
                </span>
                <span className="text-xl sm:text-2xl text-[#D4AF37]">INVERTED</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenReserve}
                data-cursor-label="RESERVE"
                className="bg-[#F5F5F7] text-[#050507] hover:bg-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.2em] font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Reserve Roadster
              </button>
              <a
                href="#webgl-morph"
                className="liquid-glass font-mono text-[10px] uppercase tracking-[0.2em] text-white px-5 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Enter Wind Tunnel
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

