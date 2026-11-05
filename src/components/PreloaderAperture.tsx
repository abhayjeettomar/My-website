import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ROADSTER_PHOTOS } from '../data/roadsterWorldData';

interface PreloaderApertureProps {
  onComplete: () => void;
}

const REEL_PHOTOS = [
  ROADSTER_PHOTOS.trackCorneringFront,
  ROADSTER_PHOTOS.frontSplitterAero,
  ROADSTER_PHOTOS.goldVisorBargeboards,
  ROADSTER_PHOTOS.activeRearWingDiffuser,
  ROADSTER_PHOTOS.rearThrusterExhaust,
  ROADSTER_PHOTOS.supersonicCockpit,
  ROADSTER_PHOTOS.heroStudioFront,
];

export const PreloaderAperture: React.FC<PreloaderApertureProps> = ({
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const metaTopRef = useRef<HTMLDivElement>(null);
  const metaBottomRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    // Preload all 10 high-res Roadster press photographs into browser memory
    Object.values(ROADSTER_PHOTOS).forEach((src) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
    });

    const state = { val: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.to(state, {
        val: 100,
        duration: 1.65,
        ease: 'power3.inOut',
        onUpdate: () => {
          const current = Math.round(state.val);
          setCounter(current);
          const mappedIdx = Math.min(
            REEL_PHOTOS.length - 1,
            Math.floor((current / 100) * REEL_PHOTOS.length)
          );
          setPhotoIdx(mappedIdx);
        },
      })
        .to(
          [metaTopRef.current, metaBottomRef.current],
          {
            opacity: 0,
            y: -12,
            duration: 0.35,
            ease: 'power2.in',
          },
          '-=0.15'
        )
        .to(
          frameRef.current,
          {
            width: '100vw',
            height: '100dvh',
            borderRadius: '0px',
            duration: 0.85,
            ease: 'expo.inOut',
          },
          '-=0.1'
        )
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.35,
            ease: 'power2.out',
          },
          '-=0.15'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-between bg-[#09090B] p-6 md:p-10 pointer-events-auto select-none"
    >
      <div
        ref={metaTopRef}
        className="w-full flex items-center justify-between text-xs font-mono-tech tracking-[0.18em] uppercase text-[#A1A1AA]"
      >
        <span>TESLA ROADSTER</span>
        <span>PRESSURE VESSEL CALIBRATION</span>
      </div>

      <div
        ref={frameRef}
        style={{
          width: 'min(360px, 78vw)',
          height: 'min(220px, 48vw)',
          borderRadius: '14px',
        }}
        className="relative overflow-hidden border border-white/15 shadow-2xl gpu-layer"
      >
        <img
          src={REEL_PHOTOS[photoIdx]}
          alt="2026 Tesla Roadster calibration frame"
          className="w-full h-full object-cover object-center"
        />
        <div className="hero-bottom-scrim absolute inset-0" />
      </div>

      <div
        ref={metaBottomRef}
        className="w-full flex items-baseline justify-between"
      >
        <span className="text-xs font-mono-tech uppercase tracking-[0.16em] text-[#A1A1AA]">
          600L COPV N2 SYSTEM READY
        </span>
        <span className="text-5xl md:text-7xl font-display font-semibold tracking-tight text-[#F4F4F6] font-mono-tech">
          {String(counter).padStart(3, '0')}%
        </span>
      </div>
    </div>
  );
};

