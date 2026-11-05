export type AeroDriveMode =
  | 'road'
  | 'track-suction'
  | 'spacex-thruster'
  | 'air-hover';

export type RoadsterEditionId =
  | 'road-ready'
  | 'race-ready'
  | 'air-ready';

export interface RoadsterEditionSpec {
  id: RoadsterEditionId;
  badge: string;
  title: string;
  seating: string;
  zeroToSixty: string;
  topSpeed: string;
  rangeMiles: string;
  wheelTorque: string;
  suctionDownforce: string;
  thrusterSystem: string;
  description: string;
  highlights: string[];
  depositToday: number;
  wireTransferDue: number;
  basePriceLabel: string;
  accentColor: string;
  note?: string;
}

export interface ThrusterVectorNode {
  id: string;
  code: string;
  name: string;
  positionLabel: string;
  xPercent: number;
  yPercent: number;
  vectorAngleDeg: number;
  peakThrustKn: string;
  responseMs: string;
  purpose: string;
  telemetryDetail: string;
}

export interface ExteriorColorOption {
  id: string;
  name: string;
  subtitle: string;
  primaryHex: string;
  secondaryHex: string;
  glazeHex: string;
  priceDelta: number;
}

export interface InteriorTrimOption {
  id: string;
  name: string;
  subtitle: string;
  swatchHex: string;
  accentHex: string;
  priceDelta: number;
}

