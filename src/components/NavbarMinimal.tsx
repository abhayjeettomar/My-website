import React from 'react';

interface NavbarMinimalProps {
  activeSection: string;
  onJumpToSection: (sectionId: string) => void;
  onOpenReserve: () => void;
}

export const NavbarMinimal: React.FC<NavbarMinimalProps> = ({
  activeSection,
  onJumpToSection,
  onOpenReserve,
}) => {
  const navItems = [
    { id: 'world-journey', label: 'Continuous Flight' },
    { id: 'axial-architecture', label: 'Exploded Hardware' },
    { id: 'xray-inspection', label: 'X-Ray Loupe' },
    { id: 'variants-matrix', label: 'Variants' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[68px] px-5 md:px-10 flex items-center justify-between border-b border-white/[0.07] bg-[#09090B]/70 backdrop-blur-xl">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-3 text-left focus:outline-none"
      >
        <span className="font-display text-sm md:text-base font-semibold tracking-[0.26em] uppercase text-[#F4F4F6]">
          TESLA
        </span>
        <span className="text-xs font-mono-tech uppercase tracking-[0.14em] text-[#D4AF37]">
          ROADSTER
        </span>
      </button>

      <nav className="hidden lg:flex items-center gap-8" aria-label="Primary Navigation">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onJumpToSection(item.id)}
              className={`text-xs font-medium tracking-[0.06em] transition-colors duration-200 ${
                isActive ? 'text-[#F4F4F6]' : 'text-[#A1A1AA] hover:text-[#F4F4F6]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={onOpenReserve}
        className="px-4 py-2 rounded-full bg-[#F4F4F6] text-[#09090B] text-xs font-semibold tracking-[0.04em] hover:bg-[#D4AF37] hover:text-[#09090B] active:scale-[0.98] transition-all duration-200 whitespace-nowrap"
      >
        Reserve Roadster
      </button>
    </header>
  );
};
