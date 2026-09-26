import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, BatteryCharging, Flag } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="brand-story" className="py-24 relative overflow-hidden bg-[#07080d]">
      <div className="w-full max-w-[1920px] px-6 sm:px-12 lg:px-20 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#00f0ff] text-xs font-mono tracking-widest uppercase"
          >
            <Flag className="w-4 h-4 text-[#00ff9d]" />
            BUILT & ENGINEERED IN INDIA
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-6xl font-heading font-extrabold text-white tracking-tight uppercase"
          >
            REDEFINING URBAN <br />
            <span className="text-cyan-gradient">HIGH-PERFORMANCE MOBILITY</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base sm:text-xl leading-relaxed font-sans"
          >
            AVORE was created to break the compromise between zero-emission sustainability and uncompromising speed, range, and build quality. Designed from the ground up in India with proprietary thermal management, custom chassis, and instant digital key pairing.
          </motion.p>
        </div>

        {/* 3 Tech Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-[#00f0ff]/40 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center mb-6 text-[#00f0ff] group-hover:scale-110 transition-transform">
              <BatteryCharging className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-3">8-Year Battery Shield</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Equipped with high-density NMC cells optimized for Indian weather conditions. Protected by an industry-first 8-year comprehensive battery warranty.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-[#00ff9d]/40 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#00ff9d]/10 border border-[#00ff9d]/30 flex items-center justify-center mb-6 text-[#00ff9d] group-hover:scale-110 transition-transform">
              <Cpu className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-3">Cryptographic Keyless</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              No physical keys required. Unlock, track telemetry, locate charging stations, and customize ride dynamics seamlessly from your NFC smartphone digital key.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-[#e2f952]/40 transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#e2f952]/10 border border-[#e2f952]/30 flex items-center justify-center mb-6 text-[#e2f952] group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-3">0% Interest EMI Scheme</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium electric mobility accessible to all. Experience zero percent interest EMI programs starting with down payments as low as ₹50,000/-.
            </p>
          </motion.div>
        </div>

        {/* Feature Image Banner - Ultra Wide */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[21/8] sm:aspect-[24/9] flex items-center justify-center shadow-2xl"
        >
          <img
            src="/assets/revolution.a8115761.webp"
            alt="AVORE Revolution EV Engineering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-black/40 to-transparent flex flex-col justify-end p-8 sm:p-16">
            <h4 className="text-3xl sm:text-5xl font-heading font-extrabold text-white uppercase mb-3">
              PRECISION FRAME & REVOLUTIONARY POWER
            </h4>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl">
              Engineered with lightweight high-tensile steel frame architecture, dual-channel disc brakes, and smart energy recovery logic.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
