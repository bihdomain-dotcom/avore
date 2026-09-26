export interface BikeModel {
  id: 'ex1' | 'ex2' | 'ex2s';
  name: string;
  tagline: string;
  badge?: string;
  battery: string;
  topSpeed: string;
  range: string;
  digitalKey: boolean;
  price: string;
  discount: string;
  onRoadPrice: string;
  rawPrice: number;
  rawOnRoadPrice: number;
  image: string;
  accentColor: string;
  glowColor: string;
  features: string[];
  specs: {
    label: string;
    value: string;
    sub?: string;
  }[];
  detailedSpecs?: {
    motorPower: string;
    peakTorque: string;
    acceleration: string;
    chargingTime: string;
    weight: string;
    groundClearance: string;
    brakes: string;
    suspension: string;
    waterRating: string;
  };
}

export interface DealerCity {
  city: string;
  state: string;
  hubs: number;
  status: string;
  address: string;
  phone: string;
}

export interface AppFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  publication: string;
  rating: number;
}
