export interface HardwarePlateItem {
  id: string;
  index: string;
  code: string;
  title: string;
  subtitle: string;
  metricValue: string;
  metricUnit: string;
  imageUrl: string;
  fallbackUrl: string;
  caption: string;
  patentRef?: string;
}

export interface RoadsterVariantCard {
  id: 'performance' | 'thrust' | 'rocket';
  index: string;
  tierBadge: string;
  name: string;
  tagline: string;
  seating: string;
  zeroToSixty: string;
  topSpeed: string;
  powerOutput: string;
  propulsionSpec: string;
  gasStorageSpec: string;
  imageUrl: string;
  fallbackUrl: string;
  footnote?: string;
}

// Verified CloudFront High-Bitrate Motion Video Layers (from MotionSites Media Shelf)
export const SCROLL_VIDEO_PRIMARY =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4';

export const SCROLL_VIDEO_AMBIENT =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260721_194026_53c6f9fd-f0d7-4d7d-be62-cdd53b253fb3.mp4';

// Verified Real 2026 Tesla Roadster Photographs
export const ROADSTER_REAL_PHOTOS = {
  // 1. Official Tesla 2026 Roadster Rear/3-Quarter Studio Shot (tesla.com/roadster)
  officialRearHero:
    'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Roadster-08-End-Desktop.jpg',
  // 2. Official Tesla 2026 Roadster Suspension & Pushrod Rocker Close-Up (tesla.com/roadster)
  officialSuspension:
    'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Roadster-03-Carousel-Slide-5-Desktop.jpg',
  // 3. Top Gear 2026 Roadster Full Exterior Profile in Ano White & Gold-Glazed Glass (Greg Pajo / Top Gear)
  exteriorProfileAnoWhite:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5741.jpg',
  // 4. Top Gear Close-Up: 4 Cold-Gas Propulsion Nozzles Above Twin Suction Fans
  nozzlesAndSuctionFans:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5667.jpg',
  // 5. Top Gear Rear Diffuser & Cold-Gas Nozzle Exit Structure
  rearNozzleDiffuser:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5655.jpg',
  // 6. Top Gear Movable Active Aero Panels, Bargeboards & Four-Bar Rear Wing Deployed
  activeAeroOpenPanels:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5695.jpg',
  // 7. Top Gear Exposed Cold-Gas COPV Pressure Vessels, Valves & Equal-Length Piping
  coldGasCopvHardware:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5511.jpg',
  // 8. MotorTrend Close-Up: Physical THROTTLE VALVE & OPTIMUS ACTUATOR Assembly
  optimusThrottleValve:
    'https://hips.hearstapps.com/hmg-prod/images/5e94ff62-4ac5-462e-b395-693b11611c47.jpg',
  // 9. Top Gear 800-1000V Structural Battery Pack & Twin Rear-Axle Motors on Display
  batteryAndTwinMotors:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5491.jpg',
  // 10. Top Gear Supersonic Cockpit: Steer-by-Wire Yoke, Center Screen & Windscreen Strip
  supersonicCockpit:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5856s.jpg',
  // High-availability automotive studio fallback
  studioFallback:
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=85',
};

export const HORIZONTAL_HARDWARE_PLATES: HardwarePlateItem[] = [
  {
    id: 'nozzles-and-fans',
    index: '01 / 06',
    code: 'SYS // PROPULSION + SUCTION',
    title: 'Cold-Gas Nozzles Above Twin Suction Fans',
    subtitle:
      'Four rear supersonic nitrogen nozzles mounted directly above dual underbody ground-effect extraction fans.',
    metricValue: '0.59',
    metricUnit: 'SEC 0–60 MPH',
    imageUrl: ROADSTER_REAL_PHOTOS.nozzlesAndSuctionFans,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
    caption:
      'Physical hardware display: Rear cold-gas nozzles (top) and underbody suction fan outlets (bottom).',
    patentRef: 'US12746987B1 // Electric Fan Car',
  },
  {
    id: 'copv-vessels',
    index: '02 / 06',
    code: 'SYS // COMPOSITE PRESSURE VESSELS',
    title: '600L Nitrogen COPV Storage & Equal-Length Manifold',
    subtitle:
      '200L rear composite-overwrapped pressure vessel plus an optional 400L cockpit tank in the single-seat Rocket variant.',
    metricValue: '600',
    metricUnit: 'LITERS N₂ VOLUME',
    imageUrl: ROADSTER_REAL_PHOTOS.coldGasCopvHardware,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialSuspension,
    caption:
      'Exhibited cold-gas propulsion assembly: composite vessels, high-pressure regulators, and equal-length nozzle piping.',
    patentRef: 'NASA COPV Damage-Tolerance Standard',
  },
  {
    id: 'optimus-valve',
    index: '03 / 06',
    code: 'SYS // ALL-ELECTRIC ACTUATION',
    title: 'Optimus Actuator & High-Flow Throttle Valve',
    subtitle:
      'All-electric actuators derived from Tesla Optimus robotics regulate cold-gas discharge in milliseconds for yaw and pitch stabilization.',
    metricValue: '< 2.0',
    metricUnit: 'MS VALVE RESPONSE',
    imageUrl: ROADSTER_REAL_PHOTOS.optimusThrottleValve,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
    caption:
      'Close-up of the exhibited THROTTLE VALVE and OPTIMUS ACTUATOR assembly controlling individual nozzle thrust.',
    patentRef: 'US20260285418A1 // Active Actuator Linkage',
  },
  {
    id: 'active-aero-wing',
    index: '04 / 06',
    code: 'SYS // BILATERAL FOUR-BAR AERO',
    title: 'Two-Degree-of-Motion Active Wing & Bargeboards',
    subtitle:
      'Four-bar linkages deploy the rear wing into clean air while independent angle actuators switch between Low-Drag, High-Downforce, and Airbrake modes.',
    metricValue: '0.25',
    metricUnit: 'SEC ANGLE PITCH',
    imageUrl: ROADSTER_REAL_PHOTOS.activeAeroOpenPanels,
    fallbackUrl: ROADSTER_REAL_PHOTOS.exteriorProfileAnoWhite,
    caption:
      'Movable body panels in open state: swivelling front fan exhaust hood vent, wheelarch bargeboards, and raised rear wing.',
    patentRef: 'US12377920B1 // Adaptive Vehicle Aerodynamics',
  },
  {
    id: 'battery-twin-motors',
    index: '05 / 06',
    code: 'SYS // 1000V POWERTRAIN',
    title: '1 MW Twin Rear Axle & Dual-Sided Cooled 4680 Pack',
    subtitle:
      'Two inboard rear motors with independent inverters, cobalt-steel laminations, and a titanium-covered structural battery pack capable of 500 kW charging.',
    metricValue: '1,350',
    metricUnit: 'BHP (1.0 MW)',
    imageUrl: ROADSTER_REAL_PHOTOS.batteryAndTwinMotors,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialSuspension,
    caption:
      'Exhibited high-voltage structural battery pack and dual rear electric drive units with independent torque vectoring.',
    patentRef: 'US11962030B2 // Integrated Energy Storage',
  },
  {
    id: 'spool-valve-suspension',
    index: '06 / 06',
    code: 'SYS // INBOARD CHASSIS DYNAMICS',
    title: 'Inboard Rocker Pushrods & Spool-Valve Dampers',
    subtitle:
      'Front double wishbones and inboard rockers transmit wheel loads to transversely mounted spool-valve adaptive dampers with active ride-height drop.',
    metricValue: '< 1,700',
    metricUnit: 'KG TARGET MASS',
    imageUrl: ROADSTER_REAL_PHOTOS.officialSuspension,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
    caption:
      'Official Tesla close-up of the inboard transversely mounted damper and spring assembly.',
    patentRef: 'Track Mode Active Suspension',
  },
];

export const ROADSTER_VARIANTS: RoadsterVariantCard[] = [
  {
    id: 'performance',
    index: 'EDITION 01 // BY RESERVATION',
    tierBadge: 'ROAD READY · TWO SEATS',
    name: 'Roadster Performance',
    tagline:
      'Active aerodynamics and a multi-mode underbody fan suction system that maximizes downforce on and off the track.',
    seating: 'Two Seats (Removable T-Tops Stow in Boot)',
    zeroToSixty: '< 1.9 sec',
    topSpeed: '230+ mph',
    powerOutput: '1.0 MW (1,350 bhp)',
    propulsionSpec: 'Twin Inboard Rear Motors + Multi-Mode Suction Fan System',
    gasStorageSpec: 'Pure Electric Ground-Effect Suction (No Gas Tank Required)',
    imageUrl: ROADSTER_REAL_PHOTOS.exteriorProfileAnoWhite,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
  },
  {
    id: 'thrust',
    index: 'EDITION 02 // LIMITED RELEASE',
    tierBadge: 'RACE READY · TWO SEATS · AUGMENT: THRUST',
    name: 'Roadster Thrust',
    tagline:
      'Multi-mode underbody suction paired with four rear cold-gas thrusters that propel Roadster from 0–60 mph in under one second.',
    seating: 'Two Seats + Rear 200L COPV Vessel',
    zeroToSixty: '0.85 sec',
    topSpeed: '230–300 mph Target',
    powerOutput: '1.0 MW + 4 Rear Cold-Gas Nozzles',
    propulsionSpec: 'Multi-Mode Suction System + 4 Rear Nitrogen Thrusters',
    gasStorageSpec:
      '200-Liter Rear Composite Overwrapped Pressure Vessel (~5–6s Burst)',
    imageUrl: ROADSTER_REAL_PHOTOS.rearNozzleDiffuser,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
  },
  {
    id: 'rocket',
    index: 'EDITION 03 // INVITE ONLY',
    tierBadge: 'AIR READY · SINGLE PILOT · AUGMENT: ROCKET',
    name: 'Roadster Rocket',
    tagline:
      'Perimeter cold-gas thrusters support forward and upward acceleration as well as lateral rotational movement. So yes, it can fly.',
    seating: 'One Seat (400L Auxiliary Tank Replaces Passenger Seat)',
    zeroToSixty: '0.59 sec',
    topSpeed: '300+ mph Target + Airborne Roll/Hover',
    powerOutput: '1.0 MW + 10 Perimeter Cold-Gas Nozzles',
    propulsionSpec:
      '4 Rear + 4 Vertical Lift + 2 Front Yaw Cold-Gas Nozzles',
    gasStorageSpec:
      '600-Liter Combined COPV Nitrogen Array (200L Rear + 400L Cabin)',
    imageUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
    fallbackUrl: ROADSTER_REAL_PHOTOS.nozzlesAndSuctionFans,
    footnote:
      'Note: Air Ready Rocket configuration is not approved for public road use.',
  },
];

export const LIVE_DEMO_SEQUENCE = [
  {
    step: '01 / 04',
    timestamp: 'LIVE DEMO // 00:19.80',
    title: 'Steep Wall Surface Adhesion',
    body: 'Deployable underbody skirts and rear extraction fans pull air from beneath the floor, generating enough normal load to hold Roadster along a steeply inclined curved wall.',
    image: ROADSTER_REAL_PHOTOS.exteriorProfileAnoWhite,
  },
  {
    step: '02 / 04',
    timestamp: 'LIVE DEMO // 00:30.20',
    title: 'Clearing Semi-Truck Obstacles',
    body: 'Four downward-facing perimeter cold-gas nozzles fire a high-impulse vertical burst, lifting the 2-ton chassis clear above full-size vehicles.',
    image: ROADSTER_REAL_PHOTOS.activeAeroOpenPanels,
  },
  {
    step: '03 / 04',
    timestamp: 'LIVE DEMO // 00:36.50',
    title: 'Airborne 360° Barrel Roll & Attitude Control',
    body: 'Once tires leave the ground, Optimus-actuated valves modulate differential nozzle thrust in milliseconds—executing a controlled aerial kick-flip roll.',
    image: ROADSTER_REAL_PHOTOS.nozzlesAndSuctionFans,
  },
  {
    step: '04 / 04',
    timestamp: 'LIVE DEMO // 00:39.60',
    title: 'Upright Descent & Spool-Valve Touchdown',
    body: 'Ventral cold-gas jets arrest descent rate and level the chassis wheels-down before inboard spool-valve dampers absorb the landing load.',
    image: ROADSTER_REAL_PHOTOS.officialRearHero,
  },
];

