import React, { useState } from 'react';
import { X, Wand2, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RestyleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type AestheticOption =
  | 'liquid-glass-obsidian'
  | 'retrofuturist-3d'
  | 'scroll-neural-3d'
  | 'editorial-nordic';

interface AestheticPreset {
  id: AestheticOption;
  name: string;
  tagline: string;
  accent: string;
  badge: string;
}

const AESTHETICS: AestheticPreset[] = [
  {
    id: 'liquid-glass-obsidian',
    name: 'Liquid Glass Obsidian',
    tagline: 'Deep dark palette (#0A061A) with refractive glass cards & sticky loop video',
    accent: '#A855F7',
    badge: 'Flagship',
  },
  {
    id: 'retrofuturist-3d',
    name: 'Retrofuturist 3D Scrub',
    tagline: 'Horizontal cursor-scrubbed video with blurred intro typography and typewriter',
    accent: '#38BDF8',
    badge: 'Interactive',
  },
  {
    id: 'scroll-neural-3d',
    name: 'Scroll-Scrubbed Neural 3D',
    tagline: '60fps lerp-smoothed video background bound to scroll depth with frosted stats',
    accent: '#F59E0B',
    badge: 'AI & SaaS',
  },
  {
    id: 'editorial-nordic',
    name: 'Editorial Nordic',
    tagline: 'Instrument Serif typography with atmospheric mist parallax and coordinate tickers',
    accent: '#34D399',
    badge: 'Editorial',
  },
];

export const RestyleDrawer: React.FC<RestyleDrawerProps> = ({ isOpen, onClose }) => {
  const [siteUrl, setSiteUrl] = useState('https://mycompany.com');
  const [existingCopy, setExistingCopy] = useState(
    'We build high-performance software for high-growth tech companies. Contact us for a proposal.'
  );
  const [selectedAesthetic, setSelectedAesthetic] =
    useState<AestheticOption>('liquid-glass-obsidian');
  const [copied, setCopied] = useState(false);

  const activeAesthetic = AESTHETICS.find((a) => a.id === selectedAesthetic) || AESTHETICS[0];

  const generatedRestylePrompt = `# RESTYLE REFACTORING SPECIFICATION FOR GOOGLE ANTIGRAVITY IDE (agy)
Target URL / Source Project: ${siteUrl || 'Custom Application'}
Design Aesthetic: ${activeAesthetic.name} (${activeAesthetic.badge})
Primary Accent Token: ${activeAesthetic.accent}

## DIRECTIVE FOR ANTIGRAVITY AGENT
Refactor and elevate the existing website design into an award-winning MotionSites flagship while strictly preserving all existing brand messaging, value propositions, and core offerings.

## SOURCE COPY TO PRESERVE & UPGRADE
"""
${existingCopy}
"""

## APPLIED MOTIONSITES ARCHITECTURE & TOKENS
1. Theme: Canvas Obsidian (#0A061A / #05030D) with primary accent ${activeAesthetic.accent}.
2. Surfaces: Replace flat cards with official .liquid-glass refractive surfaces:
   - backdrop-filter: blur(18px) saturate(1.4) brightness(1.05)
   - 1.5px gradient border with -webkit-mask-composite: xor (mask-composite: exclude)
   - Inset 0 0 12px rgba(255, 255, 255, 0.15) specular glow.
3. Motion Choreography:
   - Word-by-word blur-in headline entrance (initial={{ opacity: 0, filter: 'blur(12px)', y: 18 }}, animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}).
   - Sticky / scroll-scrubbed video layer with 0.12 lerp factor.
   - Interactive cursor-tracking spotlight on hover.
4. Execution Contract:
   - Zero placeholders. Implement all interactive states, responsive behavior for desktop (1440px) and mobile (390px), and verify with zero bundler warnings.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedRestylePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative z-10 w-full max-w-xl bg-[#090614] border-l border-white/15 h-full flex flex-col justify-between shadow-2xl p-6 sm:p-8 overflow-y-auto"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center">
                    <Wand2 className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Restyle Existing Website</h3>
                    <p className="text-xs text-white/50">
                      Keep your content · Upgrade to award-winning motion
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Step 1: Website URL & Existing Copy */}
              <div className="space-y-4 mb-6">
                <label className="flex flex-col gap-1 text-xs">
                  <span className="text-white/70">Existing Website URL (Optional)</span>
                  <input
                    type="url"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-400"
                  />
                </label>

                <label className="flex flex-col gap-1 text-xs">
                  <span className="text-white/70">Current Headline & Copy to Keep</span>
                  <textarea
                    rows={3}
                    value={existingCopy}
                    onChange={(e) => setExistingCopy(e.target.value)}
                    className="bg-black/50 border border-white/15 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-purple-400 resize-none font-sans"
                  />
                </label>
              </div>

              {/* Step 2: Pick Target Aesthetic */}
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-300 block mb-3">
                  Select Target Motion Aesthetic:
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {AESTHETICS.map((aes) => {
                    const isSelected = selectedAesthetic === aes.id;
                    return (
                      <button
                        key={aes.id}
                        onClick={() => setSelectedAesthetic(aes.id)}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-purple-950/40 border-purple-400/60 shadow-lg'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: aes.accent }}
                          />
                          <div>
                            <div className="text-xs font-medium text-white">{aes.name}</div>
                            <div className="text-[11px] text-white/50 line-clamp-1">{aes.tagline}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/70 shrink-0">
                          {aes.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Generated Refactoring Prompt Preview */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-purple-300 block mb-2">
                  Generated Antigravity IDE Prompt:
                </span>
                <pre className="bg-[#05030D] border border-white/10 rounded-2xl p-4 text-[11px] font-mono text-purple-100/90 overflow-x-auto max-h-[220px] leading-relaxed whitespace-pre-wrap select-text">
                  {generatedRestylePrompt}
                </pre>
              </div>
            </div>

            {/* Sticky Actions */}
            <div className="pt-5 border-t border-white/10 mt-6 flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 bg-white text-black hover:bg-purple-100 py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Copied Restyle Prompt!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Restyle Prompt</span>
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="liquid-glass hover:bg-white/15 px-5 py-3 rounded-full text-xs text-white transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

