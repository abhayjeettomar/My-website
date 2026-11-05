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
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.32, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.32, ease: 'power3.out' });

    const onPointerMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      const target = (e.target as HTMLElement | null)?.closest('[data-cursor-label]') as HTMLElement | null;
      if (target) {
        const text = target.getAttribute('data-cursor-label') || '';
        setLabel(text);
        gsap.to(cursor, {
          width: 92,
          height: 34,
          borderRadius: 999,
          duration: 0.3,
          ease: 'power3.out',
        });
      } else {
        setLabel('');
        gsap.to(cursor, {
          width: 14,
          height: 14,
          borderRadius: 999,
          duration: 0.3,
          ease: 'power3.out',
        });
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{ transform: 'translate3d(-50%, -50%, 0)' }}
      className="fixed top-0 left-0 z-[90] pointer-events-none hidden md:flex items-center justify-center bg-[#F5F5F7] text-[#060608] mix-blend-difference w-3.5 h-3.5 rounded-full overflow-hidden"
    >
      {label && (
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] font-semibold whitespace-nowrap px-2">
          {label}
        </span>
      )}
    </div>
  );
};

