import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ROADSTER_REAL_PHOTOS } from '../data/roadsterAssets';

interface PhotoReelPreloaderProps {
  onComplete: () => void;
}

const REEL_FRAMES = [
  ROADSTER_REAL_PHOTOS.exteriorProfileAnoWhite,
  ROADSTER_REAL_PHOTOS.nozzlesAndSuctionFans,
  ROADSTER_REAL_PHOTOS.coldGasCopvHardware,
  ROADSTER_REAL_PHOTOS.optimusThrottleValve,
  ROADSTER_REAL_PHOTOS.activeAeroOpenPanels,
  ROADSTER_REAL_PHOTOS.batteryAndTwinMotors,
  ROADSTER_REAL_PHOTOS.supersonicCockpit,
  ROADSTER_REAL_PHOTOS.officialRearHero,
];

export const PhotoReelPreloader: React.FC<PhotoReelPreloaderProps> = ({
  onComplete,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const hudRef = useRef<HTMLDivElement | null>(null);
  const [counter, setCounter] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    REEL_FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      onComplete();
      return;
    }

    const state = { val: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => onComplete(),
      });

      tl.to(state, {
        val: 100,
        duration: 1.45,
        ease: 'power2.inOut',
        onUpdate: () => {
          const c = Math.round(state.val);
          setCounter(c);
          const idx = Math.min(
            REEL_FRAMES.length - 1,
            Math.floor((state.val / 100) * REEL_FRAMES.length)
          );
          setFrameIndex(idx);
        },
      })
        .to(
          hudRef.current,
          { opacity: 0, duration: 0.35, ease: 'power2.out' },
          1.25
        )
        // Shared-element expansion: the small center reel frame grows to 100vw x 100vh
        .to(
          frameRef.current,
          {
            width: '100vw',
            height: '100vh',
            borderRadius: '0px',
            duration: 0.95,
            ease: 'expo.inOut',
          },
          1.3
        )
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
          },
          2.15
        );
    }, overlayRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[#050507] flex items-center justify-center overflow-hidden select-none"
    >
      {/* Expanding Shared-Element Center Photograph Frame */}
      <div
        ref={frameRef}
        style={{
          width: '32vw',
          height: '20vw',
          minWidth: '260px',
          minHeight: '165px',
        }}
        className="relative rounded-xl overflow-hidden border border-white/15 gpu-layer shadow-2xl"
      >
        <img
          src={REEL_FRAMES[frameIndex]}
          onError={(e) => {
            e.currentTarget.src = ROADSTER_REAL_PHOTOS.studioFallback;
          }}
          alt="Tesla Roadster Optical Reel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/70 via-transparent to-[#050507]/30" />
      </div>

      {/* Perimeter Telemetry HUD */}
      <div
        ref={hudRef}
        className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-between pointer-events-none"
      >
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
          <span>TESLA // ROADSTER 2026 ARCHIVE</span>
          <span>
            FRAME 0{frameIndex + 1} / 0{REEL_FRAMES.length}
          </span>
        </div>
        <div className="flex items-end justify-between">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D4AF37]">
            CALIBRATING 120FPS GSAP + WEBGL PIPELINE
          </div>
          <div className="font-mono text-5xl sm:text-7xl font-light tracking-tighter text-white">
            {String(counter).padStart(3, '0')}
            <span className="text-xl text-[#D4AF37] ml-1">%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

