import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DEALER_CITIES } from '../../data/bikes';
import { MapPin, Phone, Calendar, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface DealershipSectionProps {
  onOpenBooking: () => void;
}

export const DealershipSection: React.FC<DealershipSectionProps> = ({ onOpenBooking }) => {
  const [selectedCity, setSelectedCity] = useState(DEALER_CITIES[0]);
  const [testDriveBooked, setTestDriveBooked] = useState(false);

  return (
    <section id="dealership" className="py-24 relative overflow-hidden bg-[#050507]">
      <div className="w-full max-w-[1920px] px-6 sm:px-12 lg:px-20 mx-auto relative z-10">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase block mb-2">
              PAN-INDIA EXPERIENCE NETWORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight uppercase">
              VISIT AN AVORE <span className="text-cyan-gradient">EXPERIENCE CENTER</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md font-sans">
            Schedule a complimentary door-step or showroom test ride with an official AVORE EV product specialist.
          </p>
        </div>

        {/* Interactive City Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left City Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-2">
              SELECT YOUR METRO REGION:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {DEALER_CITIES.map((c) => (
                <button
                  key={c.city}
                  onClick={() => setSelectedCity(c)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedCity.city === c.city
                      ? 'border-[#00f0ff] bg-[#00f0ff]/15 text-white shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="font-heading font-bold text-sm uppercase">{c.city}</div>
                  <div className="text-[10px] font-mono text-[#00ff9d]">{c.hubs} Experience Hubs</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Selected Hub Details & Booking Widget */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-12 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest block">
                  FLAGSHIP SHOWROOM & TEST DRIVE HUB
                </span>
                <h3 className="text-3xl font-heading font-extrabold text-white uppercase">
                  {selectedCity.city}, {selectedCity.state}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#00ff9d]/15 border border-[#00ff9d]/40 text-[#00ff9d] text-[10px] font-mono font-bold uppercase">
                {selectedCity.status}
              </span>
            </div>

            <div className="space-y-4 mb-8 text-xs font-mono text-gray-300">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                <MapPin className="w-4 h-4 text-[#00f0ff] shrink-0" />
                <span>{selectedCity.address}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                <Phone className="w-4 h-4 text-[#00ff9d] shrink-0" />
                <span>Direct Hub Helpline: {selectedCity.phone}</span>
              </div>
            </div>

            {/* Test Drive Reservation Box */}
            <div className="p-6 rounded-2xl bg-black/50 border border-white/10">
              <h4 className="text-sm font-heading font-bold text-white uppercase mb-2">
                BOOK A FREE TEST DRIVE IN {selectedCity.city.toUpperCase()}
              </h4>
              <p className="text-xs text-gray-400 mb-4">
                Experience instant 110 Nm torque and dual ABS braking firsthand.
              </p>

              {testDriveBooked ? (
                <div className="p-4 rounded-xl bg-[#00ff9d]/20 border border-[#00ff9d] text-[#00ff9d] font-mono text-xs text-center">
                  ✓ FREE TEST DRIVE REQUEST CONFIRMED FOR {selectedCity.city.toUpperCase()}! OUR HUB REPRESENTATIVE WILL CALL YOU SHORTLY.
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="px-4 py-3 rounded-sm bg-white/10 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-[#00f0ff] flex-1"
                  />
                  <button
                    onClick={() => setTestDriveBooked(true)}
                    className="px-6 py-3 rounded-sm bg-[#00f0ff] text-black font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#00c8ff] transition-colors"
                  >
                    CONFIRM FREE TEST RIDE
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
