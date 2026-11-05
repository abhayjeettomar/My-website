import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROADSTER_REAL_PHOTOS } from '../data/roadsterAssets';

gsap.registerPlugin(ScrollTrigger);

const COCKPIT_HOTSPOTS = [
  {
    id: 'yoke',
    code: '01 // STEER-BY-WIRE YOKE',
    title: 'Variable-Ratio Digital Yoke & Movable Column',
    detail:
      'Seats are fixed directly to the carbon tub for mass control; the steer-by-wire yoke and digital pedal box move to fit the pilot.',
    x: '32%',
    y: '58%',
  },
  {
    id: 'center-screen',
    code: '02 // SUPERSONIC CENTER DISPLAY',
    title: 'Bespoke Telemetry & Thrust Allocation Console',
    detail:
      'Central portrait screen manages underbody suction fan modes, active wing deployment, and COPV nitrogen pressure telemetry.',
    x: '53%',
    y: '54%',
  },
  {
    id: 'windscreen-strip',
    code: '03 // SCUTTLE DISPLAY STRIP',
    title: 'Base-of-Windscreen Dual Forward Pilot Readout',
    detail:
      'A recessed display strip along the base of the deep gold-glazed windscreen projects critical speed, G-load, and attitude cues directly in the pilot’s line of sight.',
    x: '46%',
    y: '34%',
  },
  {
    id: 'microsuede',
    code: '04 // ULTRAWHITE & GRAY MICROSUEDE',
    title: 'High-G Microsuede Bolsters & Manual Backrest',
    detail:
      'Iconic Ultrawhite trim accented with high-grip gray microsuede bolsters holds the pilot securely during sub-second 4.64G launches.',
    x: '72%',
    y: '68%',
  },
];

export const SupersonicCockpitSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const figureRef = useRef<HTMLElement | null>(null);
  const [activeSpot, setActiveSpot] = useState(COCKPIT_HOTSPOTS[0]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !figureRef.current) return;

    const ctx = gsap.context(() => {
      const img = figureRef.current?.querySelector('img');
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.14 },
          {
            scale: 1.0,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: figureRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.85,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cockpit"
      ref={sectionRef}
      className="py-28 px-5 sm:px-12 max-w-[1600px] mx-auto bg-[#050507]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
        <div className="lg:col-span-7">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] block mb-3">
            06 // SUPERSONIC INTERIOR ARCHITECTURE
          </span>
          <h2 className="text-5xl sm:text-7xl font-light tracking-[-0.035em] text-white leading-[0.95]">
            Built around <span className="serif-gold-italic">the pilot.</span>
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed max-w-xs lg:ml-auto">
            Fixed carbon seat shells reduce mass while the steer-by-wire yoke, pedal box, and triple-display instrument horizon adapt to you.
          </p>
        </div>
      </div>

      <figure
        ref={figureRef}
        data-cursor-label="INSPECT COCKPIT"
        className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#0B0C10] border border-white/15 gpu-layer"
      >
        <img
          src={ROADSTER_REAL_PHOTOS.supersonicCockpit}
          onError={(e) => {
            e.currentTarget.src = ROADSTER_REAL_PHOTOS.officialRearHero;
          }}
          alt="2026 Tesla Roadster Supersonic Cockpit Photograph"
          className="w-full h-full object-cover gpu-layer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/90 via-transparent to-[#050507]/40" />

        {COCKPIT_HOTSPOTS.map((spot) => {
          const isSelected = activeSpot.id === spot.id;
          return (
            <button
              key={spot.id}
              onClick={() => setActiveSpot(spot)}
              style={{ left: spot.x, top: spot.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none"
              aria-label={spot.title}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full font-mono text-[10px] transition-transform duration-300 ${
                  isSelected
                    ? 'bg-[#D4AF37] text-black scale-125 shadow-lg'
                    : 'liquid-glass text-white hover:scale-110'
                }`}
              >
                +
              </span>
            </button>
          );
        })}

        <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-none">
          <div className="gold-visor-glass rounded-2xl p-5 sm:p-6 max-w-md pointer-events-auto">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] block mb-1.5">
              {activeSpot.code}
            </span>
            <h3 className="text-xl sm:text-2xl font-light text-white">
              {activeSpot.title}
            </h3>
            <p className="text-xs text-white/70 font-light leading-relaxed mt-2">
              {activeSpot.detail}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pointer-events-auto">
            {COCKPIT_HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveSpot(spot)}
                className={`font-mono text-[10px] uppercase tracking-[0.16em] px-3.5 py-2 rounded-full transition-colors ${
                  activeSpot.id === spot.id
                    ? 'bg-[#F5F5F7] text-[#050507] font-semibold'
                    : 'liquid-glass text-white/70 hover:text-white'
                }`}
              >
                {spot.code.split('//')[0]}
              </button>
            ))}
          </div>
        </div>
      </figure>
    </section>
  );
};
