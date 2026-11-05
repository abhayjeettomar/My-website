import React, { useState, useEffect } from 'react';
import { Flame, RotateCcw, Gauge } from 'lucide-react';
import { AeroDriveMode } from '../types/roadster';
import { soundEngine } from '../utils/soundSynth';

interface LaunchTelemetrySimProps {
  activeMode: AeroDriveMode;
  onSelectMode: (mode: AeroDriveMode) => void;
  onLaunchStateChange: (launching: boolean) => void;
}

export const LaunchTelemetrySim: React.FC<LaunchTelemetrySimProps> = ({
  activeMode,
  onSelectMode,
  onLaunchStateChange,
}) => {
  const [launching, setLaunching] = useState(false);
  const [speedMph, setSpeedMph] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [peakGForce, setPeakGForce] = useState(1.0);
  const [sixtyLockedAt, setSixtyLockedAt] = useState<number | null>(null);

  useEffect(() => {
    if (!launching) return;
    const start = performance.now();
    const targetSixtyTime = activeMode === 'road' ? 1.9 : 0.96;

    const interval = setInterval(() => {
      const dt = (performance.now() - start) / 1000;
      setElapsedSec(dt);

      // Compute acceleration curve
      const currentSpeed = Math.min(
        254,
        Math.round(
          (dt / targetSixtyTime) * 60 * (dt < targetSixtyTime ? 1 : 0.68 + dt * 0.12)
        )
      );
      setSpeedMph(currentSpeed);
      setPeakGForce(activeMode === 'road' ? 1.48 : 2.74);

      if (currentSpeed >= 60 && sixtyLockedAt === null) {
        setSixtyLockedAt(targetSixtyTime);
      }

      if (dt >= 4.2) {
        setLaunching(false);
        onLaunchStateChange(false);
        clearInterval(interval);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [launching, activeMode, sixtyLockedAt, onLaunchStateChange]);

  const triggerLaunch = () => {
    setSixtyLockedAt(null);
    setSpeedMph(0);
    setElapsedSec(0);
    if (activeMode === 'road') {
      onSelectMode('spacex-thruster');
    }
    setLaunching(true);
    onLaunchStateChange(true);
    soundEngine.playThrusterPulse(1.4);
  };

  const resetTelemetry = () => {
    setLaunching(false);
    onLaunchStateChange(false);
    setSpeedMph(0);
    setElapsedSec(0);
    setPeakGForce(1.0);
    setSixtyLockedAt(null);
  };

  return (
    <div className="gold-glazed-glass rounded-3xl p-5 sm:p-6 max-w-md w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300 flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-[#E82127]" />
          LIVE COPV THRUSTER TELEMETRY
        </span>
        <button
          onClick={resetTelemetry}
          className="text-[11px] font-mono text-white/50 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Live Numeric Readouts */}
      <div className="grid grid-cols-3 gap-3 mb-4 bg-black/55 rounded-2xl p-3.5 border border-white/10">
        <div>
          <span className="font-mono text-[10px] text-white/50 block">VELOCITY</span>
          <span className="font-mono text-2xl sm:text-3xl font-semibold text-white">
            {speedMph}
          </span>
          <span className="font-mono text-[10px] text-amber-300 ml-1">MPH</span>
        </div>
        <div>
          <span className="font-mono text-[10px] text-white/50 block">0–60 MPH</span>
          <span className="font-mono text-2xl sm:text-3xl font-semibold text-emerald-400">
            {sixtyLockedAt ? `${sixtyLockedAt.toFixed(2)}s` : `${elapsedSec.toFixed(2)}s`}
          </span>
        </div>
        <div>
          <span className="font-mono text-[10px] text-white/50 block">PEAK G</span>
          <span className="font-mono text-2xl sm:text-3xl font-semibold text-[#E82127]">
            {peakGForce.toFixed(2)}G
          </span>
        </div>
      </div>

      {/* Mode Switcher Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-4">
        {(
          [
            { id: 'road', label: 'Road (1.9s)' },
            { id: 'track-suction', label: 'Suction Fan' },
            { id: 'spacex-thruster', label: 'SpaceX (<1s)' },
            { id: 'air-hover', label: 'Air Hover' },
          ] as { id: AeroDriveMode; label: string }[]
        ).map((m) => (
          <button
            key={m.id}
            onClick={() => {
              onSelectMode(m.id);
              soundEngine.playUiTick();
            }}
            className={`py-1.5 px-2 rounded-xl font-mono text-[10px] uppercase transition-all cursor-pointer ${
              activeMode === m.id
                ? 'bg-white text-black font-semibold shadow'
                : 'bg-white/5 text-white/65 hover:text-white border border-white/10'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Launch Trigger Button */}
      <button
        onClick={triggerLaunch}
        disabled={launching}
        className={`w-full py-3.5 px-5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer ${
          launching
            ? 'bg-[#E82127] text-white animate-pulse'
            : 'bg-gradient-to-r from-[#E82127] via-amber-500 to-[#E82127] text-white hover:brightness-110 active:scale-[0.99]'
        }`}
      >
        <Flame className="w-4 h-4" />
        {launching
          ? 'COLD-GAS THRUSTERS FIRING — 690 BAR COPV'
          : 'IGNITE SPACEX COLD-GAS LAUNCH (< 1.0 SEC)'}
      </button>
    </div>
  );
};

