import {
  RoadsterEditionSpec,
  ThrusterVectorNode,
  ExteriorColorOption,
  InteriorTrimOption,
} from '../types/roadster';

export const HERO_AMBIENT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260721_194026_53c6f9fd-f0d7-4d7d-be62-cdd53b253fb3.mp4';

export const SCROLL_AERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4';

export const SCRUB_STUDIO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';

export const ROADSTER_EDITIONS: RoadsterEditionSpec[] = [
  {
    id: 'road-ready',
    badge: 'BY RESERVATION',
    title: 'Road Ready',
    seating: 'Seating for Two (or 2+2 Configuration)',
    zeroToSixty: '1.9 sec',
    topSpeed: '> 250 mph',
    rangeMiles: '620 miles',
    wheelTorque: '10,000 Nm',
    suctionDownforce: 'Multi-Mode Ground-Sealing Fan',
    thrusterSystem: 'Tri-Motor All-Wheel Drive + Active Aero',
    description:
      'Road ready with seating for two. Features active aerodynamics and a multi-mode suction system that maximizes downforce for next-level performance on and off the track.',
    highlights: [
      'Multi-mode underbody fan & ground-sealing skirt system',
      'Active deployable rear wing with High-Downforce & Low-Drag modes',
      'Next-gen Steer-by-Wire Yoke with variable speed-sensitive ratio',
      'Gold-glazed copper-tinted removable glass canopy',
      '200 kWh structural battery pack delivering 620 miles of range',
    ],
    depositToday: 5000,
    wireTransferDue: 45000,
    basePriceLabel: '$200,000 Est. Base ($50,000 Reservation)',
    accentColor: '#E82127',
  },
  {
    id: 'race-ready',
    badge: 'LIMITED RELEASE · SPACEX PACKAGE',
    title: 'Race Ready',
    seating: 'Race Ready · Seating for Two',
    zeroToSixty: '< 1.0 sec (0.96s)',
    topSpeed: '> 250 mph',
    rangeMiles: '620 miles',
    wheelTorque: '10,000 Nm + Rocket Thrust',
    suctionDownforce: 'Stationary Ceiling-Inversion Suction (>1.8G)',
    thrusterSystem: 'Rear SpaceX Cold-Gas COPV Rocket Thrusters',
    description:
      'Limited Release. Race ready with seating for two. Features a multi-mode suction system paired with cold-gas thrusters in the rear of the vehicle that propel Roadster from 0–60 mph in under 1 second.',
    highlights: [
      '0–60 mph in under 1.0 second via rear SpaceX cold-gas thrusters',
      'Composite Overwrapped Pressure Vessel (COPV) at 10,000 psi',
      'Enough ground-sealing suction to hold the vehicle upside down when stationary',
      'Track Mode lowers ride height 28mm and transforms active suspension',
      'Magnesium, titanium & carbon fiber first-principles mass reduction',
    ],
    depositToday: 5000,
    wireTransferDue: 245000,
    basePriceLabel: '$250,000 Founders / SpaceX Allocation',
    accentColor: '#F59E0B',
  },
  {
    id: 'air-ready',
    badge: 'INVITE ONLY · EXTRA-TERRESTRIAL SPEC',
    title: 'Air Ready',
    seating: 'Air Ready · Single-Pilot Cockpit (Seating for One)',
    zeroToSixty: '< 0.9 sec + Vertical Vector',
    topSpeed: '> 250 mph + Multi-Axis Hover',
    rangeMiles: '540 miles (with Full Perimeter COPV Array)',
    wheelTorque: '10,000 Nm + 360° Cold-Gas Vectoring',
    suctionDownforce: 'Bidirectional Suction + Vertical Lift Thrusters',
    thrusterSystem:
      'Full Perimeter Cold-Gas Thrusters (Forward, Upward & Rotational)',
    description:
      'Invite Only. Air ready with seating for one. Features a multi-mode suction system paired with cold-gas thrusters positioned around the perimeter of the vehicle that support forward and upward acceleration as well as lateral rotational movement. So yes, it can fly.',
    highlights: [
      'Perimeter cold-gas thrusters supporting forward, upward & lateral rotational flight',
      'All-electric actuators complete micro-stabilization adjustments in milliseconds',
      'Fixed single-pilot carbon seat position for maximum mass control',
      'Tri-screen supersonic flight & track telemetry instrument cluster',
      'Direct SpaceX telemetry & attitude-control flight computer integration',
    ],
    depositToday: 50000,
    wireTransferDue: 450000,
    basePriceLabel: 'Invite Only Allocation ($50,000 Application Deposit)',
    accentColor: '#38BDF8',
    note: 'Note: Air Ready configuration is not approved for public road use.',
  },
];

export const PERIMETER_THRUSTER_NODES: ThrusterVectorNode[] = [
  {
    id: 'rear-main-array',
    code: 'TH-R01 // AFTERBURNER',
    name: 'Rear Twin Supersonic Cold-Gas Nozzles',
    positionLabel: 'Rear Concealed License Plate Bay',
    xPercent: 84,
    yPercent: 50,
    vectorAngleDeg: 0,
    peakThrustKn: '31.4 kN Combined',
    responseMs: '3.2 ms',
    purpose: 'Sub-1.0s 0–60 mph longitudinal launch acceleration',
    telemetryDetail:
      'Retracts rear fascia plate in 40ms; fires 690-bar compressed air through convergent-divergent De Laval nozzles.',
  },
  {
    id: 'front-retro-brake',
    code: 'TH-F02 // RETRO-BRAKE',
    name: 'Forward Deceleration Thruster Pair',
    positionLabel: 'Front Flush Splitter Channels',
    xPercent: 16,
    yPercent: 50,
    vectorAngleDeg: 180,
    peakThrustKn: '18.2 kN Retro',
    responseMs: '2.8 ms',
    purpose: 'Extreme threshold braking from >250 mph into hairpin apexes',
    telemetryDetail:
      'Works in concert with carbon-ceramic regenerative brakes and High-Downforce suction fan to halve 200–0 mph stopping distance.',
  },
  {
    id: 'lateral-port-vector',
    code: 'TH-L03 // PORT YAW',
    name: 'Left Perimeter Lateral Cornering Thrusters',
    positionLabel: 'Port Side Front & Rear Fender Vents',
    xPercent: 48,
    yPercent: 18,
    vectorAngleDeg: 90,
    peakThrustKn: '12.6 kN Lateral',
    responseMs: '1.9 ms',
    purpose: 'Counteracts centrifugal G-forces during 2.8G+ right-hand cornering',
    telemetryDetail:
      'All-electric micro-actuators modulate yaw moment 400 times per second to eliminate understeer and oversteer.',
  },
  {
    id: 'lateral-starboard-vector',
    code: 'TH-R04 // STARBOARD YAW',
    name: 'Right Perimeter Lateral Cornering Thrusters',
    positionLabel: 'Starboard Front & Rear Fender Vents',
    xPercent: 48,
    yPercent: 82,
    vectorAngleDeg: 270,
    peakThrustKn: '12.6 kN Lateral',
    responseMs: '1.9 ms',
    purpose: 'Counteracts centrifugal G-forces during 2.8G+ left-hand cornering',
    telemetryDetail:
      'Synchronized with Steer-by-Wire Yoke angle and active underbody suction skirts.',
  },
  {
    id: 'vertical-lift-array',
    code: 'TH-V05 // HOVER VECTOR',
    name: 'Underbody Vertical Lift & Attitude Stabilizers',
    positionLabel: '4-Corner Titanium Floor Bulkheads',
    xPercent: 54,
    yPercent: 50,
    vectorAngleDeg: 45,
    peakThrustKn: '42.0 kN Vertical Burst',
    responseMs: '1.4 ms',
    purpose:
      'Short-hop vertical levitation, crest stabilization & pitch control ("So yes, it can fly")',
    telemetryDetail:
      'Exclusively unlocked on the Invite-Only Air Ready single-seater; uses 6-axis IMU attitude stabilization.',
  },
];

export const EXTERIOR_COLORS: ExteriorColorOption[] = [
  {
    id: 'afterburner-red',
    name: 'Signature Multi-Coat Crimson',
    subtitle: 'Deep liquid metallic red with copper-gold spacesuit visor glass',
    primaryHex: '#E82127',
    secondaryHex: '#7F1D1D',
    glazeHex: '#D4AF37',
    priceDelta: 0,
  },
  {
    id: 'obsidian-carbon',
    name: 'Exposed Weave Obsidian Carbon',
    subtitle: 'Autoclave satin carbon fiber with anodized titanium aero blades',
    primaryHex: '#18181B',
    secondaryHex: '#09090B',
    glazeHex: '#D4AF37',
    priceDelta: 15000,
  },
  {
    id: 'starship-titanium',
    name: 'Starship Brushed Titanium',
    subtitle: 'Raw aerospace titanium sheen with gold-glazed solar canopy',
    primaryHex: '#94A3B8',
    secondaryHex: '#334155',
    glazeHex: '#F59E0B',
    priceDelta: 12000,
  },
  {
    id: 'orbital-cyan-pearl',
    name: 'Cryo-Plasma Cyan Metallic',
    subtitle: 'Iridescent deep-space blue inspired by cold-gas shock diamonds',
    primaryHex: '#0284C7',
    secondaryHex: '#0C4A6E',
    glazeHex: '#38BDF8',
    priceDelta: 10000,
  },
];

export const INTERIOR_TRIMS: InteriorTrimOption[] = [
  {
    id: 'supersonic-ultrawhite',
    name: 'Supersonic Ultrawhite & Gray Microsuede',
    subtitle:
      'Iconic Ultrawhite leather with high-grip gray microsuede bolsters & titanium accents',
    swatchHex: '#F8FAFC',
    accentHex: '#94A3B8',
    priceDelta: 0,
  },
  {
    id: 'track-carbon-alcantara',
    name: 'Orbital Matte Carbon & Jet Microsuede',
    subtitle:
      'Fixed-shell autoclave carbon buckets with crimson laser-perforated microsuede',
    swatchHex: '#1E293B',
    accentHex: '#E82127',
    priceDelta: 6500,
  },
];

