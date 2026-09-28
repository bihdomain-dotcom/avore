import React from 'react';
import { motion } from 'framer-motion';
import { BOOKING_INFO } from '../../data/bikes';
import { ShieldCheck, CheckCircle2, Zap, Lock, ArrowRight } from 'lucide-react';

interface BookingDocumentsProps {
  onOpenBooking: () => void;
}

export const BookingDocumentsSection: React.FC<BookingDocumentsProps> = ({ onOpenBooking }) => {
  return (
    <section id="documents" className="py-24 relative overflow-hidden bg-[#070910]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Announcement Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel-glow p-8 sm:p-12 rounded-3xl border border-[#00f0ff]/30 text-center relative overflow-hidden mb-16 shadow-[0_0_50px_rgba(0,240,255,0.15)]"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00ff9d]/30 bg-[#00ff9d]/10 text-[#00ff9d] text-xs font-mono tracking-widest uppercase mb-4">
            <CheckCircle2 className="w-4 h-4 text-[#00ff9d]" />
            OFFICIAL PRIORITY RESERVATIONS OPEN
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight uppercase mb-3">
            CONGRATULATIONS
          </h2>
          <p className="text-xl sm:text-2xl font-heading font-bold text-[#00f0ff] uppercase tracking-wider mb-6">
            AVORE ELECTRIC BIKE MODELS RESERVATION
          </p>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Take the first step toward high-performance electric mobility. Reserve your priority queue delivery slot today with a token deposit of just ₹799/-.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              data-cursor="BOOK NOW"
              className="w-full sm:w-auto px-10 py-4 rounded-sm bg-gradient-to-r from-[#00f0ff] via-[#00c8ff] to-[#0088ff] text-black font-heading font-extrabold text-sm uppercase tracking-widest shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:shadow-[0_0_50px_rgba(0,240,255,0.9)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Zap className="w-5 h-5 fill-black" />
              <span>BOOK YOUR AVORE — ₹799</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Required Documents Checklist Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase block">
              REQUIRED VERIFICATION DOCUMENTS
            </span>
            <h3 className="text-3xl font-heading font-extrabold text-white uppercase">
              WHAT YOU NEED TO PRE-BOOK
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Keep these documents ready for instant digital verification upon booking your AVORE motorcycle:
            </p>

            <div className="space-y-4">
              {BOOKING_INFO.documents.map((doc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel p-4 rounded-xl border border-white/10 flex items-center gap-4 hover:border-white/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff] font-heading font-bold text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-white uppercase">{doc.title}</h4>
                    <p className="text-xs text-gray-400">{doc.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Security Guarantee Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md p-8 glass-panel rounded-3xl border border-white/15 text-center space-y-6 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-[#00ff9d]/10 border border-[#00ff9d]/30 flex items-center justify-center mx-auto text-[#00ff9d]">
                <Lock className="w-8 h-8" />
              </div>

              <h4 className="text-2xl font-heading font-extrabold text-white uppercase">
                100% SECURE & REFUNDABLE
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Your ₹799 deposit is held in encrypted escrow and is 100% fully refundable anytime before dispatch. Instant SMS and email confirmation will be sent to your registered contact.
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] font-mono text-gray-400 uppercase">
                <ShieldCheck className="w-4 h-4 text-[#00ff9d]" />
                OFFICIAL AUTHORIZED AVORE EV PORTAL
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-4 rounded-sm bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
              >
                GO TO OFFICIAL BOOKING PORTAL <ArrowRight className="w-4 h-4 text-[#00f0ff]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
