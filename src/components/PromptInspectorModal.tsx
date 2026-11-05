import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Download, Monitor, Tablet, Smartphone, Wand2, Layers } from 'lucide-react';
import { DesignPromptItem, TargetAIBuilder } from '../types/catalog';
import { compileRemixedPrompt, RemixConfig } from '../utils/promptCompiler';

interface PromptInspectorModalProps {
  item: DesignPromptItem | null;
  onClose: () => void;
}

const BUILDER_OPTIONS: { id: TargetAIBuilder; label: string }[] = [
  { id: 'antigravity', label: 'Google Antigravity IDE' },
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'cursor', label: 'Cursor' },
  { id: 'lovable', label: 'Lovable' },
  { id: 'bolt', label: 'Bolt.new' },
  { id: 'v0', label: 'v0.dev' },
];

export const PromptInspectorModal: React.FC<PromptInspectorModalProps> = ({ item, onClose }) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [targetBuilder, setTargetBuilder] = useState<TargetAIBuilder>('antigravity');
  const [brandName, setBrandName] = useState('');
  const [tagline, setTagline] = useState('');
  const [accentHex, setAccentHex] = useState('#A855F7');
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setBrandName(item.defaultBrand.name);
      setTagline(item.defaultBrand.tagline);
      setAccentHex(item.tokens.accentHex);
      setCustomVideoUrl(item.videoUrl || '');
    }
  }, [item]);

  if (!item) return null;

  const remixConfig: RemixConfig = {
    brandName,
    tagline,
    accentHex,
    customVideoUrl,
    targetBuilder,
  };

  const compiledSpec = compileRemixedPrompt(item, remixConfig);

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledSpec);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([compiledSpec], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.id}-${targetBuilder}-prompt.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="liquid-glass-strong rounded-3xl max-w-7xl w-full border border-white/20 overflow-hidden shadow-2xl my-auto">
        {/* Top Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/20 text-purple-300 border border-purple-400/30">
              {item.badge}
            </span>
            <h2 className="text-lg sm:text-xl font-medium text-white">{item.title}</h2>
            <span className="text-xs text-white/45 hidden sm:inline">
              · {item.techStack.join(' + ')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMd}
              className="liquid-glass px-3.5 py-2 rounded-full text-xs text-white/90 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download .md
            </button>
            <button
              onClick={handleCopy}
              className="bg-white text-black hover:bg-purple-100 px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copied Compiled Prompt ✓
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Full Prompt
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Split Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[82vh] overflow-y-auto lg:overflow-hidden">
          {/* Left Pane: Interactive Live Preview & Remix Controls (52% on lg) */}
          <div className="lg:col-span-6 p-6 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Viewport Toggles */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60">
                  Live Interactive Preview
                </span>
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/10">
                  <button
                    onClick={() => setViewport('desktop')}
                    className={`p-1.5 rounded-full text-xs cursor-pointer ${
                      viewport === 'desktop' ? 'bg-white text-black' : 'text-white/60'
                    }`}
                    title="Desktop Viewport"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewport('tablet')}
                    className={`p-1.5 rounded-full text-xs cursor-pointer ${
                      viewport === 'tablet' ? 'bg-white text-black' : 'text-white/60'
                    }`}
                    title="Tablet Viewport"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewport('mobile')}
                    className={`p-1.5 rounded-full text-xs cursor-pointer ${
                      viewport === 'mobile' ? 'bg-white text-black' : 'text-white/60'
                    }`}
                    title="Mobile Viewport"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Responsive Preview Stage */}
              <div className="bg-[#04020A] rounded-2xl p-3 border border-white/10 flex justify-center">
                <div
                  style={{ backgroundColor: item.tokens.bgHex }}
                  className={`relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 transition-all duration-300 flex flex-col justify-between p-5 ${
                    viewport === 'desktop'
                      ? 'w-full'
                      : viewport === 'tablet'
                      ? 'w-[78%]'
                      : 'w-[52%] aspect-[9/14]'
                  }`}
                >
                  {customVideoUrl ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      src={customVideoUrl}
                      className="absolute inset-0 w-full h-full object-cover opacity-75"
                    />
                  ) : (
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-65"
                    />
                  )}

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 80% 20%, ${accentHex}44, transparent 50%), linear-gradient(to top, ${item.tokens.bgHex} 5%, transparent 65%)`,
                    }}
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-white font-medium text-sm tracking-tight">
                      {brandName}
                    </span>
                    <span
                      style={{ backgroundColor: accentHex }}
                      className="text-black text-[10px] font-semibold px-3 py-1 rounded-full shadow"
                    >
                      {item.defaultBrand.ctaPrimary}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <div className="liquid-glass rounded-xl p-3.5 max-w-md">
                      <h4 className="text-white text-base sm:text-lg font-light leading-snug">
                        {tagline}
                      </h4>
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        <span className="bg-white text-black text-[10px] font-medium px-3 py-1 rounded-full">
                          {item.defaultBrand.ctaPrimary}
                        </span>
                        <span className="border border-white/30 text-white text-[10px] px-3 py-1 rounded-full">
                          {item.defaultBrand.ctaSecondary}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Token Swatches & Techniques */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-white/50 text-[11px] font-mono">Tokens:</span>
                  {[
                    { label: 'BG', val: item.tokens.bgHex },
                    { label: 'Surface', val: item.tokens.surfaceHex },
                    { label: 'Accent', val: accentHex },
                  ].map((tok) => (
                    <button
                      key={tok.label}
                      onClick={() => handleCopyHex(tok.val)}
                      className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md border border-white/10 hover:border-white/30 text-[11px] font-mono text-white/80 cursor-pointer"
                      title="Click to copy hex"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white/20"
                        style={{ backgroundColor: tok.val.startsWith('#') ? tok.val : '#888' }}
                      />
                      <span>{copiedHex === tok.val ? 'Copied!' : tok.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-[11px] text-white/50 font-mono">
                  <Layers className="w-3 h-3 text-purple-400" />
                  <span>{item.techniques.length} Techniques</span>
                </div>
              </div>

              {/* Brand Remix Studio Form */}
              <div className="mt-4 liquid-glass rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-300 mb-3">
                  <Wand2 className="w-3.5 h-3.5" />
                  Live Brand Remix Engine (Auto-Updates Prompt Spec)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label className="flex flex-col gap-1">
                    <span className="text-white/60">Brand / Project Name</span>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                    />
                  </label>

                  <label className="flex flex-col gap-1">
                    <span className="text-white/60">Primary Accent Hex</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={accentHex.startsWith('#') ? accentHex : '#A855F7'}
                        onChange={(e) => setAccentHex(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={accentHex}
                        onChange={(e) => setAccentHex(e.target.value)}
                        className="flex-1 bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </label>

                  <label className="flex flex-col gap-1 sm:col-span-2">
                    <span className="text-white/60">Hero Headline / Tagline</span>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Pane: Target AI Builder Selector & Full Markdown Spec (48% on lg) */}
          <div className="lg:col-span-6 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-white/60 block mb-2">
                  Optimize Prompt Format For AI Builder:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {BUILDER_OPTIONS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setTargetBuilder(b.id)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                        targetBuilder === b.id
                          ? 'bg-white text-black font-medium shadow'
                          : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative mt-3">
                <pre className="bg-[#05030D] border border-white/15 rounded-2xl p-4 text-[11px] font-mono text-purple-100/90 overflow-x-auto max-h-[52vh] leading-relaxed whitespace-pre-wrap select-text">
                  {compiledSpec}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

