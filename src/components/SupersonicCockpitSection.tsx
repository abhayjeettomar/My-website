import React, { useState } from 'react';

export const SupersonicCockpitSection: React.FC = () => {
  const [yokeAngleDeg, setYokeAngleDeg] = useState<number>(0);
  const [trimMode, setTrimMode] = useState<'ultrawhite' | 'carbon'>('ultrawhite');

  // Steer-by-wire dynamic ratio calculation
  const wheelTurnDeg = (yokeAngleDeg * 0.42).toFixed(1);

  return (
    <section id="cockpit" className="py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300 block mb-3">
            06 // SUPERSONIC COCKPIT &amp; STEER-BY-WIRE YOKE
          </span>
          <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white">
            Ultrawhite &amp; Microsuede. <span className="gold-glazed-serif">Steer-by-Wire.</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTrimMode('ultrawhite')}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
              trimMode === 'ultrawhite'
                ? 'bg-white text-black font-semibold shadow'
                : 'liquid-glass text-white/70'
            }`}
          >
            Ultrawhite + Gray Microsuede
          </button>
          <button
            onClick={() => setTrimMode('carbon')}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
              trimMode === 'carbon'
                ? 'bg-white text-black font-semibold shadow'
                : 'liquid-glass text-white/70'
            }`}
          >
            Track Exposed Carbon
          </button>
        </div>
      </div>

      {/* Interactive Triple-Display + Steer-by-Wire Yoke Cockpit Stage */}
      <div
        className={`rounded-3xl p-6 sm:p-10 border transition-colors duration-500 ${
          trimMode === 'ultrawhite'
            ? 'bg-gradient-to-b from-slate-100/15 via-[#0E1118] to-[#050508] border-white/25 shadow-2xl'
            : 'liquid-glass border-white/15'
        }`}
      >
        {/* Top Row: Two Forward Pilot Displays + Center Touchscreen */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          {/* Left Forward Display: COPV & Suction Pressure */}
          <div className="md:col-span-3 bg-black/75 border border-white/15 rounded-2xl p-4 font-mono">
            <span className="text-[10px] text-white/45 block">LEFT FORWARD DISPLAY</span>
            <div className="text-lg text-sky-300 font-semibold mt-1">COPV: 690 BAR</div>
            <div className="text-xs text-white/65 mt-1">SUCTION SEAL: -24.8 kPa</div>
            <div className="text-[11px] text-emerald-400 mt-2">STEER-BY-WIRE: ARMED</div>
          </div>

          {/* Center Primary Telemetry Touchscreen */}
          <div className="md:col-span-6 bg-black/85 border border-amber-400/30 rounded-2xl p-5 flex items-center justify-between font-mono">
            <div>
              <span className="text-[10px] text-amber-300 block">
                CENTER SUPERSONIC TOUCHSCREEN
              </span>
              <div className="text-2xl sm:text-3xl text-white font-semibold mt-1">
                YOKE {yokeAngleDeg > 0 ? `+${yokeAngleDeg}°` : `${yokeAngleDeg}°`}
              </div>
              <div className="text-xs text-white/55 mt-1">
                FRONT AXLE VECTOR: {wheelTurnDeg}° · RATIO 5.2:1
              </div>
            </div>

            {/* Interactive SVG Steer-by-Wire Yoke */}
            <div className="w-36 h-24 flex items-center justify-center">
              <svg
                viewBox="0 0 160 100"
                style={{ transform: `rotate(${yokeAngleDeg}deg)` }}
                className="w-full h-full transition-transform duration-150"
              >
                <path
                  d="M 20,25 L 20,70 Q 20,85 40,85 L 120,85 Q 140,85 140,70 L 140,25"
                  fill="none"
                  stroke={trimMode === 'ultrawhite' ? '#F8FAFC' : '#E82127'}
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <line x1="25" y1="55" x2="135" y2="55" stroke="#94A3B8" strokeWidth="6" />
                <circle
                  cx="80"
                  cy="55"
                  r="12"
                  fill="#0F172A"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          {/* Right Forward Display: G-Meter & Track Mode */}
          <div className="md:col-span-3 bg-black/75 border border-white/15 rounded-2xl p-4 font-mono">
            <span className="text-[10px] text-white/45 block">RIGHT FORWARD DISPLAY</span>
            <div className="text-lg text-amber-300 font-semibold mt-1">200 kWh PACK</div>
            <div className="text-xs text-white/65 mt-1">BOLSTER GRIP: MICROSUEDE</div>
            <div className="text-[11px] text-white/50 mt-2">SEAT SHELL: FIXED MASS</div>
          </div>
        </div>

        {/* Interactive Yoke Steering Slider */}
        <div className="max-w-xl mx-auto text-center">
          <label className="font-mono text-xs text-white/75 block mb-2">
            TEST STEER-BY-WIRE YOKE ROTATION ({yokeAngleDeg}°)
          </label>
          <input
            type="range"
            min={-90}
            max={90}
            value={yokeAngleDeg}
            onChange={(e) => setYokeAngleDeg(Number(e.target.value))}
            className="w-full accent-[#E82127] cursor-pointer"
          />
          <p className="text-xs text-white/60 font-light mt-3">
            Our iconic Ultrawhite interior is accented with gray microsuede detailing and high-grip bolsters, while a center touchscreen flanked by two forward displays keeps critical flight and track telemetry in your line of sight.
          </p>
        </div>
      </div>
    </section>
  );
};

