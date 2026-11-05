import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPLODED_SUBSYSTEMS } from '../data/roadsterWorldData';

gsap.registerPlugin(ScrollTrigger);

export const AxialExplodedRig: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [explodeFactor, setExplodeFactor] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrap = pinWrapRef.current;
    if (!section || !pinWrap) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setExplodeFactor(1);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinWrap,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Smooth bell/plateau curve: expands 0 -> 1 and holds so user can inspect all 4 axial layers
          const p = self.progress;
          const factor = Math.min(1, p * 1.35);
          setExplodeFactor(factor);

          const activeIdx = Math.min(
            EXPLODED_SUBSYSTEMS.length - 1,
            Math.floor(p * EXPLODED_SUBSYSTEMS.length)
          );
          setSelectedLayer(activeIdx);

          EXPLODED_SUBSYSTEMS.forEach((sub, idx) => {
            const el = layerRefs.current[idx];
            if (!el) return;
            const tx = sub.axisOffset.x * factor;
            const ty = sub.axisOffset.y * factor;
            const tz = sub.axisOffset.z * factor;
            const rx = sub.axisOffset.rotateX * factor;
            const rz = sub.axisOffset.rotateZ * factor;
            el.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateX(${rx}deg) rotateZ(${rz}deg)`;
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const activeSub = EXPLODED_SUBSYSTEMS[selectedLayer] || EXPLODED_SUBSYSTEMS[0];

  return (
    <section
      id="axial-architecture"
      ref={sectionRef}
      className="relative z-20 w-full bg-[#09090B]/90 backdrop-blur-2xl border-t border-white/10"
    >
      <div
        ref={pinWrapRef}
        className="w-full min-h-[100dvh] max-w-[1440px] mx-auto px-5 md:px-12 py-20 flex flex-col justify-between"
      >
        {/* Top Header: vertical stack per taste-skill Split-Header Ban */}
        <div className="max-w-2xl space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#F4F4F6]">
            Axial Hardware Separation.{' '}
            <span className="font-light text-[#D4AF37]">
              Four integrated aerospace strata.
            </span>
          </h2>
          <p className="text-sm md:text-base text-[#D4D4D8] max-w-[60ch]">
            Scroll to separate the Roadster along its structural mounting axes, or select any layer to inspect its propulsion and aerodynamic hardware.
          </p>
        </div>

        {/* Center 3D Axial Exploded Stage + Right Active Layer Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6">
          {/* 3D Perspective Axial Stack */}
          <div
            style={{ perspective: '1400px' }}
            className="lg:col-span-7 relative h-[380px] sm:h-[440px] flex items-center justify-center"
          >
            {/* Central Mounting Axis Vector Line */}
            <div
              style={{
                height: `${120 + explodeFactor * 240}px`,
                opacity: 0.25 + explodeFactor * 0.55,
              }}
              className="absolute w-px bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent pointer-events-none transition-opacity"
            />

            {EXPLODED_SUBSYSTEMS.map((sub, idx) => {
              const isSelected = idx === selectedLayer;
              return (
                <div
                  key={sub.id}
                  ref={(el) => {
                    layerRefs.current[idx] = el;
                  }}
                  onClick={() => setSelectedLayer(idx)}
                  style={{ zIndex: EXPLODED_SUBSYSTEMS.length - idx }}
                  className={`gpu-layer absolute w-[290px] sm:w-[420px] md:w-[480px] h-[155px] sm:h-[200px] rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300 ${
                    isSelected
                      ? 'border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(212,175,55,0.22)]'
                      : 'border border-white/15 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={sub.photoUrl}
                    alt={sub.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-[#09090B]/25 to-transparent p-4 flex flex-col justify-end">
                    <p className="text-xs font-mono-tech uppercase tracking-[0.14em] text-[#D4AF37]">
                      {sub.specSummary}
                    </p>
                    <p className="text-sm sm:text-base font-display font-semibold text-[#F4F4F6] truncate">
                      {sub.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Layer Selector & Engineering Readout */}
          <div className="lg:col-span-5 space-y-4">
            <div className="liquid-glass rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono-tech uppercase tracking-[0.14em] text-[#D4AF37]">
                  AXIAL SEPARATION: {Math.round(explodeFactor * 100)}%
                </span>
                <span className="text-xs font-mono-tech text-[#A1A1AA]">
                  MOUNTING AXIS LOCKED
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#F4F4F6]">
                {activeSub.title}
              </h3>
              <p className="text-xs font-mono-tech uppercase tracking-[0.12em] text-[#D4AF37]">
                {activeSub.specSummary}
              </p>
              <p className="text-sm md:text-base text-[#F4F4F6] leading-relaxed">
                {activeSub.description}
              </p>

              {/* Layer Switcher Pills */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {EXPLODED_SUBSYSTEMS.map((sub, idx) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedLayer(idx)}
                    className={`px-3.5 py-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                      selectedLayer === idx
                        ? 'bg-[#F4F4F6] text-[#09090B] font-semibold'
                        : 'bg-white/[0.05] text-[#D4D4D8] hover:bg-white/[0.1]'
                    }`}
                  >
                    {sub.title.split(' ').slice(0, 3).join(' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

