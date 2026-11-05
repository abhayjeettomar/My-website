export interface ShaderSlideItem {
  id: string;
  chapter: string;
  code: string;
  headline: string;
  accentWord: string;
  caption: string;
  metric: string;
  metricLabel: string;
  imageUrl: string;
  fallbackUrl: string;
}

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
  patentRef: string;
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

export const AMBIENT_HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4';

export const ROADSTER_REAL_PHOTOS = {
  officialRearHero:
    'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Roadster-08-End-Desktop.jpg',
  officialSuspension:
    'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Roadster-03-Carousel-Slide-5-Desktop.jpg',
  exteriorProfileAnoWhite:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5741.jpg',
  nozzlesAndSuctionFans:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5667.jpg',
  rearNozzleDiffuser:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5655.jpg',
  activeAeroOpenPanels:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5695.jpg',
  coldGasCopvHardware:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5511.jpg',
  optimusThrottleValve:
    'https://hips.hearstapps.com/hmg-prod/images/5e94ff62-4ac5-462e-b395-693b11611c47.jpg',
  batteryAndTwinMotors:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5491.jpg',
  supersonicCockpit:
    'https://www.topgear.com/sites/default/files/2026/10/_B8A5856s.jpg',
  studioFallback:
    'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=85',
};

export const WEBGL_SHADER_SLIDES: ShaderSlideItem[] = [
  {
    id: 'ano-white-profile',
    chapter: '01 / 04',
    code: 'SURFACE // ANO WHITE & GOLD GLAZED',
    headline: 'Spacesuit Visor',
    accentWord: 'Optics.',
    caption:
      'Ano White aerospace protection meets copper-coated Gold Glazed glass and removable T-tops.',
    metric: 'UV + CRYO',
    metricLabel: 'AEROSPACE COATING',
    imageUrl: ROADSTER_REAL_PHOTOS.exteriorProfileAnoWhite,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
  },
  {
    id: 'active-aero-wing',
    chapter: '02 / 04',
    code: 'AERO // BILATERAL FOUR-BAR LINKAGE',
    headline: 'Concealed',
    accentWord: 'Downforce.',
    caption:
      'Swivelling front fan exhaust vents, extending wheelarch bargeboards, and an Optimus-actuated rear wing.',
    metric: '0.25s',
    metricLabel: 'WING PITCH ACTUATION',
    imageUrl: ROADSTER_REAL_PHOTOS.activeAeroOpenPanels,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
  },
  {
    id: 'suction-and-nozzles',
    chapter: '03 / 04',
    code: 'PROPULSION // SUCTION + COLD GAS',
    headline: 'Inverted Ceiling',
    accentWord: 'Adhesion.',
    caption:
      'Four supersonic nitrogen nozzles sit directly above twin underbody extraction fans that pull air from beneath the floor.',
    metric: '4.64 G',
    metricLabel: 'PEAK LAUNCH ACCELERATION',
    imageUrl: ROADSTER_REAL_PHOTOS.nozzlesAndSuctionFans,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
  },
  {
    id: 'inboard-suspension',
    chapter: '04 / 04',
    code: 'CHASSIS // INBOARD SPOOL-VALVE',
    headline: 'First-Principles',
    accentWord: 'Mass.',
    caption:
      'Pushrod rockers transfer wheel motion to transversely mounted spool-valve dampers inside a sub-1,700 kg carbon-titanium structure.',
    metric: '< 1,700',
    metricLabel: 'KG TARGET CURB MASS',
    imageUrl: ROADSTER_REAL_PHOTOS.officialSuspension,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
  },
];

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
    patentRef: 'US11962030B2 // Integrated Energy Storage',
  },
  {
    id: 'rear-diffuser-exit',
    index: '06 / 06',
    code: 'SYS // DE LAVAL NOZZLE ARRAY',
    title: 'Rear Diffuser & Four-Nozzle Cold-Gas Exit Plane',
    subtitle:
      'Produces direct reaction thrust independent of tire friction coefficient, unlocking sub-second launches on any surface.',
    metricValue: '90.9',
    metricUnit: 'KN NET LAUNCH FORCE',
    imageUrl: ROADSTER_REAL_PHOTOS.rearNozzleDiffuser,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
    patentRef: 'Direct Reaction Impulse Channel',
  },
];

export const ROADSTER_VARIANTS: RoadsterVariantCard[] = [
  {
    id: 'performance',
    index: 'VARIANT 01 // BY RESERVATION',
    tierBadge: 'ROAD READY · TWO SEATS',
    name: 'Roadster Performance',
    tagline:
      'Active aerodynamics and a multi-mode underbody fan suction system that maximizes downforce on and off the track.',
    seating: 'Two Seats (Removable T-Tops Stow in Boot)',
    zeroToSixty: '< 1.9 sec',
    topSpeed: '230+ mph',
    powerOutput: '1.0 MW (1,350 bhp)',
    propulsionSpec: 'Twin Inboard Rear Motors + Multi-Mode Suction Fan System',
    gasStorageSpec: 'Pure Electric Ground-Effect Suction',
    imageUrl: ROADSTER_REAL_PHOTOS.exteriorProfileAnoWhite,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
  },
  {
    id: 'thrust',
    index: 'VARIANT 02 // LIMITED RELEASE',
    tierBadge: 'RACE READY · TWO SEATS · AUGMENT: THRUST',
    name: 'Roadster Thrust',
    tagline:
      'Multi-mode underbody suction paired with four rear cold-gas thrusters that propel Roadster from 0–60 mph in 0.85 seconds.',
    seating: 'Two Seats + Rear 200L COPV Vessel',
    zeroToSixty: '0.85 sec',
    topSpeed: '230–300 mph Target',
    powerOutput: '1.0 MW + 4 Rear Cold-Gas Nozzles',
    propulsionSpec: 'Multi-Mode Suction System + 4 Rear Nitrogen Thrusters',
    gasStorageSpec: '200-Liter Rear COPV (~5–6s High-Thrust Burst)',
    imageUrl: ROADSTER_REAL_PHOTOS.rearNozzleDiffuser,
    fallbackUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
  },
  {
    id: 'rocket',
    index: 'VARIANT 03 // INVITE ONLY',
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
      '600-Liter Combined COPV Array (200L Rear + 400L Cabin)',
    imageUrl: ROADSTER_REAL_PHOTOS.officialRearHero,
    fallbackUrl: ROADSTER_REAL_PHOTOS.nozzlesAndSuctionFans,
    footnote:
      'Note: Air Ready Rocket configuration is not approved for public road use.',
  },
];
