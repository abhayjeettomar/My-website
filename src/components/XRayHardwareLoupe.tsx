import React, { useRef, useState } from 'react';
import { ROADSTER_PHOTOS } from '../data/roadsterWorldData';

interface LoupeHotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  title: string;
  metric: string;
  detail: string;
}

const HOTSPOTS: LoupeHotspot[] = [
  {
    id: 'front-fan-exhaust',
    xPercent: 24,
    yPercent: 52,
    title: 'Swivelling Front Fan Exhaust Vane',
    metric: '1.1G Static Suction',
    detail: 'Routes high-velocity air evacuated from the underbody plenum over the front hood.',
  },
  {
    id: 'aux-copv-tank',
    xPercent: 52,
    yPercent: 44,
    title: '400L Cabin Auxiliary Nitrogen COPV',
    metric: '10,000 PSI Carbon Vessel',
    detail: 'Replaces the passenger seat in the Rocket variant to triple cold-gas flight endurance.',
  },
  {
    id: 'rear-thruster-nozzles',
    xPercent: 81,
    yPercent: 56,
    title: 'Quad Rear Cold-Gas Thruster Nozzles',
    metric: '0.59s 0-60 MPH Launch',
    detail: 'Concealed behind the rear license plate flip-door and governed by an Optimus actuator valve.',
  },
];

export const XRayHardwareLoupe: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const xrayLayerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<LoupeHotspot>(HOTSPOTS[1]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    const xray = xrayLayerRef.current;
    const ring = ringRef.current;
    if (!stage || !xray || !ring) return;

    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    xray.style.clipPath = `circle(150px at ${x}px ${y}px)`;
    ring.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`;
  };

  return (
    <section
      id="xray-inspection"
      className="relative z-20 w-full bg-[#09090B] py-24 px-5 md:px-12 border-t border-white/10"
    >
      <div className="max-w-[1440px] mx-auto space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#D4AF37]">
            OPTICAL SUB-SURFACE INSPECTION
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F4F4F6]">
            Glide across the bodywork to{' '}
            <span className="font-light text-[#D4AF37]">
              X-ray the Supersonic Cockpit.
            </span>
          </h2>
          <p className="text-sm md:text-base text-[#D4D4D8]">
            Move your pointer or drag across the frame to peer through the Ano White exterior directly into the fixed carbon monocoque and SpaceX cold-gas architecture.
          </p>
        </div>

        {/* Interactive Dual-Layer X-Ray Frame */}
        <div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          className="relative w-full h-[420px] sm:h-[540px] lg:h-[620px] rounded-2xl overflow-hidden border border-white/15 cursor-crosshair select-none touch-none"
        >
          {/* Base Layer: Exterior Track Profile */}
          <img
            src={ROADSTER_PHOTOS.trackCorneringFront}
            alt="2026 Tesla Roadster Exterior"
            className="w-full h-full object-cover object-center"
          />

          {/* X-Ray Clipped Layer: Internal Supersonic Cockpit & Carbon Monocoque */}
          <div
            ref={xrayLayerRef}
            style={{ clipPath: 'circle(150px at 50% 50%)' }}
            className="absolute inset-0 pointer-events-none"
          >
            <img
              src={ROADSTER_PHOTOS.supersonicCockpit}
              alt="2026 Tesla Roadster Internal Cockpit X-Ray"
              className="w-full h-full object-cover object-center contrast-125 brightness-110"
            />
            <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-overlay" />
          </div>

          {/* GPU-Accelerated Loupe Ring */}
          <div
            ref={ringRef}
            style={{
              transform: 'translate3d(calc(50% - 150px), calc(50% - 150px), 0)',
            }}
            className="gpu-layer absolute top-0 left-0 w-[300px] h-[300px] rounded-full border border-[#D4AF37]/80 shadow-[0_0_40px_rgba(212,175,55,0.25)] pointer-events-none flex items-end justify-center pb-3"
          >
            <span className="px-2.5 py-0.5 rounded-full bg-[#09090B]/85 text-[10px] font-mono-tech uppercase tracking-[0.14em] text-[#D4AF37]">
              SUB-SURFACE X-RAY
            </span>
          </div>

          {/* Interactive Engineering Hotspots */}
          {HOTSPOTS.map((spot) => {
            const isSelected = activeHotspot.id === spot.id;
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActiveHotspot(spot)}
                style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-mono-tech transition-all ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#09090B] font-semibold scale-105'
                    : 'liquid-glass text-[#F4F4F6] hover:border-[#D4AF37]'
                }`}
              >
                {spot.metric}
              </button>
            );
          })}

          {/* Bottom-Left Active Hotspot Readout in Liquid Glass */}
          <div className="liquid-glass absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-md rounded-2xl p-5 space-y-1.5">
            <p className="text-xs font-mono-tech uppercase tracking-[0.16em] text-[#D4AF37]">
              {activeHotspot.metric}
            </p>
            <h3 className="font-display text-lg font-semibold text-[#F4F4F6]">
              {activeHotspot.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed">
              {activeHotspot.detail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
