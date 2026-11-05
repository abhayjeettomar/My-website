import React, { useRef, useState } from 'react';
import { Copy, Check, Eye, Heart, Code2 } from 'lucide-react';
import { DesignPromptItem } from '../types/catalog';

interface DesignCardProps {
  item: DesignPromptItem;
  autoPlayPreviews: boolean;
  onInspect: (item: DesignPromptItem) => void;
}

export const DesignCard: React.FC<DesignCardProps> = ({
  item,
  autoPlayPreviews,
  onInspect,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && !autoPlayPreviews) {
      videoRef.current.pause();
    }
  };

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onInspect(item)}
      className="liquid-glass spotlight-card rounded-3xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
    >
      {/* Top Visual Preview Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#05030D] border-b border-white/10">
        {item.videoUrl ? (
          <video
            ref={videoRef}
            autoPlay={autoPlayPreviews}
            muted
            loop
            playsInline
            poster={item.posterUrl}
            src={item.videoUrl}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={item.posterUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
          />
        )}

        {/* Dynamic Accent Glow Overlay */}
        <div
          className="absolute inset-0 opacity-35 group-hover:opacity-55 transition-opacity pointer-events-none"
          style={{
            background: `radial-gradient(circle at 75% 25%, ${item.tokens.accentHex}33, transparent 55%), linear-gradient(to top, #05030D 5%, transparent 65%)`,
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-black/65 backdrop-blur-md text-white border border-white/15">
              {item.badge}
            </span>
            {item.isNewDrop && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-purple-500/80 text-white backdrop-blur-md">
                Fresh Drop
              </span>
            )}
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider backdrop-blur-md border ${
              item.isFreeSample
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/35'
                : 'bg-white/10 text-white/85 border-white/20'
            }`}
          >
            {item.isFreeSample ? 'Free Prompt' : 'Unlimited Pro'}
          </span>
        </div>

        {/* Hover Action Bar */}
        <div
          className={`absolute inset-x-3.5 bottom-3.5 z-10 flex items-center justify-between gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInspect(item);
            }}
            className="liquid-glass-strong px-3.5 py-2 rounded-full text-xs text-white hover:bg-white/15 flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            Inspect & Remix
          </button>
          <button
            onClick={handleCopyPrompt}
            className="bg-white text-black hover:bg-purple-100 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Copied Spec
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

      {/* Card Body & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-medium text-white group-hover:text-purple-200 transition-colors">
              {item.title}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLiked((l) => !l);
              }}
              className="text-xs text-white/50 hover:text-pink-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-pink-500 text-pink-500' : ''}`} />
              <span>{item.likes + (liked ? 1 : 0)}</span>
            </button>
          </div>
          <p className="text-xs text-white/55 font-light mt-1 line-clamp-2 leading-relaxed">
            {item.subtitle}
          </p>
        </div>

        {/* Technique Pills & Copy Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {item.techniques.slice(0, 2).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-white/65 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/45">
            <Code2 className="w-3.5 h-3.5 text-purple-400" />
            <span>{item.copiesCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

