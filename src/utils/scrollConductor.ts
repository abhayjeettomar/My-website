/**
 * Frame-rate independent exponential smoothing (Meng To Build Three.js Scroll Worlds spec)
 */
export function damp(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * Math.min(dt, 0.05)));
}

/**
 * Linger time-remapping curve (oso95/scroll-world Step 7 spec):
 * Slows camera progression in the middle of a chapter [0.25..0.75] while the user reads the copy card,
 * and smoothly accelerates into/out of chapter seams while preserving f(0) = 0 and f(1) = 1.
 */
export function applyLingerCurve(t: number, lingerAmount: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  const k = Math.max(0, Math.min(0.65, lingerAmount));
  // Smooth cubic hermite plateau around t = 0.5
  const centered = clamped - 0.5;
  const cubic = 4 * centered * centered * centered + 0.5;
  return clamped * (1 - k) + cubic * k;
}

export interface ChapterSegmentState {
  chapterIndex: number;
  nextChapterIndex: number;
  rawLocalProgress: number; // 0..1 linear progress within current chapter
  lingeredProgress: number; // 0..1 remapped with chapter linger
  seamBlend: number; // 0..1 smooth cross-chapter shader morph factor during final 28% of chapter
}

/**
 * Resolves a continuous chapter position (e.g. 2.38) into current/next chapter indices,
 * lingered camera progress, and seamless shader transition blend.
 */
export function resolveChapterSegment(
  continuousChapterPos: number,
  totalChapters: number,
  lingerValues: number[]
): ChapterSegmentState {
  const maxPos = Math.max(0, totalChapters - 1);
  const clamped = Math.max(0, Math.min(maxPos, continuousChapterPos));
  const idx = Math.min(Math.floor(clamped), Math.max(0, totalChapters - 2));
  const nextIdx = Math.min(idx + 1, totalChapters - 1);
  const rawLocal = clamped - idx;
  const linger = lingerValues[idx] ?? 0.42;
  const lingered = applyLingerCurve(rawLocal, linger);
  // Seam transition window occupies the last 32% of each chapter transition
  const seamStart = 0.68;
  const rawSeam = rawLocal <= seamStart ? 0 : (rawLocal - seamStart) / (1 - seamStart);
  // Smoothstep for zero-velocity-pop handoff
  const seamBlend = rawSeam * rawSeam * (3 - 2 * rawSeam);

  return {
    chapterIndex: idx,
    nextChapterIndex: nextIdx,
    rawLocalProgress: rawLocal,
    lingeredProgress: lingered,
    seamBlend,
  };
}

