import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhotoReelPreloader } from './components/PhotoReelPreloader';
import { CustomCursor } from './components/CustomCursor';
import { NavbarMinimal } from './components/NavbarMinimal';
import { PortalHeroStage } from './components/PortalHeroStage';
import { WebGLDisplacementStage } from './components/WebGLDisplacementStage';
import { XRayHardwareLoupe } from './components/XRayHardwareLoupe';
import { VelocityHardwareRibbon } from './components/VelocityHardwareRibbon';
import { ZAxisVariantsTunnel } from './components/ZAxisVariantsTunnel';
import { SupersonicCockpitSection } from './components/SupersonicCockpitSection';
import { ReserveDrawerModal } from './components/ReserveDrawerModal';
import { FooterParallax } from './components/FooterParallax';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState('Roadster Rocket');

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
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
      setTimeout(() => ScrollTrigger.refresh(), 80);
    }
  }, [preloaderDone]);

  return (
    <div className="min-h-screen bg-[#050507] text-[#F5F5F7]">
      {!preloaderDone && (
        <PhotoReelPreloader onComplete={() => setPreloaderDone(true)} />
      )}
      <CustomCursor />
      <NavbarMinimal onOpenReserve={() => setReserveModalOpen(true)} />

      <main>
        {/* 01: Shared-Element Hero + SVG "0.59s" Knockout Portal Zoom-Through */}
        <PortalHeroStage onOpenReserve={() => setReserveModalOpen(true)} />

        {/* 02: 120FPS Native WebGL GLSL Directional Wind-Displacement & RGB-Split Image Morph */}
        <WebGLDisplacementStage />

        {/* 03: Interactive Sub-Surface X-Ray Mechanical Scanner Loupe */}
        <XRayHardwareLoupe />

        {/* 04: Velocity-Bent 35mm Horizontal Hardware Ribbon */}
        <VelocityHardwareRibbon />

        {/* 05: Continuous 3D Z-Axis Camera Flight Tunnel (Performance -> Thrust -> Rocket) */}
        <ZAxisVariantsTunnel
          onSelectVariantAndReserve={(variantName) => {
            setSelectedVariant(variantName);
            setReserveModalOpen(true);
          }}
        />

        {/* 06: Supersonic Cockpit Real Photograph + Interactive Hotspots */}
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
