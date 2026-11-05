export interface WorldChapter {
  id: string;
  scrollWeight: number; // viewport heights of scroll dedicated to this chapter
  linger: number; // 0..0.6: holds camera steady while reading copy, accelerates at seam
  photoUrl: string;
  secondaryPhotoUrl: string;
  eyebrow?: string; // Rationed per taste-skill: max 1 eyebrow per 3 sections!
  headline: string;
  highlightPhrase: string;
  body: string;
  telemetry: {
    label: string;
    value: string;
    unit: string;
  }[];
  camera: {
    startZoom: number;
    endZoom: number;
    panX: number; // normalized -0.08 to 0.08
    panY: number;
    airflowStrength: number; // 0..1 streamlines intensity
    transitionMode:
      | 'iris-aperture'
      | 'wind-stream'
      | 'visor-refraction'
      | 'jet-plume'
      | 'canopy-dive';
  };
  alignment: 'bottom-left' | 'center-left' | 'center-right';
}

export const ROADSTER_PHOTOS = {
  heroStudioFront:
    'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Roadster-08-End-Desktop.jpg',
  supersonicCockpit:
    'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Roadster-03-Carousel-Slide-5-Desktop.jpg',
  trackCorneringFront:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5741.jpg',
  frontSplitterAero:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5667.jpg',
  goldVisorBargeboards:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5655.jpg',
  activeRearWingDiffuser:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5695.jpg',
  sideProfileProportion:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5511.jpg',
  aerialTopDown:
    'https://hips.hearstapps.com/hmg-prod/images/5e94ff62-4ac5-462e-b395-693b11611c47.jpg',
  rearThreeQuarterTail:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5491.jpg',
  rearThrusterExhaust:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5856s.jpg',
} as const;

export const MOTIONSITES_ATMOSPHERE_VIDEOS = {
  goldDustTelemetry:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260721_194026_53c6f9fd-f0d7-4d7d-be62-cdd53b253fb3.mp4',
  coldGasPlumeStream:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4',
} as const;

export const WORLD_CHAPTERS: WorldChapter[] = [
  {
    id: 'unveiling',
    scrollWeight: 1.5,
    linger: 0.48,
    photoUrl: ROADSTER_PHOTOS.heroStudioFront,
    secondaryPhotoUrl: ROADSTER_PHOTOS.trackCorneringFront,
    eyebrow: 'OCTOBER 2026 PRODUCTION ARCHITECTURE',
    headline: 'Physics bent beyond gravity.',
    highlightPhrase: 'beyond gravity.',
    body: 'Finished in cryogenic Ano White with Gold Glazed copper-infused visor glass, twin underbody extraction fans, and ten SpaceX cold-gas thrusters.',
    telemetry: [
      { label: '0-60 MPH (ROCKET)', value: '0.59', unit: 's' },
      { label: 'TOP SPEED', value: '250+', unit: 'mph' },
      { label: 'PEAK SUCTION', value: '3.0', unit: 'G' },
    ],
    camera: {
      startZoom: 1.0,
      endZoom: 1.18,
      panX: 0.0,
      panY: -0.02,
      airflowStrength: 0.15,
      transitionMode: 'iris-aperture',
    },
    alignment: 'bottom-left',
  },
  {
    id: 'vacuum-adhesion',
    scrollWeight: 1.4,
    linger: 0.44,
    photoUrl: ROADSTER_PHOTOS.trackCorneringFront,
    secondaryPhotoUrl: ROADSTER_PHOTOS.frontSplitterAero,
    headline: 'Twin fans pull the chassis into the asphalt.',
    highlightPhrase: 'into the asphalt.',
    body: 'Twin underbody extraction fans and articulated side skirts evacuate sub-chassis air on demand, generating full aerodynamic suction at zero miles per hour.',
    telemetry: [
      { label: 'EXTRACTION FANS', value: '2', unit: 'impellers' },
      { label: 'STATIC ADHESION', value: '1.1', unit: 'G at 0 mph' },
      { label: 'HOOD EXHAUST', value: 'Swivel', unit: 'active vane' },
    ],
    camera: {
      startZoom: 1.04,
      endZoom: 1.22,
      panX: -0.04,
      panY: 0.02,
      airflowStrength: 0.85,
      transitionMode: 'wind-stream',
    },
    alignment: 'center-left',
  },
  {
    id: 'hidden-aero',
    scrollWeight: 1.4,
    linger: 0.44,
    photoUrl: ROADSTER_PHOTOS.goldVisorBargeboards,
    secondaryPhotoUrl: ROADSTER_PHOTOS.activeRearWingDiffuser,
    headline: 'Gold Glazed canopy meets Optimus robotics.',
    highlightPhrase: 'Optimus robotics.',
    body: 'Copper spacesuit-visor glazing blocks 99.4% of solar infrared load while bilateral four-bar rear wing linkages articulate via high-torque Optimus ankle actuators.',
    telemetry: [
      { label: 'IR REJECTION', value: '99.4', unit: '%' },
      { label: 'WING ACTUATION', value: '4-Bar', unit: 'Optimus drive' },
      { label: 'FRONT BARGEBOARDS', value: 'Active', unit: 'wheelarch vanes' },
    ],
    camera: {
      startZoom: 1.02,
      endZoom: 1.19,
      panX: 0.04,
      panY: -0.01,
      airflowStrength: 0.95,
      transitionMode: 'visor-refraction',
    },
    alignment: 'center-right',
  },
  {
    id: 'cold-gas-propulsion',
    scrollWeight: 1.5,
    linger: 0.46,
    photoUrl: ROADSTER_PHOTOS.rearThrusterExhaust,
    secondaryPhotoUrl: ROADSTER_PHOTOS.sideProfileProportion,
    eyebrow: 'SPACEX COPV COLD-GAS THRUSTER ARRAY',
    headline: 'Ten supersonic nozzles. 0.59 seconds to sixty.',
    highlightPhrase: '0.59 seconds to sixty.',
    body: 'Carbon-overwrapped pressure vessels store ultra-compressed nitrogen at 600 liters, firing through four rear nozzles, four vertical lift nozzles, and two front yaw thrusters.',
    telemetry: [
      { label: 'TOTAL COPV VOLUME', value: '600', unit: 'liters' },
      { label: 'NOZZLE VECTORING', value: '10', unit: 'channels' },
      { label: 'REAR AXLE OUTPUT', value: '1.0', unit: 'MW (1,350 bhp)' },
    ],
    camera: {
      startZoom: 1.05,
      endZoom: 1.24,
      panX: -0.03,
      panY: 0.01,
      airflowStrength: 1.0,
      transitionMode: 'jet-plume',
    },
    alignment: 'center-left',
  },
  {
    id: 'flight-envelope',
    scrollWeight: 1.4,
    linger: 0.44,
    photoUrl: ROADSTER_PHOTOS.aerialTopDown,
    secondaryPhotoUrl: ROADSTER_PHOTOS.rearThreeQuarterTail,
    headline: '1000V structural pack. Brief controlled flight.',
    highlightPhrase: 'controlled flight.',
    body: 'Dual-sided cooled 4680 structural cells sustain 500 kW charging and 1 MW discharge, while vertical cold-gas lift thrusters enable obstacle hops and stabilized landings.',
    telemetry: [
      { label: 'ARCHITECTURE', value: '1000', unit: 'V structural' },
      { label: 'PEAK CHARGING', value: '500', unit: 'kW Supercharge' },
      { label: 'SPOOL-VALVE SUSPENSION', value: 'Pushrod', unit: 'inboard' },
    ],
    camera: {
      startZoom: 1.0,
      endZoom: 1.2,
      panX: 0.02,
      panY: -0.03,
      airflowStrength: 0.75,
      transitionMode: 'canopy-dive',
    },
    alignment: 'center-right',
  },
  {
    id: 'supersonic-cockpit',
    scrollWeight: 1.5,
    linger: 0.5,
    photoUrl: ROADSTER_PHOTOS.supersonicCockpit,
    secondaryPhotoUrl: ROADSTER_PHOTOS.heroStudioFront,
    headline: 'Fixed carbon tub. Moving steer-by-wire yoke.',
    highlightPhrase: 'steer-by-wire yoke.',
    body: 'Seats are molded directly into the carbon-fiber monocoque tub with Ultrawhite bolsters. The motorized steer-by-wire yoke and alloy pedal box translate to fit the pilot.',
    telemetry: [
      { label: 'SEAT SHELL', value: 'Fixed', unit: 'carbon monocoque' },
      { label: 'STEERING RATIO', value: 'Variable', unit: 'steer-by-wire' },
      { label: 'SCUTTLE TELEMETRY', value: 'Full-Width', unit: 'windscreen HUD' },
    ],
    camera: {
      startZoom: 1.03,
      endZoom: 1.15,
      panX: 0.0,
      panY: 0.0,
      airflowStrength: 0.2,
      transitionMode: 'iris-aperture',
    },
    alignment: 'bottom-left',
  },
];

export interface ExplodedSubsystem {
  id: string;
  layerIndex: number;
  title: string;
  specSummary: string;
  description: string;
  photoUrl: string;
  axisOffset: {
    x: number;
    y: number;
    z: number;
    rotateX: number;
    rotateZ: number;
  };
  calloutPosition: { xPercent: number; yPercent: number };
}

export const EXPLODED_SUBSYSTEMS: ExplodedSubsystem[] = [
  {
    id: 'visor-canopy',
    layerIndex: 0,
    title: 'Gold Glazed Spacesuit-Visor Glass Canopy',
    specSummary: 'Metallic Copper Vapor Deposition · 99.4% IR Rejection',
    description:
      'Removable upper polycarbonate-glass canopy treated with atomic copper vapor deposition derived from extravehicular spacesuit visors.',
    photoUrl: ROADSTER_PHOTOS.goldVisorBargeboards,
    axisOffset: { x: -45, y: -135, z: 120, rotateX: 8, rotateZ: -3 },
    calloutPosition: { xPercent: 28, yPercent: 22 },
  },
  {
    id: 'ano-white-shell',
    layerIndex: 1,
    title: 'Ano White Carbon-Fiber Bodywork & Optimus Rear Wing',
    specSummary: 'Cryogenic UV Coating · Bilateral 4-Bar Optimus Actuators',
    description:
      'Flush aerodynamically sealed bodywork with extending front wheelarch bargeboards and a bilateral rear wing driven by Optimus humanoid ankle actuators.',
    photoUrl: ROADSTER_PHOTOS.activeRearWingDiffuser,
    axisOffset: { x: 40, y: -45, z: 45, rotateX: 4, rotateZ: 2 },
    calloutPosition: { xPercent: 72, yPercent: 34 },
  },
  {
    id: 'copv-thrusters',
    layerIndex: 2,
    title: '600L SpaceX COPV Nitrogen Tank & 10-Nozzle Thruster Array',
    specSummary: '400L Cabin Aux + 200L Rear COPV · Optimus Throttle Valve',
    description:
      'High-pressure carbon-overwrapped vessels feeding ten perimeter cold-gas nozzles for 0.59s launch thrust, 3G directional vectoring, and vertical lift.',
    photoUrl: ROADSTER_PHOTOS.rearThrusterExhaust,
    axisOffset: { x: -35, y: 50, z: -35, rotateX: -3, rotateZ: -2 },
    calloutPosition: { xPercent: 24, yPercent: 68 },
  },
  {
    id: 'structural-suction-chassis',
    layerIndex: 3,
    title: '1000V 4680 Structural Pack & Twin Underbody Suction Fans',
    specSummary: '1 MW Twin Inboard Rear Motors · Pushrod Spool-Valve Suspension',
    description:
      'Dual-sided cooled 4680 battery tub housing twin underbody extraction fans, articulated sealing skirts, and inboard rocker pushrod spool-valve dampers.',
    photoUrl: ROADSTER_PHOTOS.frontSplitterAero,
    axisOffset: { x: 45, y: 140, z: -110, rotateX: -7, rotateZ: 3 },
    calloutPosition: { xPercent: 74, yPercent: 78 },
  },
];

export interface RoadsterVariant {
  id: 'performance' | 'thrust' | 'rocket';
  name: string;
  tierBadge: string;
  zeroToSixty: string;
  seating: string;
  propulsionArchitecture: string;
  copvCapacity: string;
  nozzleCount: string;
  signatureCapability: string;
  photoUrl: string;
  depositAmount: string;
}

export const OFFICIAL_VARIANTS: RoadsterVariant[] = [
  {
    id: 'performance',
    name: 'Roadster Performance',
    tierBadge: 'By Reservation',
    zeroToSixty: '<1.9s',
    seating: '2 Seats (Full Supersonic Cabin)',
    propulsionArchitecture: '1 MW Twin Rear Motors + Twin Underbody Suction Fans',
    copvCapacity: 'None (Pure Electric Ground-Effect)',
    nozzleCount: 'Active Hood Exhaust + 4-Bar Rear Wing',
    signatureCapability:
      'Road-ready 3G peak cornering suction with zero-speed downforce.',
    photoUrl: ROADSTER_PHOTOS.sideProfileProportion,
    depositAmount: '$50,000 Wire Allocation',
  },
  {
    id: 'thrust',
    name: 'Roadster Thrust',
    tierBadge: 'Limited Release',
    zeroToSixty: '0.85s',
    seating: '2 Seats + Rear COPV Bay',
    propulsionArchitecture:
      'Suction Fans + 200L Rear SpaceX Nitrogen COPV',
    copvCapacity: '200 Liters Ultra-Compressed N2',
    nozzleCount: '4 Rear Supersonic Cold-Gas Nozzles',
    signatureCapability:
      'Sub-second 0.85s launch acceleration while retaining passenger seating.',
    photoUrl: ROADSTER_PHOTOS.rearThreeQuarterTail,
    depositAmount: '$150,000 Wire Allocation',
  },
  {
    id: 'rocket',
    name: 'Roadster Rocket',
    tierBadge: 'Invite Only',
    zeroToSixty: '0.59s',
    seating: '1 Pilot Seat + 400L Auxiliary Cabin Tank',
    propulsionArchitecture:
      'Suction Fans + 600L Dual-Tank SpaceX Cold-Gas Array',
    copvCapacity: '600 Liters Total (400L Aux + 200L Rear)',
    nozzleCount: '10 Nozzles (4 Rear, 4 Vertical Lift, 2 Front Yaw)',
    signatureCapability:
      '0.59s 0-60 mph, steep wall adhesion, obstacle hop, and controlled jet landing.',
    photoUrl: ROADSTER_PHOTOS.aerialTopDown,
    depositAmount: '$250,000 Founders Wire',
  },
];

