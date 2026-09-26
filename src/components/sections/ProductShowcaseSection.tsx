import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIKES } from '../../data/bikes';
import { BikeModel } from '../../types';
import { ProductTiltCard } from './ProductTiltCard';
import { X, Zap, ShieldCheck, CheckCircle2, ArrowRight, Key, Sparkles } from 'lucide-react';

interface ProductShowcaseSectionProps {
  onOpenBooking: () => void;
}

export const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({ onOpenBooking }) => {
  const [selectedBike, setSelectedBike] = useState<BikeModel | null>(null);

  return (
    <section id="bikes" className="py-24 relative overflow-hidden bg-[#050507]">
      <div className="w-full max-w-[1920px] px-6 sm:px-12 lg:px-20 mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff] text-xs font-mono tracking-widest uppercase mb-3"
            >
              <Sparkles className="w-4 h-4" />
              THE AVORE FLEET
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-6xl font-heading font-extrabold text-white tracking-tight uppercase"
            >
              MEET THE <span className="text-cyan-gradient">AVORE RANGE</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base max-w-lg font-sans"
          >
            Engineered with three distinct power configurations for city commuters, thrill-seekers, and endurance highway riders. All equipped with 8-year battery warranty.
          </motion.p>
        </div>

        {/* 3 Bikes Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {BIKES.map((bike) => (
            <ProductTiltCard
              key={bike.id}
              bike={bike}
              onSelectBike={(b) => setSelectedBike(b)}
              onOpenBooking={onOpenBooking}
            />
          ))}
        </div>
      </div>

      {/* Modal / Detailed Drawer Inspection Pop-Up */}
      <AnimatePresence>
        {selectedBike && (
          <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBike(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-[#0c0e15] border border-white/20 rounded-3xl p-6 sm:p-12 z-10 overflow-hidden shadow-2xl my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBike(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Bike Visual Column */}
                <div className="lg:col-span-6 relative flex items-center justify-center bg-black/60 p-8 rounded-2xl border border-white/10">
                  <div
                    className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ backgroundColor: selectedBike.accentColor }}
                  />
                  <img
                    src={selectedBike.image}
                    alt={selectedBike.name}
                    className="w-full max-h-80 object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Technical Specs Column */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest block mb-1">
                      SPECIFICATION OVERVIEW
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-heading font-extrabold text-white uppercase">
                      {selectedBike.name}
                    </h3>
                    <p className="text-gray-400 text-sm font-sans">{selectedBike.tagline}</p>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase block">ON ROAD PRICE</span>
                      <span className="text-3xl font-heading font-extrabold text-white">{selectedBike.onRoadPrice}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-gray-400 line-through block">{selectedBike.price}</span>
                      <span className="text-xs font-mono font-bold text-[#00ff9d]">Instant Offer: {selectedBike.discount}</span>
                    </div>
                  </div>

                  {/* Spec List */}
                  <div className="space-y-3">
                    {selectedBike.specs.map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between py-1.5 border-b border-white/10 text-xs font-mono">
                        <span className="text-gray-400">{s.label}</span>
                        <span className="font-bold text-white text-right">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        setSelectedBike(null);
                        onOpenBooking();
                      }}
                      className="w-full py-4 rounded-sm bg-gradient-to-r from-[#00f0ff] to-[#0088ff] text-black font-heading font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                    >
                      <Zap className="w-4 h-4 fill-black" />
                      PRE-BOOK THIS MODEL — ₹799
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
