import React, { useState, useEffect } from 'react';
import { AeroDriveMode, RoadsterEditionId } from './types/roadster';
import { EXTERIOR_COLORS, INTERIOR_TRIMS } from './data/roadsterSpecs';
import { NavbarHud } from './components/NavbarHud';
import { HeroSection } from './components/HeroSection';
import { SuctionAeroSection } from './components/SuctionAeroSection';
import { ColdGasThrusterSection } from './components/ColdGasThrusterSection';
import { EditionsBentoSection } from './components/EditionsBentoSection';
import { MaterialityGoldGlazeSection } from './components/MaterialityGoldGlazeSection';
import { SupersonicCockpitSection } from './components/SupersonicCockpitSection';
import { RoadsterConfigurator } from './components/RoadsterConfigurator';
import { ReservationModal } from './components/ReservationModal';
import { Footer } from './components/Footer';

export function App() {
  const [activeMode, setActiveMode] = useState<AeroDriveMode>('spacex-thruster');
  const [selectedEdition, setSelectedEdition] = useState<RoadsterEditionId>('race-ready');
  const [selectedColorId, setSelectedColorId] = useState<string>(EXTERIOR_COLORS[0].id);
  const [selectedTrimId, setSelectedTrimId] = useState<string>(INTERIOR_TRIMS[0].id);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isReserveOpen, setIsReserveOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeColor =
    EXTERIOR_COLORS.find((c) => c.id === selectedColorId) || EXTERIOR_COLORS[0];

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-[#E82127]/40 selection:text-white">
      <NavbarHud
        activeMode={activeMode}
        onSelectMode={setActiveMode}
        scrollProgress={scrollProgress}
        onOpenReserve={() => setIsReserveOpen(true)}
      />
      <main>
        <HeroSection
          activeMode={activeMode}
          onSelectMode={setActiveMode}
          primaryColorHex={activeColor.primaryHex}
          onOpenReserve={() => setIsReserveOpen(true)}
        />
        <SuctionAeroSection primaryColorHex={activeColor.primaryHex} />
        <ColdGasThrusterSection />
        <EditionsBentoSection
          selectedEdition={selectedEdition}
          onSelectEdition={(ed) => {
            setSelectedEdition(ed);
            if (ed === 'air-ready') setActiveMode('air-hover');
            else if (ed === 'race-ready') setActiveMode('spacex-thruster');
            else setActiveMode('track-suction');
          }}
          onOpenReserve={() => setIsReserveOpen(true)}
        />
        <MaterialityGoldGlazeSection />
        <SupersonicCockpitSection />
        <RoadsterConfigurator
          selectedEdition={selectedEdition}
          onSelectEdition={setSelectedEdition}
          selectedColorId={selectedColorId}
          onSelectColorId={setSelectedColorId}
          selectedTrimId={selectedTrimId}
          onSelectTrimId={setSelectedTrimId}
          onOpenReserve={() => setIsReserveOpen(true)}
        />
      </main>
      <Footer />
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        selectedEdition={selectedEdition}
        selectedColorId={selectedColorId}
        selectedTrimId={selectedTrimId}
      />
    </div>
  );
}

export default App;
