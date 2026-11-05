import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ROADSTER_REAL_PHOTOS } from '../data/roadsterAssets';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    // Pre-warm key real photographs
    Object.values(ROADSTER_REAL_PHOTOS).forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      onComplete();
      return;
    }

    const counterObj = { val: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          onComplete();
        },
      });

      tl.to(counterObj, {
        val: 100,
        duration: 1.35,
        ease: 'power2.inOut',
        onUpdate: () => setCounter(Math.round(counterObj.val)),
      })
        .fromTo(
          barRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.35, ease: 'power2.inOut' },
          0
        )
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.95,
          ease: 'power4.inOut',
          delay: 0.12,
        });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#060608] flex flex-col justify-between p-6 sm:p-12 select-none pointer-events-auto"
    >
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.24em] uppercase text-white/50">
        <span>TESLA // ROADSTER 2026</span>
        <span>FEAT OF STRENGTH: COMPLETE</span>
      </div>
      <div className="my-auto">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37] mb-3">
          INITIALIZING SCROLL TELEMETRY &amp; OPTICAL ASSETS
        </div>
        <div className="text-7xl sm:text-9xl font-light tracking-tighter text-white font-mono">
          {String(counter).padStart(3, '0')}
          <span className="text-2xl sm:text-4xl text-[#D4AF37] ml-2">%</span>
        </div>
      </div>
      <div className="w-full">
        <div className="h-[1px] w-full bg-white/10 overflow-hidden">
          <div ref={barRef} className="h-full w-full bg-[#D4AF37]" />
        </div>
        <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] text-white/40 mt-3 uppercase">
          <span>ANO WHITE // GOLD GLAZED</span>
          <span>0–60 MPH: 0.59 SEC (ROCKET)</span>
        </div>
      </div>
    </div>
  );
};

