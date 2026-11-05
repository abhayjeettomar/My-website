import React, { useState } from 'react';
import { Copy, Check, Film, Sparkles, Code2 } from 'lucide-react';
import { ANIMATED_BACKGROUNDS_CATALOG } from '../data/motionsitesCatalog';
import { AnimatedBackgroundAsset } from '../types/catalog';

export const AnimatedBackgroundsView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySnippet = (asset: AnimatedBackgroundAsset) => {
    navigator.clipboard.writeText(asset.promptSnippet);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="py-12 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="liquid-glass px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-purple-300 inline-flex items-center gap-2 mb-4">
          <Film className="w-3.5 h-3.5" />
          Motion Video Assets Shelf
        </span>
        <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white">
          Cinematic <span className="shimmer-superpowers">Animated Backgrounds</span>
        </h2>
        <p className="text-white/60 text-base font-light mt-4">
          Production-grade 60fps loop videos and scrubbable 3D sequences hosted on Amazon CloudFront. Copy the exact React snippet with zero buffering latency.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ANIMATED_BACKGROUNDS_CATALOG.map((asset) => (
          <div
            key={asset.id}
            className="liquid-glass spotlight-card rounded-3xl overflow-hidden border border-white/15 flex flex-col justify-between group"
          >
            {/* Video preview */}
            <div className="relative aspect-video w-full bg-[#05030D] overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={asset.posterUrl}
                src={asset.videoUrl}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/70 backdrop-blur-md text-white border border-white/15">
                  {asset.resolution}
                </span>
                <span className="px-2 py-1 rounded-full text-[10px] font-mono bg-purple-500/80 text-white backdrop-blur-md">
                  {asset.fps}
                </span>
              </div>
              <div className="absolute bottom-3 right-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/70 backdrop-blur-md text-white/80">
                  {asset.duration}
                </span>
              </div>
            </div>

            {/* Info and Copy */}
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300">
                  {asset.styleTag}
                </span>
                <h3 className="text-base font-medium text-white mt-1">{asset.title}</h3>
              </div>

              <div>
                <div className="bg-[#05030D] p-3 rounded-xl border border-white/10 text-[10px] font-mono text-purple-200 overflow-x-auto max-h-24 whitespace-pre-wrap mb-3">
                  {asset.promptSnippet}
                </div>
                <button
                  onClick={() => handleCopySnippet(asset)}
                  className="w-full bg-white text-black hover:bg-purple-100 py-2.5 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  {copiedId === asset.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied Video Snippet ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy React Video Tag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

