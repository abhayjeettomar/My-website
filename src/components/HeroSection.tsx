import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { AeroDriveMode } from '../types/roadster';
import { HERO_AMBIENT_VIDEO_URL } from '../data/roadsterSpecs';
import { RoadsterAeroCanvas } from './RoadsterAeroCanvas';
import { LaunchTelemetrySim } from './LaunchTelemetrySim';

interface HeroSectionProps {
  activeMode: AeroDriveMode;
  onSelectMode: (mode: AeroDriveMode) => void;
  primaryColorHex: string;
  onOpenReserve: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeMode,
  onSelectMode,
  primaryColorHex,
  onOpenReserve,
}) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [mouseNormX, setMouseNormX] = useState(0);
  const [typedText, setTypedText] = useState('');

  const fullManifesto =
    'We already put a Roadster in a rocket. Now we put a rocket in Roadster. Multi-mode ground suction paired with SpaceX cold-gas thrusters.';

  useEffect(() => {
    let idx = 0;
    const timer = setInterval(() => {
      idx += 1;
      setTypedText(fullManifesto.slice(0, idx));
      if (idx >= fullManifesto.length) clearInterval(timer);
    }, 32);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const norm = (e.clientX / window.innerWidth) * 2 - 1;
    setMouseNormX(norm);
  };

  const headlineWords = ['Beyond', 'The', 'Limits', 'of', 'Physics.'];

  return (
    <section id="hero" onMouseMove={handleMouseMove} className="relative bg-[#050508]">
      {/* LAYER 0: Sticky Full-Viewport Video & Interactive 60FPS Wind-Tunnel Canvas */}
      <div className="relative z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            src={HERO_AMBIENT_VIDEO_URL}
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen pointer-events-none"
          />
          <div className="absolute inset-0 aerospace-grid opacity-55 pointer-events-none" />

          {/* Interactive 60fps Roadster Wind-Tunnel & Cold-Gas Thruster Stage */}
          <div className="absolute inset-0 flex items-center justify-center pt-12">
            <RoadsterAeroCanvas
              driveMode={activeMode}
              primaryColorHex={primaryColorHex}
              isLaunching={isLaunching}
              mouseNormX={mouseNormX}
            />
          </div>

          {/* Bottom 42% Smooth Obsidian Gradient Fade (Exact MotionSites Pattern) */}
          <div
            className="absolute inset-x-0 bottom-0 h-[42%] pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent, #050508)',
            }}
          />
        </div>
      </div>

      {/* LAYER 1: Foreground Content Scrolling Over Sticky Stage (-mt-[100vh]) */}
      <div className="relative z-10 -mt-[100vh] min-h-screen flex flex-col justify-between px-5 sm:px-8 md:px-12 pt-28 pb-14 max-w-7xl mx-auto">
        {/* Top Row: Left Editorial Tag & Right Spec Micro-Readout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 border-l-2 border-[#E82127] bg-white/10 backdrop-blur-md px-3.5 py-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/90">
              A TRUE PILOT&apos;S CAR // SPACEX PACKAGE
            </span>
          </div>

          <div className="font-mono text-xs text-white/60 flex items-center gap-4">
            <span>0–60 MPH: &lt; 1.0s</span>
            <span>·</span>
            <span>TOP SPEED: &gt; 250 MPH</span>
            <span>·</span>
            <span>RANGE: 620 MI</span>
          </div>
        </div>

        {/* Bottom Row: Left Kinetic Blur Headline & Right Live Thruster Launch Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mt-auto pt-36">
          <div className="lg:col-span-7">
            {/* Subtle Blurred Intro Label (Sharpens on Hover — MotionSites Mainframe Pattern) */}
            <div className="text-white/75 text-sm sm:text-base mb-3 transition-all duration-300 blur-[1.5px] hover:blur-0 select-none cursor-default">
              Multi-Mode Ground-Sealing Suction System · 10 Perimeter Cold-Gas Thrusters
            </div>

            {/* Staggered Word-by-Word Blur Reveal H1 */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.03] tracking-tight text-white flex flex-wrap gap-x-4 gap-y-1">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, filter: 'blur(14px)', y: 22 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.1 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={word === 'Physics.' ? 'gold-glazed-serif pr-2' : ''}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Typewriter Engineering Manifesto */}
            <p className="mt-5 text-white/85 text-sm sm:text-base max-w-xl leading-relaxed min-h-[48px] font-light">
              {typedText}
              <span className="inline-block w-[2px] h-[1.05em] bg-[#E82127] align-middle ml-1 animate-cursor-blink" />
            </p>

            {/* Primary & Secondary Pill CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenReserve}
                className="bg-white text-black hover:bg-amber-100 rounded-full px-6 py-3 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all shadow-xl cursor-pointer"
              >
                <span>Reserve Roadster ($50,000)</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#suction-aero"
                className="liquid-glass rounded-full px-6 py-3 text-xs sm:text-sm text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                Explore Ground-Sealing Suction ↓
              </a>

              <a
                href="#editions"
                className="liquid-glass rounded-full px-5 py-3 text-xs sm:text-sm text-amber-300 hover:text-white transition-all cursor-pointer"
              >
                Compare 3 Editions (Road · Race · Air)
              </a>
            </div>
          </div>

          {/* Right Column: Live Interactive COPV Launch Simulator */}
          <div className="lg:col-span-5 flex lg:justify-end">
            <LaunchTelemetrySim
              activeMode={activeMode}
              onSelectMode={onSelectMode}
              onLaunchStateChange={setIsLaunching}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
