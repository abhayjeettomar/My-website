import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Copy, Check, MousePointer, ScrollText, ExternalLink } from 'lucide-react';
import { DESIGN_PROMPTS_CATALOG } from '../data/motionsitesCatalog';
import { DesignPromptItem } from '../types/catalog';

interface InteractiveHeroPreviewProps {
  onInspectPrompt: (item: DesignPromptItem) => void;
}

type HeroEngineMode = 'liquid-glass' | 'mouse-scrub' | 'scroll-scrub';

export const InteractiveHeroPreview: React.FC<InteractiveHeroPreviewProps> = ({ onInspectPrompt }) => {
  const [engineMode, setEngineMode] = useState<HeroEngineMode>('liquid-glass');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mode 2: Mouse-scrubbed video state (Mainframe A.R.I.A.)
  const scrubVideoRef = useRef<HTMLVideoElement | null>(null);
  const [scrubProgress, setScrubProgress] = useState<number>(0.35);
  const [typedText, setTypedText] = useState<string>('');
  const fullQuote = 'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

  // Mode 3: Scroll-scrubbed video state (NovaAI)
  const scrollVideoRef = useRef<HTMLVideoElement | null>(null);
  const [scrollSimProgress, setScrollSimProgress] = useState<number>(0.25);

  // Typewriter effect for Mode 2
  useEffect(() => {
    if (engineMode !== 'mouse-scrub') return;
    setTypedText('');
    let idx = 0;
    const timer = setInterval(() => {
      idx += 1;
      setTypedText(fullQuote.slice(0, idx));
      if (idx >= fullQuote.length) clearInterval(timer);
    }, 34);
    return () => clearInterval(timer);
  }, [engineMode]);

  const handleMouseMoveScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (engineMode !== 'mouse-scrub') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setScrubProgress(ratio);
    const video = scrubVideoRef.current;
    if (video && video.duration && !Number.isNaN(video.duration)) {
      video.currentTime = ratio * (video.duration - 0.05);
    }
  };

  const handleScrollSliderChange = (val: number) => {
    setScrollSimProgress(val);
    const video = scrollVideoRef.current;
    if (video && video.duration && !Number.isNaN(video.duration)) {
      video.currentTime = val * (video.duration - 0.05);
    }
  };

  const currentCatalogItem =
    engineMode === 'liquid-glass'
      ? DESIGN_PROMPTS_CATALOG[0]
      : engineMode === 'mouse-scrub'
      ? DESIGN_PROMPTS_CATALOG[1]
      : DESIGN_PROMPTS_CATALOG[2];

  const handleQuickCopy = (item: DesignPromptItem) => {
    navigator.clipboard.writeText(item.fullPrompt);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="liquid-glass-strong rounded-3xl p-4 sm:p-5 border border-white/15 shadow-2xl">
      {/* Top Engine Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-white/10">
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-full border border-white/10">
          <button
            onClick={() => setEngineMode('liquid-glass')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              engineMode === 'liquid-glass'
                ? 'bg-white text-black shadow'
                : 'text-white/65 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            1. Liquid Glass Loop
          </button>
          <button
            onClick={() => setEngineMode('mouse-scrub')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              engineMode === 'mouse-scrub'
                ? 'bg-white text-black shadow'
                : 'text-white/65 hover:text-white'
            }`}
          >
            <MousePointer className="w-3 h-3" />
            2. Cursor-Scrub 3D
          </button>
          <button
            onClick={() => setEngineMode('scroll-scrub')}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              engineMode === 'scroll-scrub'
                ? 'bg-white text-black shadow'
                : 'text-white/65 hover:text-white'
            }`}
          >
            <ScrollText className="w-3 h-3" />
            3. Scroll-Scrub 3D
          </button>
        </div>

        <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300/90 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/25">
          Live Interactive Stage
        </span>
      </div>

      {/* Interactive Stage Viewport */}
      <div
        onMouseMove={handleMouseMoveScrub}
        className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#060411] border border-white/10 select-none"
      >
        {engineMode === 'liquid-glass' && (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260721_194026_53c6f9fd-f0d7-4d7d-be62-cdd53b253fb3.mp4"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, #0A061A)' }}
            />
            <div className="relative z-10 h-full flex flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <span className="text-white font-light text-sm tracking-wide">
                  DE&lt;/<span className="font-normal">HELPERS</span>
                </span>
                <span className="bg-white text-black text-[11px] font-medium px-3.5 py-1 rounded-full">
                  Hire us
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                <div className="sm:col-span-6">
                  <div className="text-white text-2xl sm:text-3xl font-light leading-[1.08] tracking-tight">
                    Outsourced<br />development<br />team
                  </div>
                  <p className="text-white/55 text-xs mt-2 font-light">
                    Built off-site. Feels in-house.
                  </p>
                </div>
                <div className="sm:col-span-6">
                  <div className="liquid-glass rounded-xl p-3.5">
                    <div className="flex -space-x-2 mb-2">
                      <img
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Avatar"
                        className="w-6 h-6 rounded-full border border-black/50 object-cover"
                      />
                      <img
                        src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Avatar"
                        className="w-6 h-6 rounded-full border border-black/50 object-cover"
                      />
                      <img
                        src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Avatar"
                        className="w-6 h-6 rounded-full border border-black/50 object-cover"
                      />
                      <img
                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Avatar"
                        className="w-6 h-6 rounded-full border border-black/50 object-cover"
                      />
                    </div>
                    <p className="text-white/90 text-[11px] font-light leading-relaxed">
                      "Working with this team felt like unlocking a cheat code. Pixel-perfect animations in a week."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {engineMode === 'mouse-scrub' && (
          <>
            <video
              ref={scrubVideoRef}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover object-[70%_center]"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
            <div className="relative z-10 h-full flex flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium text-base tracking-tight">
                  Mainframe® ✳
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-purple-200">
                  Move Cursor Horizontally ↔ ({Math.round(scrubProgress * 100)}%)
                </span>
              </div>
              <div className="max-w-md">
                <div className="text-white/80 text-xs mb-1.5" style={{ filter: 'blur(1.5px)' }}>
                  Hey there, meet A.R.I.A — Mainframe's Adaptive Agent
                </div>
                <p className="text-white text-sm sm:text-base font-normal leading-snug min-h-[42px]">
                  {typedText}
                  <span className="inline-block w-[2px] h-[1em] bg-white align-middle ml-1 animate-cursor-blink" />
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <span className="bg-white text-black rounded-full text-[11px] px-3 py-1 font-medium">
                    Pitch us an idea
                  </span>
                  <span className="bg-white text-black rounded-full text-[11px] px-3 py-1 font-medium">
                    See how we operate
                  </span>
                  <span className="border border-white text-white rounded-full text-[11px] px-3 py-1">
                    hello@mainframe.co
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {engineMode === 'scroll-scrub' && (
          <>
            <video
              ref={scrollVideoRef}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4"
            />
            <div className="absolute inset-0 bg-black/25 pointer-events-none" />
            <div className="relative z-10 h-full flex flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] border-l-2 border-white bg-white/15 px-2.5 py-1 backdrop-blur-md">
                  We Automate 100+ Businesses
                </span>
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <span className="text-[10px] font-mono text-white/75">Scroll Scrub:</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={scrollSimProgress}
                    onChange={(e) => handleScrollSliderChange(parseFloat(e.target.value))}
                    className="w-20 accent-purple-400 cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-normal leading-tight text-white drop-shadow-lg">
                    Clear. Precise.<br />Automated.
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/15 p-2.5 backdrop-blur-md border border-white/20 max-w-xs">
                  <img
                    src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85"
                    alt="Mitha, co-founder of NovaAI"
                    className="h-14 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="text-xs font-medium text-white">Talk with Mitha</div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-white/60">
                      Co-founder of NovaAI
                    </div>
                    <span className="inline-block mt-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-black">
                      Book 15-mins call →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Bar: Active Template Info & Instant Actions */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 pt-2">
        <div>
          <div className="text-xs font-medium text-white flex items-center gap-2">
            {currentCatalogItem.title}
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Free Full Prompt
            </span>
          </div>
          <div className="text-[11px] text-white/55">{currentCatalogItem.subtitle}</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onInspectPrompt(currentCatalogItem)}
            className="liquid-glass px-3.5 py-2 rounded-full text-xs text-white/90 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Inspect & Remix
          </button>
          <button
            onClick={() => handleQuickCopy(currentCatalogItem)}
            className="bg-white text-black hover:bg-purple-100 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            {copiedId === currentCatalogItem.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Copied Full Prompt
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Full Prompt
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

