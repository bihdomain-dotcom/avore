import { BikeModel, DealerCity, AppFeature, Testimonial, FAQItem } from '../types';

export const HELPLINE_NUMBER = '+91 8282967327';
export const HELPLINE_TEL = 'tel:+918282967327';

export const BIKES: BikeModel[] = [
  {
    id: 'ex1',
    name: 'AVORE EX1',
    tagline: 'Urban Commuter & Daily Performance Pioneer',
    badge: 'ESSENTIAL URBAN',
    battery: '3.34 kWh',
    topSpeed: '85 km/h',
    range: '100 km (Up to 160 KM)',
    digitalKey: true,
    price: '₹1,34,999',
    discount: '₹10,000',
    onRoadPrice: '₹1,24,999',
    rawPrice: 134999,
    rawOnRoadPrice: 124999,
    image: '/assets/Home_Bike.83946231.webp',
    accentColor: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    features: [
      'Smart Digital NFC Key & Smartphone Sync',
      'Advanced Thermal Battery Management',
      'Regenerative Braking System (RBS)',
      'LED Matrix Headlamps & Lightbar',
      'Instant Acceleration 0-40 in 3.4s'
    ],
    specs: [
      { label: 'BATTERY CAPACITY', value: '3.34 kWh', sub: 'Lithium-Ion NMC Grade' },
      { label: 'CERTIFIED RANGE', value: '100 km / Up to 160 KM', sub: 'Ideal Conditions' },
      { label: 'TOP SPEED', value: '85 km/h', sub: 'Sport Mode' },
      { label: 'DIGITAL KEY', value: 'Enabled', sub: 'Keyless NFC Mobile Unlock' },
      { label: 'EFFECTIVE PRICE', value: '₹1,24,999', sub: 'Ex-showroom after ₹10,000 instant offer' }
    ],
    detailedSpecs: {
      motorPower: '6.0 kW Peak Output',
      peakTorque: '55 Nm Instant Torque',
      acceleration: '0 - 40 km/h in 3.8s',
      chargingTime: '0 - 80% in 60 min (Fast Charge)',
      weight: '118 kg Kerb Weight',
      groundClearance: '175 mm',
      brakes: 'Dual Disc with CBS',
      suspension: 'Telescopic Front / Rear Monoshock',
      waterRating: 'IP67 Battery & Motor'
    }
  },
  {
    id: 'ex2',
    name: 'AVORE EX2',
    tagline: 'High Velocity Performance & Long Range Dominance',
    badge: 'MOST POPULAR',
    battery: '5.0 kWh',
    topSpeed: '100 km/h',
    range: '255 KM',
    digitalKey: true,
    price: '₹1,59,999',
    discount: '₹10,000',
    onRoadPrice: '₹1,49,999',
    rawPrice: 159999,
    rawOnRoadPrice: 149999,
    image: '/assets/cdn_bike_1.webp',
    accentColor: '#00ff9d',
    glowColor: 'rgba(0, 255, 157, 0.4)',
    features: [
      '5.0 kWh High Energy Density Battery',
      'Triple Drive Modes: Eco, City, Sport & Apex',
      '7-inch Smart Touch Display Panel',
      'OTA Software Updates & Remote Telematics',
      'Rapid Charging 0-80% in 90 minutes'
    ],
    specs: [
      { label: 'BATTERY CAPACITY', value: '5.0 kWh', sub: '8-Year Warranty Rated' },
      { label: 'MAX RANGE', value: '255 KM', sub: 'Single Full Charge' },
      { label: 'TOP SPEED', value: '100 km/h', sub: 'Apex Acceleration Mode' },
      { label: 'DIGITAL KEY', value: 'Enabled', sub: 'Encrypted Cryptographic NFC' },
      { label: 'EFFECTIVE PRICE', value: '₹1,49,999', sub: 'Special introductory price' }
    ],
    detailedSpecs: {
      motorPower: '8.5 kW Peak Power',
      peakTorque: '75 Nm Instant Torque',
      acceleration: '0 - 40 km/h in 3.4s',
      chargingTime: '0 - 80% in 90 min (Hyper Charge)',
      weight: '126 kg Kerb Weight',
      groundClearance: '180 mm',
      brakes: 'Dual Channel ABS Disc Brakes',
      suspension: 'Upside-Down USD Forks / Pro Monoshock',
      waterRating: 'IP67 Submersible Sealed'
    }
  },
  {
    id: 'ex2s',
    name: 'AVORE EX2S',
    tagline: 'Ultimate Flagship Hyper-Electric Motorcycle',
    badge: 'FLAGSHIP APEX',
    battery: '10.5 kWh',
    topSpeed: '114 km/h',
    range: '260 KM',
    digitalKey: true,
    price: '₹1,79,999',
    discount: '₹10,000',
    onRoadPrice: '₹1,69,999',
    rawPrice: 179999,
    rawOnRoadPrice: 169999,
    image: '/assets/cdn_bike_2.webp',
    accentColor: '#e2f952',
    glowColor: 'rgba(226, 249, 82, 0.4)',
    features: [
      'Massive 10.5 kWh Dual Core Battery Pack',
      'Hyper-Boost Mode 114 km/h Velocity',
      'CBS Dual Channel Disc Brakes with ABS Logic',
      'AI Diagnostics & Predictive Range Engine',
      'Aerodynamic Monocoque Chassis Architecture'
    ],
    specs: [
      { label: 'BATTERY CAPACITY', value: '10.5 kWh', sub: 'Peak Endurance Cell' },
      { label: 'EXTENDED RANGE', value: '260 KM', sub: 'Highway + Urban Range' },
      { label: 'TOP SPEED', value: '114 km/h', sub: 'Hyper Track Speed' },
      { label: 'DIGITAL KEY', value: 'Enabled', sub: 'Biometric & NFC Proximity' },
      { label: 'EFFECTIVE PRICE', value: '₹1,69,999', sub: 'Flagship Price' }
    ],
    detailedSpecs: {
      motorPower: '12.5 kW Dual Core Peak',
      peakTorque: '110 Nm Hyper Torque',
      acceleration: '0 - 40 km/h in 2.9s',
      chargingTime: '0 - 80% in 120 min (Dual Fast Cell)',
      weight: '135 kg Monocoque Weight',
      groundClearance: '185 mm Track Clearance',
      brakes: 'Performance Dual Disc ABS & Dynamic RBS',
      suspension: 'Adjustable Gas-ChargedUSD Mono',
      waterRating: 'IP67 Submersible Rating'
    }
  }
];

export const DEALER_CITIES: DealerCity[] = [
  { city: 'Delhi NCR', state: 'Delhi', hubs: 12, status: 'OPEN FOR TEST RIDES', address: 'Connaught Place & Aerocity Experience Hubs', phone: '+91 8282967327' },
  { city: 'Mumbai', state: 'Maharashtra', hubs: 8, status: 'OPEN FOR TEST RIDES', address: 'BKC Bandra & Lower Parel Flagship Showrooms', phone: '+91 8282967327' },
  { city: 'Bengaluru', state: 'Karnataka', hubs: 10, status: 'OPEN FOR TEST RIDES', address: 'Indiranagar & HSR Layout Mobility Centers', phone: '+91 8282967327' },
  { city: 'Pune', state: 'Maharashtra', hubs: 6, status: 'OPEN FOR TEST RIDES', address: 'Koregaon Park Tech Drive Hub', phone: '+91 8282967327' },
  { city: 'Hyderabad', state: 'Telangana', hubs: 7, status: 'OPEN FOR TEST RIDES', address: 'Gachibowli Cyber Hub Station', phone: '+91 8282967327' },
  { city: 'Chennai', state: 'Tamil Nadu', hubs: 5, status: 'OPEN FOR TEST RIDES', address: 'Nungambakkam EV Pavilion', phone: '+91 8282967327' },
  { city: 'Ahmedabad', state: 'Gujarat', hubs: 4, status: 'OPEN FOR TEST RIDES', address: 'SG Highway Flagship Center', phone: '+91 8282967327' },
  { city: 'Jaipur', state: 'Rajasthan', hubs: 3, status: 'OPENING THIS MONTH', address: 'MI Road Experience Station', phone: '+91 8282967327' },
];

export const APP_FEATURES: AppFeature[] = [
  {
    title: 'Cryptographic NFC Key',
    description: 'Unlock and start your motorcycle with proximity phone tap or NFC smart card. Shared digital access keys for family members with timed permissions.',
    iconName: 'Key'
  },
  {
    title: 'Live GPS & Anti-Theft Geofence',
    description: 'Real-time satellite position tracking, motion alert triggers, remote motor kill switch, and automated crash notification to emergency contacts.',
    iconName: 'ShieldAlert'
  },
  {
    title: 'Over-The-Air (OTA) Performance Updates',
    description: 'Wireless firmware improvements delivered straight to your motorcycle console. Unlock new torque maps, efficiency modes, and UI dashboards over Wi-Fi/4G.',
    iconName: 'Wifi'
  },
  {
    title: 'Predictive Battery AI Diagnostics',
    description: 'Real-time cell degradation analytics, thermal monitoring, charging habit optimizations, and automated station routing based on remaining battery.',
    iconName: 'Cpu'
  }
];

export const MEDIA_TESTIMONIALS: Testimonial[] = [
  {
    quote: "AVORE is proof that Indian EV engineering can match and outperform international standards. Instant torque delivery and superb highway stability.",
    author: "Rohan Malhotra",
    role: "Senior Editor",
    publication: "AutoCar India",
    rating: 5
  },
  {
    quote: "The EX2S is an absolute hyper-electric powerhouse. 0-40 acceleration in under 3 seconds with zero noise and telepathic digital throttle response.",
    author: "Vikram Mehta",
    role: "Lead EV Specialist",
    publication: "TopGear India",
    rating: 5
  },
  {
    quote: "A turning point for Indian electric mobility. The 8-year battery warranty and zero percent EMI finance schemes make this the smartest urban buy.",
    author: "Priya Sharma",
    role: "Technology Desk",
    publication: "CNBC TV18",
    rating: 5
  }
];

export const BOOKING_INFO = {
  bookingAmount: '₹799/-',
  bookingUrl: '#booking',
  targetEmail: 'bihdatar@gmail.com',
  phone: '+91 8282967327',
  documents: [
    { title: 'Aadhar Card', desc: 'Identity verification for government registration' },
    { title: 'PAN Card', desc: 'Tax & financial identification for RTO transfer' },
    { title: 'Passport Size Photo', desc: 'Recent photograph for official RC documentation' },
    { title: 'Email ID', desc: 'For instant digital confirmation and telemetry key setup' },
    { title: 'Booking Amount', desc: '100% refundable token deposit of ₹799/-' }
  ]
};

export const FINANCE_INFO = {
  downPayment: '₹50,000/-',
  interestRate: '0% EMI',
  warranty: '8 Years Battery Warranty',
  partnerBanks: ['HDFC Bank', 'ICICI Bank', 'SBI Motor', 'IDFC First', 'Axis Bank', 'Kotak Mahindra']
};

export const FAQS: FAQItem[] = [
  {
    category: 'Booking & Delivery',
    question: 'How do I pre-book the AVORE electric motorcycle?',
    answer: 'You can reserve your AVORE bike online for just ₹799/- by clicking the "BOOK NOW" button. Provide your basic details and submit required documents (Aadhar, PAN, photo, email) to secure your priority queue position.'
  },
  {
    category: 'Battery & Warranty',
    question: 'What is the battery warranty coverage?',
    answer: 'AVORE provides an industry-leading 8-Year Battery Warranty on all models (EX1, EX2, EX2S), ensuring maximum peace of mind and long-term battery cell health retention.'
  },
  {
    category: 'Finance & EMI',
    question: 'What are the finance options available?',
    answer: 'We offer zero percent interest (0% EMI) schemes with a minimum down payment starting at ₹50,000/- through leading national bank partners.'
  },
  {
    category: 'Key & Security',
    question: 'How does the Digital Key work?',
    answer: 'Every AVORE motorcycle comes equipped with an encrypted Digital Key system. You can unlock, start, or track your vehicle using your smartphone or encrypted NFC smartcard without needing a physical key.'
  },
  {
    category: 'Charging & Infrastructure',
    question: 'How do I charge my AVORE bike at home and on the road?',
    answer: 'Every AVORE bike includes a portable 15A home socket fast charger that plugs into standard wall outlets. You also get free access to AVORE Hyper-Charge grid stations across India.'
  }
];
