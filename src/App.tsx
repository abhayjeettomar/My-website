import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  OFFICIAL_VARIANTS,
  RoadsterVariant,
  WORLD_CHAPTERS,
} from './data/roadsterWorldData';
import { damp } from './utils/scrollConductor';
import { PreloaderAperture } from './components/PreloaderAperture';
import { NavbarMinimal } from './components/NavbarMinimal';
import { PersistentRoadsterWorld } from './components/PersistentRoadsterWorld';
import { ChapterStoryOverlay } from './components/ChapterStoryOverlay';
import { AxialExplodedRig } from './components/AxialExplodedRig';
import { XRayHardwareLoupe } from './components/XRayHardwareLoupe';
import { VariantComparisonMatrix } from './components/VariantComparisonMatrix';
import { AllocationFinalSection } from './components/AllocationFinalSection';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [smoothChapterPos, setSmoothChapterPos] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [activeNavSection, setActiveNavSection] = useState('world-journey');
  const [worldOpacity, setWorldOpacity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<RoadsterVariant>(
    OFFICIAL_VARIANTS[2]
  );

  const lenisRef = useRef<Lenis | null>(null);
  const conductorRef = useRef({
    target: 0,
    smooth: 0,
    velocity: 0,
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    let lastTime = performance.now();

    const updateConductor = () => {
      const now = performance.now();
      const dt = Math.max(0.001, (now - lastTime) * 0.001);
      lastTime = now;

      const journeyEl = document.getElementById('world-journey');
      if (journeyEl) {
        const rect = journeyEl.getBoundingClientRect();
        const totalScrollable = Math.max(
          1,
          journeyEl.offsetHeight - window.innerHeight
        );
        const scrolled = Math.max(0, -rect.top);
        const normalized = Math.max(0, Math.min(1, scrolled / totalScrollable));
        const maxChapter = WORLD_CHAPTERS.length - 1;
        conductorRef.current.target = normalized * maxChapter;
        conductorRef.current.smooth = damp(
          conductorRef.current.smooth,
          conductorRef.current.target,
          6.5,
          dt
        );
        conductorRef.current.velocity = lenis.velocity || 0;

        setSmoothChapterPos(conductorRef.current.smooth);
        setScrollVelocity(conductorRef.current.velocity);
        setActiveChapterIdx(Math.round(conductorRef.current.smooth));

        // Gently dim background canvas when deep inside standalone lower inspection sections
        const pastJourney =
          -rect.top > journeyEl.offsetHeight - window.innerHeight * 0.6;
        setWorldOpacity(pastJourney ? 0.22 : 1);
      }

      // Update active navbar highlight
      const sections = [
        'world-journey',
        'axial-architecture',
        'xray-inspection',
        'variants-matrix',
      ];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (
            r.top <= window.innerHeight * 0.45 &&
            r.bottom >= window.innerHeight * 0.25
          ) {
            setActiveNavSection(id);
            break;
          }
        }
      }
    };

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
      updateConductor();
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  const handleSelectChapter = useCallback((chapterIndex: number) => {
    const el = document.querySelector(`[data-chapter-index="${chapterIndex}"]`);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el as HTMLElement, { duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleJumpToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOpenReserve = useCallback(() => {
    handleJumpToSection('allocation-terminal');
  }, [handleJumpToSection]);

  const handleSelectVariantForReserve = useCallback(
    (variant: RoadsterVariant) => {
      setSelectedVariant(variant);
      handleJumpToSection('allocation-terminal');
    },
    [handleJumpToSection]
  );

  return (
    <div className="relative min-h-[100dvh] bg-[#09090B] text-[#F4F4F6]">
      {!preloaderDone && (
        <PreloaderAperture onComplete={() => setPreloaderDone(true)} />
      )}

      <NavbarMinimal
        activeSection={activeNavSection}
        onJumpToSection={handleJumpToSection}
        onOpenReserve={handleOpenReserve}
      />

      {/* Single Persistent WebGL Camera & Laminar Airflow World (Zero Horizontal Section Cuts) */}
      <PersistentRoadsterWorld
        smoothChapterPos={smoothChapterPos}
        scrollVelocity={scrollVelocity}
        worldOpacity={worldOpacity}
      />

      {/* Main Continuous Scroll Narrative & Interactive Hardware Modules */}
      <main className="relative z-10">
        <ChapterStoryOverlay
          activeChapterIndex={activeChapterIdx}
          onSelectChapter={handleSelectChapter}
          onOpenReserve={handleOpenReserve}
        />
        <AxialExplodedRig />
        <XRayHardwareLoupe />
        <VariantComparisonMatrix
          onSelectVariantForReserve={handleSelectVariantForReserve}
        />
      </main>

      <AllocationFinalSection
        selectedVariant={selectedVariant}
        onSelectVariant={setSelectedVariant}
      />
    </div>
  );
}

export default App;
