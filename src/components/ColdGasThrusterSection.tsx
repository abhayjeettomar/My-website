import React, { useState } from 'react';
import { Flame, Zap } from 'lucide-react';
import { PERIMETER_THRUSTER_NODES } from '../data/roadsterSpecs';
import { ThrusterVectorNode } from '../types/roadster';
import { soundEngine } from '../utils/soundSynth';

export const ColdGasThrusterSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ThrusterVectorNode>(
    PERIMETER_THRUSTER_NODES[0]
  );
  const [firingAll, setFiringAll] = useState(false);

  const handleSelectNode = (node: ThrusterVectorNode) => {
    setSelectedNode(node);
    soundEngine.playThrusterPulse(0.55);
  };

  const triggerPerimeterTest = () => {
    setFiringAll(true);
    soundEngine.playThrusterPulse(1.2);
    setTimeout(() => setFiringAll(false), 1400);
  };

  return (
    <section id="thrusters" className="py-24 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 border-l-2 border-[#38BDF8] bg-white/10 px-3.5 py-1.5 backdrop-blur-md mb-4">
            <Flame className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-sky-200">
              03 // SPACEX COLD-GAS THRUSTER PERIMETER ARRAY
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[1.06]">
            We already put Roadster in a rocket.<br />
            Now we put a <span className="gold-glazed-serif">rocket in Roadster.</span>
          </h2>
        </div>

        <button
          onClick={triggerPerimeterTest}
          className="bg-white text-black hover:bg-sky-100 px-5 py-3 rounded-full font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-2 self-start md:self-end shadow-xl cursor-pointer"
        >
          <Zap className="w-4 h-4 text-[#E82127]" />
          Test All 10 Perimeter Nozzles
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 7 Cols: Interactive Top-Down Chassis Thruster Vector Diagram */}
        <div className="lg:col-span-7 liquid-glass rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[430px] aerospace-grid">
          <div className="flex items-center justify-between text-xs font-mono text-white/60">
            <span>COPV TANK PRESSURE: 690 BAR (10,000 PSI)</span>
            <span className="text-sky-300">ELECTRIC ACTUATOR LATENCY: &lt; 2.0 MS</span>
          </div>

          {/* Interactive SVG Top-Down Chassis & Thruster Plume Diagram */}
          <div className="relative my-auto py-8 flex items-center justify-center">
            <svg viewBox="0 0 600 280" className="w-full max-w-2xl h-auto overflow-visible">
              <defs>
                <linearGradient id="plumeCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#38BDF8" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#E82127" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Top-Down Roadster Carbon Tub & Body Outline */}
              <path
                d="M 85,95 Q 60,140 85,185 L 200,202 L 425,202 Q 515,195 525,140 Q 515,85 425,78 L 200,78 Z"
                fill="rgba(15, 23, 42, 0.78)"
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="2"
              />

              {/* Gold-Glazed Glass Canopy & Rear COPV Vessel */}
              <path
                d="M 195,96 L 345,92 L 385,140 L 345,188 L 195,184 Q 160,140 195,96 Z"
                fill="rgba(212, 175, 55, 0.22)"
                stroke="rgba(245, 158, 11, 0.65)"
                strokeWidth="1.5"
              />

              {/* COPV Composite Pressure Vessel Cylinder */}
              <rect
                x="365"
                y="112"
                width="76"
                height="56"
                rx="14"
                fill="rgba(56, 189, 248, 0.18)"
                stroke="#38BDF8"
                strokeWidth="1.5"
              />
              <text
                x="403"
                y="144"
                textAnchor="middle"
                fill="#E0F2FE"
                fontSize="10"
                fontFamily="JetBrains Mono"
              >
                COPV 690B
              </text>

              {/* Active Thruster Plume Vectors */}
              {PERIMETER_THRUSTER_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id || firingAll;
                const cx = (node.xPercent / 100) * 600;
                const cy = (node.yPercent / 100) * 280;

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer"
                    onClick={() => handleSelectNode(node)}
                  >
                    {/* Animated Cold-Gas Plume Cone when selected */}
                    {isSelected && (
                      <g
                        transform={`translate(${cx}, ${cy}) rotate(${node.vectorAngleDeg})`}
                      >
                        <polygon
                          points="0,-8 115,-26 115,26 0,8"
                          fill="url(#plumeCyan)"
                        />
                      </g>
                    )}
                    {/* Outer Pulse Ring */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 18 : 11}
                      fill={
                        isSelected ? 'rgba(56, 189, 248, 0.28)' : 'rgba(255,255,255,0.08)'
                      }
                      stroke={isSelected ? '#38BDF8' : 'rgba(255,255,255,0.35)'}
                      strokeWidth="1.5"
                    />
                    {/* Core Nozzle Node */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r="5.5"
                      fill={isSelected ? '#FFFFFF' : '#F59E0B'}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Node Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {PERIMETER_THRUSTER_NODES.map((node) => (
              <button
                key={node.id}
                onClick={() => handleSelectNode(node)}
                className={`px-3.5 py-2 rounded-full font-mono text-xs transition-all cursor-pointer ${
                  selectedNode.id === node.id
                    ? 'bg-white text-black font-semibold shadow'
                    : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                }`}
              >
                {node.code}
              </button>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Selected Nozzle Telemetry Breakdown */}
        <div className="lg:col-span-5 liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-widest">
              {selectedNode.code}
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-white mt-1">
              {selectedNode.name}
            </h3>
            <p className="text-xs font-mono text-white/50 mt-1">
              MOUNT LOCATION: {selectedNode.positionLabel}
            </p>

            <div className="grid grid-cols-2 gap-3 my-6">
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
                <span className="font-mono text-[10px] text-white/50 block">
                  PEAK COLD-GAS THRUST
                </span>
                <span className="font-mono text-xl text-white font-semibold mt-1 block">
                  {selectedNode.peakThrustKn}
                </span>
              </div>
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4">
                <span className="font-mono text-[10px] text-white/50 block">
                  ACTUATOR RESPONSE
                </span>
                <span className="font-mono text-xl text-emerald-400 font-semibold mt-1 block">
                  {selectedNode.responseMs}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-white/80 font-light leading-relaxed">
              <p>
                <strong className="text-white font-medium">Primary Mission: </strong>
                {selectedNode.purpose}
              </p>
              <p className="text-white/65 text-xs leading-relaxed">
                {selectedNode.telemetryDetail}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/55 font-mono">
            ALL-ELECTRIC ACTUATORS · MICRO-STABILIZATION IN FRACTIONS OF A SECOND
          </div>
        </div>
      </div>
    </section>
  );
};

