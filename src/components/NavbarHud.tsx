import React, { useState } from 'react';
import { Volume2, VolumeX, Flame, Menu, X } from 'lucide-react';
import { AeroDriveMode } from '../types/roadster';
import { soundEngine } from '../utils/soundSynth';

interface NavbarHudProps {
  activeMode: AeroDriveMode;
  onSelectMode: (mode: AeroDriveMode) => void;
  scrollProgress: number;
  onOpenReserve: () => void;
}

export const NavbarHud: React.FC<NavbarHudProps> = ({
  activeMode,
  onSelectMode,
  scrollProgress,
  onOpenReserve,
}) => {
  const [audioOn, setAudioOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleAudio = () => {
    const next = !audioOn;
    setAudioOn(next);
    soundEngine.enabled = next;
    if (next) soundEngine.playUiTick();
  };

  const navItems = [
    { label: '01 Hero', href: '#hero' },
    { label: '02 Suction Aero', href: '#suction-aero' },
    { label: '03 Cold-Gas Thrusters', href: '#thrusters' },
    { label: '04 Editions', href: '#editions' },
    { label: '05 Gold-Glazed & Mass', href: '#materiality' },
    { label: '06 Supersonic Cockpit', href: '#cockpit' },
    { label: '07 Configure', href: '#configurator' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-12 py-3.5">
      <div className="liquid-glass rounded-full max-w-7xl mx-auto px-5 py-2.5 flex items-center justify-between gap-3 border border-white/15">
        {/* Left: Brand Wordmark & Live Telemetry Pill */}
        <a
          href="#hero"
          className="flex items-center gap-3 text-white hover:opacity-90 transition-opacity"
        >
          <span className="tracking-[0.28em] font-semibold text-xs sm:text-sm uppercase">
            TESLA
          </span>
          <span className="h-3.5 w-[1px] bg-white/20" />
          <span className="font-mono text-[11px] tracking-widest text-[#F59E0B] uppercase">
            ROADSTER // ORBITAL
          </span>
          <span className="hidden xl:inline-flex items-center gap-1.5 text-[10px] font-mono text-white/55 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E82127] animate-pulse" />
            SCROLL {Math.round(scrollProgress * 100)}%
          </span>
        </a>

        {/* Center: Section Anchor Pills */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => soundEngine.playUiTick()}
              className="text-[11px] font-mono text-white/70 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Quick Mode Switcher, Audio Synth & Reserve CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const nextMode: AeroDriveMode =
                activeMode === 'road'
                  ? 'track-suction'
                  : activeMode === 'track-suction'
                  ? 'spacex-thruster'
                  : activeMode === 'spacex-thruster'
                  ? 'air-hover'
                  : 'road';
              onSelectMode(nextMode);
              soundEngine.playThrusterPulse(0.45);
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-white/10 hover:bg-white/15 text-amber-300 border border-amber-400/30 transition-all cursor-pointer"
            title="Cycle Active Aerodynamic / Thruster Mode"
          >
            <Flame className="w-3.5 h-3.5 text-[#E82127]" />
            {activeMode === 'road' && 'Mode: Road Ready'}
            {activeMode === 'track-suction' && 'Mode: Track Suction'}
            {activeMode === 'spacex-thruster' && 'Mode: SpaceX <1.0s'}
            {activeMode === 'air-hover' && 'Mode: Air Ready Hover'}
          </button>

          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              audioOn
                ? 'bg-[#E82127]/20 border-[#E82127]/50 text-white'
                : 'bg-white/5 border-white/15 text-white/60 hover:text-white'
            }`}
            title={audioOn ? 'Mute Thruster & Telemetry Audio' : 'Enable Procedural Thruster Audio'}
          >
            {audioOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              soundEngine.playUiTick();
              onOpenReserve();
            }}
            className="bg-white text-black hover:bg-amber-100 text-xs font-medium px-4 py-2 rounded-full transition-all shadow-lg cursor-pointer"
          >
            Reserve Now
          </button>

          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="lg:hidden p-2 rounded-full bg-white/10 text-white cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 liquid-glass rounded-3xl p-6 border border-white/15 flex flex-col gap-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono text-white/85 hover:text-white py-1.5 border-b border-white/10"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

