import React from 'react';

interface NavbarMinimalProps {
  onOpenReserve: () => void;
}

export const NavbarMinimal: React.FC<NavbarMinimalProps> = ({
  onOpenReserve,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-10 py-5 pointer-events-none">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Left: Minimalist Wordmark */}
        <a
          href="#top"
          className="pointer-events-auto flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
        >
          <span className="tracking-[0.34em] text-xs font-semibold uppercase">TESLA</span>
          <span className="h-3 w-[1px] bg-white/25" />
          <span className="font-mono text-[10px] tracking-[0.22em] text-white/70 uppercase">
            ROADSTER
          </span>
        </a>

        {/* Center: Whisper-Quiet Pill Links */}
        <nav className="hidden lg:flex items-center gap-1 liquid-glass rounded-full px-2 py-1 pointer-events-auto">
          {[
            { label: 'Overview', href: '#top' },
            { label: 'Architecture', href: '#aperture-story' },
            { label: 'Hardware', href: '#hardware-track' },
            { label: 'Flight Demo', href: '#airborne-demo' },
            { label: 'Variants', href: '#editions-stack' },
            { label: 'Cockpit', href: '#cockpit' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/65 hover:text-white px-3.5 py-1.5 rounded-full transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Single High-Contrast Reserve Pill */}
        <button
          onClick={onOpenReserve}
          data-cursor-label="RESERVE"
          className="pointer-events-auto bg-[#F5F5F7] text-[#060608] hover:bg-[#D4AF37] hover:text-black font-mono text-[10px] uppercase tracking-[0.2em] font-semibold px-5 py-2.5 rounded-full transition-all duration-300"
        >
          Reserve Now
        </button>
      </div>
    </header>
  );
};

