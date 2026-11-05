import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-5 sm:px-8 md:px-12 border-t border-white/10 text-xs text-white/50 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          TESLA ROADSTER // BEYOND THE LIMITS OF PHYSICS · SPACEX COLD-GAS THRUSTER PACKAGE
        </div>
        <div className="flex items-center gap-6">
          <a href="#hero" className="hover:text-white transition-colors">
            Top ↑
          </a>
          <a href="#suction-aero" className="hover:text-white transition-colors">
            Suction Aero
          </a>
          <a href="#thrusters" className="hover:text-white transition-colors">
            Thrusters
          </a>
          <a href="#editions" className="hover:text-white transition-colors">
            Editions
          </a>
          <a href="#configurator" className="hover:text-white transition-colors">
            Configure
          </a>
        </div>
      </div>
    </footer>
  );
};
