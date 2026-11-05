import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { NavigationTab } from '../types/catalog';

interface SaleBannerProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const SaleBanner: React.FC<SaleBannerProps> = ({ onNavigateTab }) => {
  // Initialized to 6 hours, 30 minutes, 47 seconds = 23447 seconds
  const [secondsRemaining, setSecondsRemaining] = useState<number>(6 * 3600 + 30 * 60 + 47);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative z-50 bg-gradient-to-r from-purple-950/90 via-[#150B30] to-indigo-950/90 border-b border-white/10 px-4 py-2 text-center text-xs flex flex-wrap items-center justify-center gap-2 text-white">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
        </span>
        <span className="text-white/90">
          Founding Members Sale — <span className="line-through text-white/40">$759</span> now{' '}
          <span className="font-semibold text-purple-300">$399</span> —
        </span>
      </div>

      <div className="flex items-center gap-1.5 font-mono bg-black/40 px-2.5 py-0.5 rounded-full border border-purple-500/30 text-purple-200">
        <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
        <span>{formatTime(secondsRemaining)}</span>
      </div>

      <button
        onClick={() => onNavigateTab('unlimited')}
        className="ml-1 inline-flex items-center gap-1 text-purple-300 hover:text-white font-medium hover:underline transition-colors cursor-pointer"
      >
        Claim Lifetime Deal <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};

