import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Copy, Check, RotateCcw, MousePointer, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const TechniqueLab: React.FC = () => {
  // Recipe 1: Liquid Glass Shader Sliders
  const [blurPx, setBlurPx] = useState<number>(18);
  const [saturateVal, setSaturateVal] = useState<number>(1.4);
  const [insetGlowPx, setInsetGlowPx] = useState<number>(12);
  const [borderAlpha, setBorderAlpha] = useState<number>(0.16);
  const [copiedRecipe, setCopiedRecipe] = useState<string | null>(null);

  // Recipe 2: Word-by-Word Blur Reveal Sliders
  const [initialBlur, setInitialBlur] = useState<number>(12);
  const [staggerSec, setStaggerSec] = useState<number>(0.07);
  const [replayKey, setReplayKey] = useState<number>(0);

  // Recipe 3: Mouse-Scrub Delta Physics
  const [sensitivity, setSensitivity] = useState<number>(0.8);
  const [simDelta, setSimDelta] = useState<number>(140);
  const [simulatedTime, setSimulatedTime] = useState<number>(1.84);

  // Recipe 4: Scroll-Scrub Lerp Smoothing
  const [lerpFactor, setLerpFactor] = useState<number>(0.12);
  const [targetProgress, setTargetProgress] = useState<number>(0.65);
  const [smoothedProgress, setSmoothedProgress] = useState<number>(0.65);

  const dynamicLiquidGlassCss = `.liquid-glass-custom {
  background: linear-gradient(
    165deg,
    rgba(255, 255, 255, 0.035) 0%,
    rgba(255, 255, 255, 0.005) 100%
  );
  backdrop-filter: blur(${blurPx}px) saturate(${saturateVal}) brightness(1.05);
  -webkit-backdrop-filter: blur(${blurPx}px) saturate(${saturateVal}) brightness(1.05);
  box-shadow: inset 0 0 ${insetGlowPx}px rgba(255, 255, 255, 0.18);
  position: relative;
  overflow: hidden;
}
.liquid-glass-custom::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, ${borderAlpha}) 0%,
    rgba(255, 255, 255, 0.01) 50%,
    rgba(255, 255, 255, ${(borderAlpha * 0.75).toFixed(2)}) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}`;

  const dynamicBlurHeadlineCode = `const words = "Unlock your AI Design Superpowers".split(" ");
return (
  <h1 className="text-5xl font-light tracking-tight text-white flex flex-wrap gap-x-3">
    {words.map((word, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, filter: "blur(${initialBlur}px)", y: 18 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.65, delay: i * ${staggerSec}, ease: [0.22, 1, 0.36, 1] }}
      >
        {word}
      </motion.span>
    ))}
  </h1>
);`;

  const mouseScrubCode = `// Mouse scrub with seek-flood guard
let isSeeking = false;
let queuedTime: number | null = null;

const onMouseMove = (e: MouseEvent) => {
  const delta = e.clientX - prevX;
  const timeOffset = (delta / window.innerWidth) * ${sensitivity} * video.duration;
  const targetTime = Math.min(video.duration, Math.max(0, video.currentTime + timeOffset));
  
  if (isSeeking) {
    queuedTime = targetTime;
  } else {
    isSeeking = true;
    video.currentTime = targetTime;
  }
};

video.onseeked = () => {
  if (queuedTime !== null) {
    const next = queuedTime;
    queuedTime = null;
    video.currentTime = next;
  } else {
    isSeeking = false;
  }
};`;

  const lerpHookCode = `// 60FPS Lerp loop for scroll video scrub
useEffect(() => {
  let smoothed = 0;
  let rafId: number;

  const update = () => {
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const target = scrollMax > 0 ? window.scrollY / scrollMax : 0;
    smoothed += (target - smoothed) * ${lerpFactor};
    
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = smoothed * (videoRef.current.duration - 0.05);
    }
    rafId = requestAnimationFrame(update);
  };
  rafId = requestAnimationFrame(update);
  return () => cancelAnimationFrame(rafId);
}, []);`;

  // Animation for Lerp visualizer
  const lerpRef = useRef<number | null>(null);
  useEffect(() => {
    let current = smoothedProgress;
    const tick = () => {
      current += (targetProgress - current) * lerpFactor;
      setSmoothedProgress(current);
      lerpRef.current = requestAnimationFrame(tick);
    };
    lerpRef.current = requestAnimationFrame(tick);
    return () => {
      if (lerpRef.current) cancelAnimationFrame(lerpRef.current);
    };
  }, [targetProgress, lerpFactor]);

  const copySnippet = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedRecipe(id);
    setTimeout(() => setCopiedRecipe(null), 2000);
  };

  const sampleWords = ['Award-Level', 'Motion', 'Architecture', 'in', 'One', 'Prompt.'];

  return (
    <section className="py-20 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="liquid-glass px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300 inline-flex items-center gap-2 mb-4">
            <Sliders className="w-3.5 h-3.5" />
            Interactive Technique Shelf (55+ Recipes)
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Tune the exact physics behind <span className="shimmer-superpowers">MotionSites</span>
          </h2>
        </div>
        <p className="text-white/60 text-sm max-w-md font-light">
          Adjust the refractive glass shader and Framer Motion choreography parameters in real time, then copy the production code straight into your IDE.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sandbox 1: Liquid Glass Shader Tuner */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300">
                  Recipe 01 · Refractive Surface
                </span>
                <h3 className="text-xl font-normal text-white mt-0.5">
                  .liquid-glass Shader Tuner
                </h3>
              </div>
              <button
                onClick={() => copySnippet('glass', dynamicLiquidGlassCss)}
                className="bg-white text-black hover:bg-purple-100 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedRecipe === 'glass' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copiedRecipe === 'glass' ? 'Copied CSS' : 'Copy CSS Recipe'}
              </button>
            </div>

            {/* Live Preview Stage */}
            <div className="relative h-52 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-white/10 mb-6 bg-[#070412]">
              <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-purple-600/50 blur-2xl animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-indigo-500/45 blur-2xl" />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:16px_16px]" />
              <div
                style={{
                  background:
                    'linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.008) 100%)',
                  backdropFilter: `blur(${blurPx}px) saturate(${saturateVal}) brightness(1.06)`,
                  WebkitBackdropFilter: `blur(${blurPx}px) saturate(${saturateVal}) brightness(1.06)`,
                  boxShadow: `inset 0 0 ${insetGlowPx}px rgba(255, 255, 255, 0.22)`,
                  border: `1.5px solid rgba(255, 255, 255, ${borderAlpha})`,
                }}
                className="relative z-10 rounded-2xl p-5 max-w-sm w-full text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-purple-200">LIVE REFRACTION CARD</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-sm text-white/90 font-light leading-relaxed">
                  Blur {blurPx}px · Saturate {saturateVal}x · Specular Inset {insetGlowPx}px
                </p>
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <label className="flex flex-col gap-1.5">
                <span className="text-white/70 flex justify-between">
                  <span>Backdrop Blur</span>
                  <span className="font-mono text-purple-300">{blurPx}px</span>
                </span>
                <input
                  type="range"
                  min={2}
                  max={36}
                  value={blurPx}
                  onChange={(e) => setBlurPx(Number(e.target.value))}
                  className="accent-purple-400 cursor-pointer"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-white/70 flex justify-between">
                  <span>Color Saturation</span>
                  <span className="font-mono text-purple-300">{saturateVal}x</span>
                </span>
                <input
                  type="range"
                  min={1.0}
                  max={2.4}
                  step={0.1}
                  value={saturateVal}
                  onChange={(e) => setSaturateVal(Number(e.target.value))}
                  className="accent-purple-400 cursor-pointer"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-white/70 flex justify-between">
                  <span>Specular Inset Glow</span>
                  <span className="font-mono text-purple-300">{insetGlowPx}px</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={28}
                  value={insetGlowPx}
                  onChange={(e) => setInsetGlowPx(Number(e.target.value))}
                  className="accent-purple-400 cursor-pointer"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-white/70 flex justify-between">
                  <span>Mask Border Alpha</span>
                  <span className="font-mono text-purple-300">{borderAlpha}</span>
                </span>
                <input
                  type="range"
                  min={0.04}
                  max={0.4}
                  step={0.02}
                  value={borderAlpha}
                  onChange={(e) => setBorderAlpha(Number(e.target.value))}
                  className="accent-purple-400 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Sandbox 2: Word-by-Word Blur Headline Sequencer */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300">
                  Recipe 02 · Kinetic Typography
                </span>
                <h3 className="text-xl font-normal text-white mt-0.5">
                  Word-by-Word Blur Choreographer
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setReplayKey((k) => k + 1)}
                  className="liquid-glass px-3 py-2 rounded-full text-xs text-white hover:bg-white/10 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Replay
                </button>
                <button
                  onClick={() => copySnippet('blur-text', dynamicBlurHeadlineCode)}
                  className="bg-white text-black hover:bg-purple-100 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedRecipe === 'blur-text' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copiedRecipe === 'blur-text' ? 'Copied TSX' : 'Copy Framer TSX'}
                </button>
              </div>
            </div>

            <div className="relative h-52 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-white/10 mb-6 bg-[#070412]">
              <div
                key={replayKey}
                className="text-2xl sm:text-4xl font-light tracking-tight text-white flex flex-wrap justify-center gap-x-2.5 gap-y-1 text-center"
              >
                {sampleWords.map((word, i) => (
                  <motion.span
                    key={`${replayKey}-${i}`}
                    initial={{ opacity: 0, filter: `blur(${initialBlur}px)`, y: 18 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{
                      duration: 0.65,
                      delay: i * staggerSec,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={word === 'Motion' ? 'shimmer-superpowers text-3xl sm:text-5xl' : ''}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <label className="flex flex-col gap-1.5">
                <span className="text-white/70 flex justify-between">
                  <span>Initial Gaussian Blur</span>
                  <span className="font-mono text-purple-300">{initialBlur}px</span>
                </span>
                <input
                  type="range"
                  min={4}
                  max={24}
                  value={initialBlur}
                  onChange={(e) => {
                    setInitialBlur(Number(e.target.value));
                    setReplayKey((k) => k + 1);
                  }}
                  className="accent-purple-400 cursor-pointer"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-white/70 flex justify-between">
                  <span>Word Stagger Delay</span>
                  <span className="font-mono text-purple-300">{staggerSec}s</span>
                </span>
                <input
                  type="range"
                  min={0.02}
                  max={0.18}
                  step={0.01}
                  value={staggerSec}
                  onChange={(e) => {
                    setStaggerSec(Number(e.target.value));
                    setReplayKey((k) => k + 1);
                  }}
                  className="accent-purple-400 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Sandbox 3: Mouse-Scrubbed Video Delta Physics */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300">
                  Recipe 03 · Delta Kinematics
                </span>
                <h3 className="text-xl font-normal text-white mt-0.5">
                  Mouse-Scrubbed Video Physics
                </h3>
              </div>
              <button
                onClick={() => copySnippet('scrub-physics', mouseScrubCode)}
                className="bg-white text-black hover:bg-purple-100 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedRecipe === 'scrub-physics' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copiedRecipe === 'scrub-physics' ? 'Copied Snippet' : 'Copy Math Hook'}
              </button>
            </div>

            {/* Interactive Scrub Pad */}
            <div
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const deltaX = e.clientX - rect.left - rect.width / 2;
                setSimDelta(Math.round(deltaX));
                const totalDuration = 5.0;
                const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
                setSimulatedTime(+(ratio * totalDuration).toFixed(2));
              }}
              className="relative h-52 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 border border-white/10 mb-6 bg-[#070412] cursor-crosshair group select-none"
            >
              <div className="absolute inset-0 bg-[radial-gradient(#a855f722_1px,transparent_1px)] [background-size:20px_20px]" />
              <MousePointer className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-125 transition-transform" />
              <div className="text-xs font-mono text-white/80 z-10 text-center">
                Hover & Scrub Across Pad
              </div>
              <div className="mt-2 text-[11px] font-mono text-purple-300 z-10">
                Delta X: {simDelta > 0 ? `+${simDelta}` : simDelta}px · Simulated Time: {simulatedTime}s / 5.0s
              </div>
              {/* Scrub line indicator */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-purple-400 to-transparent pointer-events-none"
                style={{ left: `${(simulatedTime / 5.0) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-white/70 flex justify-between">
                  <span>Scrub Sensitivity Multiplier</span>
                  <span className="font-mono text-purple-300">{sensitivity}x</span>
                </span>
                <input
                  type="range"
                  min={0.2}
                  max={2.0}
                  step={0.1}
                  value={sensitivity}
                  onChange={(e) => setSensitivity(Number(e.target.value))}
                  className="accent-purple-400 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Sandbox 4: Scroll-Scrubbed Lerp Smoothing Visualizer */}
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300">
                  Recipe 04 · 60FPS Lerp Loop
                </span>
                <h3 className="text-xl font-normal text-white mt-0.5">
                  Scroll-Scrub Lerp Smoothing Visualizer
                </h3>
              </div>
              <button
                onClick={() => copySnippet('lerp-hook', lerpHookCode)}
                className="bg-white text-black hover:bg-purple-100 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedRecipe === 'lerp-hook' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copiedRecipe === 'lerp-hook' ? 'Copied RAF Hook' : 'Copy RAF Hook'}
              </button>
            </div>

            {/* Visualizer Display */}
            <div className="relative h-52 rounded-2xl overflow-hidden flex flex-col justify-center p-6 border border-white/10 mb-6 bg-[#070412]">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-white/60 mb-1">
                    <span>Raw User Target (Instant Input)</span>
                    <span className="text-pink-300 font-semibold">{Math.round(targetProgress * 100)}%</span>
                  </div>
                  <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-pink-500 rounded-full transition-all duration-75"
                      style={{ width: `${targetProgress * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-white/60 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-purple-400" />
                      Smoothed Timeline (Lerp factor: {lerpFactor})
                    </span>
                    <span className="text-purple-300 font-semibold">{Math.round(smoothedProgress * 100)}%</span>
                  </div>
                  <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      style={{ width: `${smoothedProgress * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <label className="flex flex-col gap-1.5">
                <span className="text-white/70 flex justify-between">
                  <span>Input Scrub Target</span>
                  <span className="font-mono text-purple-300">{Math.round(targetProgress * 100)}%</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={targetProgress}
                  onChange={(e) => setTargetProgress(Number(e.target.value))}
                  className="accent-pink-400 cursor-pointer"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-white/70 flex justify-between">
                  <span>Lerp Smoothing (alpha)</span>
                  <span className="font-mono text-purple-300">{lerpFactor}</span>
                </span>
                <input
                  type="range"
                  min={0.05}
                  max={0.25}
                  step={0.01}
                  value={lerpFactor}
                  onChange={(e) => setLerpFactor(Number(e.target.value))}
                  className="accent-purple-400 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

