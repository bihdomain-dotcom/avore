import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Battery, Zap, ShieldCheck, Flame, Cpu, RotateCcw } from 'lucide-react';

export const BatteryTechSection: React.FC = () => {
  const [chargeLevel, setChargeLevel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setChargeLevel((prev) => (prev >= 100 ? 0 : prev + 25));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="battery" className="py-24 relative overflow-hidden bg-[#070910]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Description */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ff9d]/30 bg-[#00ff9d]/10 text-[#00ff9d] text-xs font-mono tracking-widest uppercase"
            >
              <Zap className="w-3.5 h-3.5 fill-[#00ff9d]" />
              PROPRIETARY LITHIUM ARCHITECTURE
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight uppercase leading-tight"
            >
              POWER THAT <br />
              <span className="text-gold-gradient">GOES FURTHER</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-base leading-relaxed font-sans"
            >
              Engineered with custom battery management software (BMS) and intelligent thermal insulation. Built to withstand extreme temperatures, deliver instant burst acceleration, and sustain over 2,000 full charging cycles.
            </motion.p>

            {/* Warranty Badge Spotlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl glass-panel border border-[#00ff9d]/30 bg-gradient-to-r from-[#00ff9d]/10 to-transparent flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-[#00ff9d]/20 border border-[#00ff9d] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-8 h-8 text-[#00ff9d]" />
              </div>
              <div>
                <span className="text-2xl font-heading font-extrabold text-[#00ff9d]">8 YEAR WARRANTY</span>
                <p className="text-xs text-gray-300">Unconditional comprehensive cell health and capacity retention guarantee.</p>
              </div>
            </motion.div>

            {/* Quick Grid Tech Features */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-gray-300 pt-2">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/5">
                <Flame className="w-4 h-4 text-[#ff5500]" />
                <span>Liquid Thermal Sink</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/5">
                <RotateCcw className="w-4 h-4 text-[#00f0ff]" />
                <span>Smart Regenerative Braking</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Animated Battery HUD */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-md p-8 glass-panel rounded-3xl border border-white/15 relative overflow-hidden shadow-2xl flex flex-col items-center"
            >
              <div className="absolute top-4 right-4 text-[10px] font-mono text-[#00ff9d] flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#00ff9d] animate-ping" />
                BMS TELEMETRY ACTIVE
              </div>

              {/* Battery Housing */}
              <div className="relative w-48 h-80 rounded-3xl border-4 border-white/30 p-3 bg-black/60 flex flex-col justify-end my-6 shadow-[0_0_30px_rgba(0,255,157,0.2)]">
                {/* Battery Cap */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-16 h-3 bg-white/40 rounded-t-md" />

                {/* Animated Level Fluid */}
                <motion.div
                  className="w-full rounded-2xl bg-gradient-to-t from-[#00f0ff] via-[#00ff9d] to-[#e2f952] relative overflow-hidden"
                  animate={{ height: `${chargeLevel}%` }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>

                {/* Overlaid Charge % */}
                <div className="absolute inset-0 flex flex-col items-center justify-center font-heading font-extrabold text-3xl text-white drop-shadow-md">
                  <span>{chargeLevel}%</span>
                  <span className="text-[10px] font-mono font-normal tracking-widest text-[#00ff9d]">CHARGING</span>
                </div>
              </div>

              {/* 8-YEAR WARRANTY GLOW REVEAL WHEN CHARGED */}
              <motion.div
                animate={{
                  scale: chargeLevel === 100 ? 1.05 : 1,
                  opacity: chargeLevel === 100 ? 1 : 0.7,
                }}
                className="text-center font-heading font-extrabold text-2xl text-[#00ff9d] tracking-widest uppercase mt-2"
              >
                8-YEAR BATTERY GUARANTEE
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
