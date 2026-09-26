import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIKES, BOOKING_INFO } from '../../data/bikes';
import { X, Zap, ShieldCheck, CheckCircle2, ExternalLink, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedModel, setSelectedModel] = useState<'ex1' | 'ex2' | 'ex2s'>('ex2');

  const bike = BIKES.find((b) => b.id === selectedModel) || BIKES[1];

  const handleProceedBooking = () => {
    // Launch celebratory confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#00ff9d', '#e2f952', '#ffffff'],
    });

    setTimeout(() => {
      window.open(BOOKING_INFO.url, '_blank');
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#0c0e15] border border-[#00f0ff]/40 rounded-3xl p-6 sm:p-10 z-10 shadow-[0_0_50px_rgba(0,240,255,0.2)] my-auto overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest block mb-1">
              OFFICIAL AVORE RESERVATION
            </span>
            <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-white uppercase">
              PRE-BOOK YOUR AVORE — ₹799
            </h3>
            <p className="text-xs text-gray-400 font-sans mt-1">
              Select your model and lock in your priority delivery queue slot.
            </p>
          </div>

          {/* Model Selection Tabs */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {BIKES.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedModel(b.id)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedModel === b.id
                    ? 'border-[#00f0ff] bg-[#00f0ff]/15 text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-heading font-bold uppercase">{b.name}</div>
                <div className="text-[10px] font-mono text-[#00ff9d]">{b.onRoadPrice}</div>
              </button>
            ))}
          </div>

          {/* Selected Bike Overview Box */}
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <img src={bike.image} alt={bike.name} className="w-20 h-14 object-contain" />
              <div>
                <h4 className="text-base font-heading font-bold text-white uppercase">{bike.name}</h4>
                <p className="text-xs font-mono text-gray-400">Battery: {bike.battery} | Range: {bike.range}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-gray-400 block uppercase">DEPOSIT AMOUNT</span>
              <span className="text-xl font-heading font-extrabold text-[#00f0ff]">₹799/-</span>
            </div>
          </div>

          {/* Required Documents Recap */}
          <div className="mb-6 space-y-2">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
              REQUIRED FOR VERIFICATION ON PORTAL:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-sans text-gray-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff9d]" /> 1. Aadhar Card
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff9d]" /> 2. PAN Card
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff9d]" /> 3. Passport Photo
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff9d]" /> 4. Email ID
              </div>
            </div>
          </div>

          {/* Proceed CTA Button */}
          <button
            onClick={handleProceedBooking}
            className="w-full py-4 rounded-sm bg-gradient-to-r from-[#00f0ff] via-[#00c8ff] to-[#0088ff] text-black font-heading font-extrabold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:shadow-[0_0_50px_rgba(0,240,255,0.9)] transition-all"
          >
            <Zap className="w-4 h-4 fill-black" />
            PROCEED TO PAYMENT PORTAL (₹799)
            <ExternalLink className="w-4 h-4" />
          </button>

          <p className="text-[10px] font-mono text-center text-gray-400 mt-4">
            100% Fully Refundable Deposit • Direct Link: https://avoreelectric.ct.ws/
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
