import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BIKES } from '../../data/bikes';
import { Check, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface ComparisonSectionProps {
  onOpenBooking: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onOpenBooking }) => {
  const [selectedId, setSelectedId] = useState<'ex1' | 'ex2' | 'ex2s'>('ex2');

  const activeBike = BIKES.find((b) => b.id === selectedId) || BIKES[1];

  return (
    <section id="comparison" className="py-24 relative overflow-hidden bg-[#07080d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase block">
            MODEL COMPARISON MATRIX
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight uppercase">
            CHOOSE YOUR <span className="text-cyan-gradient">PERFECT AVORE</span>
          </h2>
          <p className="text-gray-400 text-sm font-sans">
            Compare key specs across the AVORE lineup to select the ideal battery capacity and performance level.
          </p>
        </div>

        {/* Model Switcher Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          {BIKES.map((bike) => (
            <button
              key={bike.id}
              onClick={() => setSelectedId(bike.id)}
              className={`px-8 py-4 rounded-xl font-heading font-extrabold text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-3 ${
                selectedId === bike.id
                  ? 'bg-[#00f0ff] text-black shadow-[0_0_30px_rgba(0,240,255,0.5)] scale-105'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              <span>{bike.name}</span>
            </button>
          ))}
        </div>

        {/* Interactive Comparison Card & Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 items-center">
          
          {/* Bike Visual Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-white/10 relative">
            <motion.img
              key={activeBike.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={activeBike.image}
              alt={activeBike.name}
              className="w-full max-h-72 object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
            />
            <div className="text-center mt-6">
              <span className="text-xs font-mono text-gray-400 block uppercase">EFFECTIVE ON ROAD PRICE</span>
              <span className="text-3xl font-heading font-extrabold text-white">{activeBike.onRoadPrice}</span>
              <span className="text-xs font-mono text-[#00ff9d] block mt-1">Includes ₹10,000 Special Discount</span>
            </div>
          </div>

          {/* Matrix Specs Comparison */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 divide-y divide-white/10 text-sm">
              <div className="py-3 flex items-center justify-between">
                <span className="font-mono text-gray-400 text-xs">BATTERY CAPACITY</span>
                <span className="font-heading font-bold text-white text-base">{activeBike.battery}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="font-mono text-gray-400 text-xs">MAX CERTIFIED RANGE</span>
                <span className="font-heading font-bold text-[#00f0ff] text-base">{activeBike.range}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="font-mono text-gray-400 text-xs">TOP SPEED</span>
                <span className="font-heading font-bold text-[#00ff9d] text-base">{activeBike.topSpeed}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="font-mono text-gray-400 text-xs">DIGITAL NFC KEY LOGIC</span>
                <span className="font-heading font-bold text-white text-base flex items-center gap-1.5 text-[#00f0ff]">
                  <Check className="w-4 h-4 text-[#00f0ff]" /> ENABLED
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="font-mono text-gray-400 text-xs">EX-SHOWROOM PRICE</span>
                <span className="font-heading font-bold text-gray-400 line-through">{activeBike.price}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="font-mono text-gray-400 text-xs">OFFER DISCOUNT</span>
                <span className="font-heading font-bold text-[#00ff9d]">{activeBike.discount}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="font-mono text-gray-400 text-xs">BATTERY WARRANTY</span>
                <span className="font-heading font-bold text-[#e2f952] text-base flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#e2f952]" /> 8 YEARS WARRANTY
                </span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-4 mt-4 rounded-sm bg-gradient-to-r from-[#00f0ff] to-[#0088ff] text-black font-heading font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)]"
            >
              <Zap className="w-4 h-4 fill-black" />
              RESERVE {activeBike.name} — ₹799
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
