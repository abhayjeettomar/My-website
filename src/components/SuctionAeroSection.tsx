import React, { useState } from 'react';
import { Wind } from 'lucide-react';
import { RoadsterAeroCanvas } from './RoadsterAeroCanvas';
import { soundEngine } from '../utils/soundSynth';

interface SuctionAeroSectionProps {
  primaryColorHex: string;
}

export const SuctionAeroSection: React.FC<SuctionAeroSectionProps> = ({ primaryColorHex }) => {
  const [fanRpm, setFanRpm] = useState<number>(34000); // 0 to 42,000 RPM
  const [wingAngle, setWingAngle] = useState<number>(28); // 4° Low Drag to 38° High Downforce
  const [trackModeLowered, setTrackModeLowered] = useState<boolean>(true);
  const [invertedTunnelTest, setInvertedTunnelTest] = useState<boolean>(false);

  const rpmRatio = fanRpm / 42000;
  // Stationary suction downforce in kgf (vehicle mass ~1,850 kg; >1,850 kgf holds car upside down at 0 mph)
  const sealMultiplier = trackModeLowered ? 1.28 : 0.92;
  const stationarySuctionKgf = Math.round(rpmRatio * 2150 * sealMultiplier);
  const totalDownforceAt150Mph = Math.round(stationarySuctionKgf + wingAngle * 24);
  const vacuumKpa = (rpmRatio * -28.4 * sealMultiplier).toFixed(1);
  const canHoldUpsideDown = stationarySuctionKgf >= 1850;

  return (
    <section id="suction-aero" className="py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto relative">
      {/* Top Editorial Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 border-l-2 border-amber-400 bg-white/10 px-3.5 py-1.5 backdrop-blur-md mb-4">
            <Wind className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-200">
              02 // MULTI-MODE FAN &amp; GROUND SEALING SYSTEM
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[1.06]">
            Enough suction to hold Roadster{' '}
            <span className="gold-glazed-serif">upside down</span>—even when stationary.
          </h2>
        </div>

        <div className="lg:col-span-5">
          <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed">
            Our multi-mode fan and ground-sealing skirt system pulls air out from beneath the chassis, generating massive downforce at zero speed. Activate Track Mode to lower the suspension 28mm and switch between High-Downforce cornering and Low-Drag top-speed modes.
          </p>
        </div>
      </div>

      {/* Main Split Wind-Tunnel Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 7 Cols: Live Wind-Tunnel Stage (Flips 180° when Inverted Ceiling Test is active!) */}
        <div className="lg:col-span-7 liquid-glass rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[420px]">
          <div className="flex flex-wrap items-center justify-between gap-2 z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                UNDERBODY PRESSURE: {vacuumKpa} kPa
              </span>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border ${
                  canHoldUpsideDown
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                    : 'bg-red-500/20 text-red-300 border-red-400/30'
                }`}
              >
                {canHoldUpsideDown
                  ? '✓ CEILING ADHESION LOCKED (>1.0G @ 0 MPH)'
                  : '⚠ INCREASE FAN RPM FOR INVERSION'}
              </span>
            </div>

            <button
              onClick={() => {
                setInvertedTunnelTest((v) => !v);
                soundEngine.playUiTick();
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                invertedTunnelTest
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
              }`}
            >
              {invertedTunnelTest ? 'Inverted Ceiling View: ON ↺' : 'Test Upside-Down Ceiling Hold ↺'}
            </button>
          </div>

          {/* Interactive Canvas Container (rotates 180deg in inverted ceiling test) */}
          <div
            className={`my-auto h-64 sm:h-72 transition-transform duration-700 ${
              invertedTunnelTest ? 'rotate-180' : ''
            }`}
          >
            <RoadsterAeroCanvas
              driveMode="track-suction"
              primaryColorHex={primaryColorHex}
              suctionRpmRatio={rpmRatio}
              wingAngleDeg={wingAngle}
            />
          </div>

          {/* Bottom Telemetry Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 z-10">
            <div>
              <span className="font-mono text-[10px] text-white/50 block">
                0 MPH SUCTION DOWNFORCE
              </span>
              <span className="font-mono text-xl sm:text-2xl text-white font-semibold">
                {stationarySuctionKgf.toLocaleString()}{' '}
                <span className="text-xs text-amber-300">kgf</span>
              </span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-white/50 block">
                150 MPH TOTAL DOWNFORCE
              </span>
              <span className="font-mono text-xl sm:text-2xl text-white font-semibold">
                {totalDownforceAt150Mph.toLocaleString()}{' '}
                <span className="text-xs text-amber-300">kgf</span>
              </span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-white/50 block">
                STATIC INVERSION G-LOAD
              </span>
              <span className="font-mono text-xl sm:text-2xl text-emerald-400 font-semibold">
                {(stationarySuctionKgf / 1850).toFixed(2)}G
              </span>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Interactive Aero & Suction Controls */}
        <div className="lg:col-span-5 gold-glazed-glass rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-amber-300">
              ACTIVE DOWNFORCE TELEMETRY CONTROLS
            </span>
            <h3 className="text-2xl font-light text-white mt-1">
              Configure Ground-Sealing &amp; Active Aero
            </h3>

            <div className="space-y-5 mt-6">
              {/* Control 1: Suction Fan RPM */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/75">Underbody Twin Suction Fan RPM</span>
                  <span className="font-mono text-amber-300">
                    {fanRpm.toLocaleString()} RPM
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={42000}
                  step={500}
                  value={fanRpm}
                  onChange={(e) => setFanRpm(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                  <span>0 RPM (Passive)</span>
                  <span>30,000 RPM (1.0G Inversion)</span>
                  <span>42,000 RPM (Max Seal)</span>
                </div>
              </div>

              {/* Control 2: Active Rear Wing Pitch */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/75">Active Rear Wing Pitch Angle</span>
                  <span className="font-mono text-amber-300">
                    {wingAngle}° ({wingAngle < 12 ? 'Low-Drag Vmax' : 'High-Downforce Apex'})
                  </span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={38}
                  step={1}
                  value={wingAngle}
                  onChange={(e) => setWingAngle(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Control 3: Track Mode Ride Height & Skirt Seal */}
              <div className="pt-2">
                <span className="text-xs text-white/75 block mb-2">
                  Track Mode Active Suspension &amp; Ground Skirts
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setTrackModeLowered(true);
                      soundEngine.playUiTick();
                    }}
                    className={`py-2.5 px-3 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                      trackModeLowered
                        ? 'bg-white text-black font-semibold'
                        : 'bg-white/5 text-white/65 border border-white/10'
                    }`}
                  >
                    Track Mode (-28mm Seal)
                  </button>
                  <button
                    onClick={() => {
                      setTrackModeLowered(false);
                      soundEngine.playUiTick();
                    }}
                    className={`py-2.5 px-3 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                      !trackModeLowered
                        ? 'bg-white text-black font-semibold'
                        : 'bg-white/5 text-white/65 border border-white/10'
                    }`}
                  >
                    Standard Road Height
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs text-white/75 leading-relaxed">
            <strong className="text-white font-medium block mb-1">
              Hidden Aero Architecture:
            </strong>
            Hidden headlights, a full-length rear laser taillight, and flush-mounted actuators conceal the vehicle&apos;s true aerodynamic force until deployed.
          </div>
        </div>
      </div>
    </section>
  );
};

