import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { NavbarMinimal } from './components/NavbarMinimal';
import { HeroPinnedStage } from './components/HeroPinnedStage';
import { PinnedApertureBreakdown } from './components/PinnedApertureBreakdown';
import { HorizontalHardwareTrack } from './components/HorizontalHardwareTrack';
import { AirborneSequenceSection } from './components/AirborneSequenceSection';
import { StickyEditionsStack } from './components/StickyEditionsStack';
import { SupersonicCockpitSection } from './components/SupersonicCockpitSection';
import { ReserveDrawerModal } from './components/ReserveDrawerModal';
import { FooterParallax } from './components/FooterParallax';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState('Roadster Thrust');

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (preloaderDone) {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, [preloaderDone]);

  return (
    <div className="min-h-screen bg-[#060608] text-[#F5F5F7] film-grain">
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <CustomCursor />
      <NavbarMinimal onOpenReserve={() => setReserveModalOpen(true)} />

      <main>
        {/* 01: Pinned Split-Frame Hero & Scroll-Scrubbed 3D Video Unveil */}
        <HeroPinnedStage onOpenReserve={() => setReserveModalOpen(true)} />

        {/* 02: Pinned Expanding Clip-Path Window & 3-Chapter Photographic Crossfade */}
        <PinnedApertureBreakdown />

        {/* 03: Pinned 500vw Horizontal Hardware Inspection Track (6 Real Photo Plates) */}
        <HorizontalHardwareTrack />

        {/* 04: "Feat of Strength: Complete" 4-Stage Airborne & Wall-Adhesion Sequence */}
        <AirborneSequenceSection />

        {/* 05: Sticky Receding 3D Card Stack (Performance, Thrust 0.85s, Rocket 0.59s) */}
        <StickyEditionsStack
          onSelectVariantAndReserve={(variantName) => {
            setSelectedVariant(variantName);
            setReserveModalOpen(true);
          }}
        />

        {/* 06: Supersonic Cockpit Photograph with Clip-Path Unveil & Interactive Hotspots */}
        <SupersonicCockpitSection />
      </main>

      {/* 07: Finale Full-Bleed Footer */}
      <FooterParallax onOpenReserve={() => setReserveModalOpen(true)} />

      <ReserveDrawerModal
        isOpen={reserveModalOpen}
        initialVariant={selectedVariant}
        onClose={() => setReserveModalOpen(false)}
      />
    </div>
  );
}

export default App;
