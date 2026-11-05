import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Plug } from 'lucide-react';
import { InteractiveHeroPreview } from './InteractiveHeroPreview';
import { DesignPromptItem, NavigationTab } from '../types/catalog';

interface HeroSectionProps {
  onInspectPrompt: (item: DesignPromptItem) => void;
  onNavigateTab: (tab: NavigationTab) => void;
  onScrollToGallery: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onInspectPrompt,
  onNavigateTab,
  onScrollToGallery,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 65 floating luminescent bokeh particles connected by proximity filaments
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const particleCount = 65;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.4 ? '#A855F7' : '#6366F1',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw filaments
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Gentle cursor interaction
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 120 && mDist > 0) {
          const force = (120 - mDist) / 120;
          p.x -= (mdx / mDist) * force * 1.5;
          p.y -= (mdy / mDist) * force * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const headlineWords = ['Unlock', 'your', 'AI', 'Design'];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pb-24 px-4 sm:px-8 md:px-12">
      {/* Sticky / Ambient Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260721_194026_53c6f9fd-f0d7-4d7d-be62-cdd53b253fb3.mp4"
      />

      {/* Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Bottom Gradient Fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none z-0"
        style={{ background: 'linear-gradient(to bottom, transparent, #0A061A)' }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Foreground Typography */}
        <div className="lg:col-span-6 flex flex-col items-start">
          {/* Pill Badge */}
          <div className="liquid-glass px-4 py-1.5 rounded-full text-xs text-purple-200 border border-purple-400/30 flex items-center gap-2 mb-6 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-light">
              500+ Official Premium AI Website Prompts · Compatible with Antigravity IDE, Claude Code, Cursor & Lovable
            </span>
          </div>

          {/* Signature Kinetic Doubled Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.06] text-white flex flex-wrap gap-x-3 mb-2">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, filter: 'blur(12px)', y: 18 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Superpowers with Layered Visual Motif */}
          <div className="relative select-none mb-6">
            {/* Offset kinetic echo layer */}
            <span
              aria-hidden="true"
              className="absolute left-1 top-1 text-5xl sm:text-7xl lg:text-8xl shimmer-superpowers opacity-20 blur-[2px] pointer-events-none"
            >
              Superpowers
            </span>
            <span className="relative text-5xl sm:text-7xl lg:text-8xl shimmer-superpowers block">
              Superpowers
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-white/70 text-base sm:text-lg font-light max-w-xl leading-relaxed mb-8">
            Build award-winning 3D and animated landing pages in minutes with ready-to-use architectural prompts. Just browse a design, copy the full spec, and launch.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={onScrollToGallery}
              className="bg-white text-black hover:bg-purple-100 px-6 py-3 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-xl hover:shadow-purple-500/20 cursor-pointer"
            >
              <span>Explore 500+ Prompts</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('mcp')}
              className="liquid-glass px-5 py-3 rounded-full text-sm text-purple-200 hover:text-white border border-purple-400/30 hover:border-purple-400/60 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plug className="w-4 h-4 text-purple-400" />
              <span>Connect AI Agent MCP</span>
            </button>
          </div>

          {/* Quick Builder Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-white/50">
            <span className="text-white/35">Built for:</span>
            {['Antigravity IDE', 'Claude Code', 'Cursor', 'Lovable', 'Bolt', 'v0'].map((builder, i) => (
              <React.Fragment key={builder}>
                <span className="hover:text-purple-300 transition-colors cursor-default">
                  {builder}
                </span>
                {i < 5 && <span className="text-white/20">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Column: Live Interactive 3-Mode Hero Showcase Widget */}
        <div className="lg:col-span-6 w-full">
          <InteractiveHeroPreview onInspectPrompt={onInspectPrompt} />
        </div>
      </div>
    </section>
  );
};

