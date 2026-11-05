import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string>('');

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || reduceMotion || !cursorRef.current) return;

    const cursor = cursorRef.current;
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.28, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.28, ease: 'power3.out' });

    const onPointerMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      const target = (e.target as HTMLElement | null)?.closest('[data-cursor-label]') as HTMLElement | null;
      if (target) {
        const nextLabel = target.getAttribute('data-cursor-label') || '';
        setLabel(nextLabel);
        gsap.to(cursor, { width: 96, height: 32, duration: 0.25, ease: 'power3.out' });
      } else {
        setLabel('');
        gsap.to(cursor, { width: 12, height: 12, duration: 0.25, ease: 'power3.out' });
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      className="fixed top-0 left-0 z-[90] pointer-events-none hidden md:flex items-center justify-center bg-[#F5F5F7] text-[#050507] mix-blend-difference w-3 h-3 rounded-full overflow-hidden gpu-layer"
    >
      {label && (
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] font-semibold whitespace-nowrap px-2">
          {label}
        </span>
      )}
    </div>
  );
};
