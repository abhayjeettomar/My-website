import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROADSTER_REAL_PHOTOS } from '../data/roadsterAssets';

gsap.registerPlugin(ScrollTrigger);

const XRAY_ZONES = [
  {
    id: 'front-aero',
    xPct: 24,
    yPct: 54,
    code: 'X-RAY ZONE 01 // FRONT AERO & BY-WIRE',
    title: 'Swivelling Fan Exhaust & Inboard Spool-Valve Rockers',
    metric: '2,825 MM WHEELBASE',
    xrayImg: ROADSTER_REAL_PHOTOS.officialSuspension,
  },
  {
    id: 'cabin-copv',
    xPct: 52,
    yPct: 48,
    code: 'X-RAY ZONE 02 // 600L COMPOSITE PRESSURE VESSELS',
    title: '400L Cabin Auxiliary Tank + 200L Rear Nitrogen COPV',
    metric: '600L N₂ CAPACITY',
    xrayImg: ROADSTER_REAL_PHOTOS.coldGasCopvHardware,
  },
  {
    id: 'rear-nozzles',
    xPct: 78,
    yPct: 52,
    code: 'X-RAY ZONE 03 // COLD-GAS NOZZLES + SUCTION FANS',
    title: 'Four Rear De Laval Nozzles Above Twin Underbody Suction Fans',
    metric: '0.59S / 90.9 KN',
    xrayImg: ROADSTER_REAL_PHOTOS.nozzlesAndSuctionFans,
  },
];

export const XRayHardwareLoupe: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const xrayLayerRef = useRef<HTMLDivElement | null>(null);
  const reticleRef = useRef<HTMLDivElement | null>(null);
  const [activeZoneIdx, setActiveZoneIdx] = useState(1);
  const isPointerActiveRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const xrayLayer = xrayLayerRef.current;
    const reticle = reticleRef.current;
    if (!section || !xrayLayer || !reticle) return;

    const setLensPosition = (xPct: number, yPct: number) => {
      xrayLayer.style.clipPath = `circle(175px at ${xPct}% ${yPct}%)`;
      reticle.style.left = `${xPct}%`;
      reticle.style.top = `${yPct}%`;
      if (xPct < 38) setActiveZoneIdx(0);
      else if (xPct < 66) setActiveZoneIdx(1);
      else setActiveZoneIdx(2);
    };

    setLensPosition(52, 48);

    const onPointerMove = (e: PointerEvent) => {
      isPointerActiveRef.current = true;
      const rect = section.getBoundingClientRect();
      const xPct = Math.max(8, Math.min(92, ((e.clientX - rect.left) / rect.width) * 100));
      const yPct = Math.max(15, Math.min(85, ((e.clientY - rect.top) / rect.height) * 100));
      setLensPosition(xPct, yPct);
    };

    const onPointerLeave = () => {
      isPointerActiveRef.current = false;
    };

    section.addEventListener('pointermove', onPointerMove, { passive: true });
    section.addEventListener('pointerleave', onPointerLeave);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=190%',
        pin: true,
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate: (self) => {
          if (!isPointerActiveRef.current) {
            const sweepX = 20 + self.progress * 64;
            const sweepY = 50 + Math.sin(self.progress * Math.PI * 2) * 6;
            setLensPosition(sweepX, sweepY);
          }
        },
      });
    }, section);

    return () => {
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
      ctx.revert();
    };
  }, []);

  const currentZone = XRAY_ZONES[activeZoneIdx] || XRAY_ZONES[1];

  return (
    <section
      id="xray-loupe"
      ref={sectionRef}
      data-cursor-label="X-RAY SCAN"
      className="relative h-screen w-full overflow-hidden bg-[#050507] select-none"
    >
      {/* BASE LAYER: Real 2026 Tesla Roadster Exterior Photograph */}
      <div className="absolute inset-0 z-0 gpu-layer">
        <img
          src={ROADSTER_REAL_PHOTOS.exteriorProfileAnoWhite}
          onError={(e) => {
            e.currentTarget.src = ROADSTER_REAL_PHOTOS.officialRearHero;
          }}
          alt="2026 Tesla Roadster Exterior Skin"
          className="w-full h-full object-cover opacity-75"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #050507 0%, rgba(5,5,7,0.2) 50%, #050507 100%)',
          }}
        />
      </div>

      {/* X-RAY LAYER: Exposed Internal Cold-Gas & Suction Hardware Clipped to Loupe Circle */}
      <div
        ref={xrayLayerRef}
        style={{ clipPath: 'circle(175px at 52% 48%)' }}
        className="absolute inset-0 z-10 pointer-events-none gpu-layer"
      >
        <img
          src={currentZone.xrayImg}
          onError={(e) => {
            e.currentTarget.src = ROADSTER_REAL_PHOTOS.nozzlesAndSuctionFans;
          }}
          alt="2026 Tesla Roadster Internal X-Ray Hardware"
          className="w-full h-full object-cover scale-105 contrast-125 brightness-110"
        />
        <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-overlay" />
      </div>

      {/* Circular Aerospace Reticle Ring Tracking the X-Ray Aperture */}
      <div
        ref={reticleRef}
        style={{ left: '52%', top: '48%', width: '350px', height: '350px' }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 rounded-full border border-[#D4AF37]/70 pointer-events-none flex items-start justify-center pt-3 gpu-layer"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] bg-[#050507]/85 text-[#D4AF37] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40">
          SUB-SURFACE OPTICAL X-RAY
        </span>
      </div>

      {/* Perimeter Editorial Telemetry HUD */}
      <div className="relative z-30 h-full w-full max-w-[1600px] mx-auto p-6 sm:p-12 flex flex-col justify-between pointer-events-none">
        <div className="pt-16 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
          <span>03 // SUB-SURFACE HARDWARE X-RAY SCANNER</span>
          <span className="text-[#D4AF37]">MOVE CURSOR OR SCROLL TO SCAN CHASSIS ↔</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] block mb-2">
              {currentZone.code}
            </span>
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[0.96] max-w-2xl">
              {currentZone.title}
            </h2>
          </div>

          <div className="gold-visor-glass rounded-2xl px-5 py-4 font-mono pointer-events-auto">
            <span className="text-[9px] text-white/50 block tracking-widest">
              ACTIVE TELEMETRY READOUT
            </span>
            <span className="text-xl sm:text-2xl text-[#D4AF37] font-normal mt-0.5 block">
              {currentZone.metric}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

