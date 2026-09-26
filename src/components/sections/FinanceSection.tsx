import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FINANCE_INFO } from '../../data/bikes';
import { Wallet, Percent, ShieldCheck, Landmark, ArrowRight, Zap, Calculator } from 'lucide-react';

interface FinanceSectionProps {
  onOpenBooking: () => void;
}

export const FinanceSection: React.FC<FinanceSectionProps> = ({ onOpenBooking }) => {
  const [tenureMonths, setTenureMonths] = useState(24);
  const [downPayment, setDownPayment] = useState(50000);

  // Simple zero interest estimate calculation
  const totalLoanAmount = 149999 - downPayment;
  const monthlyEmi = Math.max(0, Math.round(totalLoanAmount / tenureMonths));

  return (
    <section id="finance" className="py-24 relative overflow-hidden bg-[#050507]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#e2f952]/30 bg-[#e2f952]/10 text-[#e2f952] text-xs font-mono tracking-widest uppercase"
          >
            <Wallet className="w-3.5 h-3.5 text-[#e2f952]" />
            FINANCE & ACCESSIBILITY
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight uppercase"
          >
            YOUR AVORE. <span className="text-gold-gradient">YOUR WAY.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base font-sans"
          >
            Zero percent interest schemes, minimal down payment, and instant paperless bank approvals.
          </motion.p>
        </div>

        {/* 3 Main Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-8 rounded-2xl border border-white/10 text-center flex flex-col items-center hover:border-[#00f0ff]/40 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center mb-6 text-[#00f0ff]">
              <Wallet className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">DOWN PAYMENT STARTS AT</span>
            <span className="text-4xl font-heading font-extrabold text-white">{FINANCE_INFO.downPayment}</span>
            <span className="text-xs font-sans text-gray-400 mt-2">Low initial cash outlay for instant ownership</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 rounded-2xl border border-[#00ff9d]/30 bg-gradient-to-b from-[#00ff9d]/5 to-transparent text-center flex flex-col items-center shadow-lg"
          >
            <div className="w-14 h-14 rounded-full bg-[#00ff9d]/10 border border-[#00ff9d]/30 flex items-center justify-center mb-6 text-[#00ff9d]">
              <Percent className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">INTEREST RATE OFFER</span>
            <span className="text-4xl font-heading font-extrabold text-[#00ff9d]">{FINANCE_INFO.interestRate}</span>
            <span className="text-xs font-sans text-gray-300 mt-2">Zero percent interest EMI schemes from partner banks</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-8 rounded-2xl border border-white/10 text-center flex flex-col items-center hover:border-[#e2f952]/40 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-[#e2f952]/10 border border-[#e2f952]/30 flex items-center justify-center mb-6 text-[#e2f952]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">COMPREHENSIVE COVERAGE</span>
            <span className="text-4xl font-heading font-extrabold text-[#e2f952]">{FINANCE_INFO.warranty}</span>
            <span className="text-xs font-sans text-gray-400 mt-2">Maximum peace of mind for 8 full years</span>
          </motion.div>
        </div>

        {/* Interactive EMI Estimator Widget */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00f0ff] uppercase">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE EMI CALCULATOR (ESTIMATE FOR EX2)</span>
              </div>

              {/* Slider 1: Down Payment */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-gray-400">DOWN PAYMENT AMOUNT</span>
                  <span className="font-bold text-white">₹{downPayment.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={30000}
                  max={100000}
                  step={5000}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-[#00f0ff] bg-white/10 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Tenure */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-gray-400">TENURE DURATION</span>
                  <span className="font-bold text-[#00ff9d]">{tenureMonths} MONTHS</span>
                </div>
                <div className="flex gap-3">
                  {[12, 18, 24, 36].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTenureMonths(m)}
                      className={`flex-1 py-2 rounded-lg font-heading text-xs font-bold transition-colors ${
                        tenureMonths === m
                          ? 'bg-[#00ff9d] text-black'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {m} M
                    </button>
                  ))}
                </div>
              </div>

              {/* Partner Banks Logos */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono text-gray-500 uppercase block mb-2">
                  NATIONAL BANKING PARTNERS
                </span>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-gray-400">
                  {FINANCE_INFO.partnerBanks.map((bank, idx) => (
                    <span key={idx} className="px-3 py-1 rounded bg-white/5 border border-white/5">
                      {bank}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Result Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-black/50 rounded-2xl border border-white/10 text-center">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-2">
                ESTIMATED MONTHLY EMI (0% INTEREST)
              </span>
              <span className="text-4xl sm:text-5xl font-heading font-extrabold text-[#00f0ff] mb-2">
                ₹{monthlyEmi.toLocaleString()} <span className="text-xs font-mono text-gray-400 font-normal">/ month</span>
              </span>
              <p className="text-xs font-sans text-gray-400 mb-6">
                Based on Ex-showroom effective price of ₹1,49,999 with 0% interest offer.
              </p>

              <button
                onClick={onOpenBooking}
                className="w-full py-4 rounded-sm bg-gradient-to-r from-[#00f0ff] to-[#0088ff] text-black font-heading font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)]"
              >
                <Zap className="w-4 h-4 fill-black" />
                PRE-BOOK NOW — ₹799
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
