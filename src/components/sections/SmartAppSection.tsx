import React from 'react';
import { motion } from 'framer-motion';
import { APP_FEATURES } from '../../data/bikes';
import { Key, ShieldAlert, Wifi, Cpu, Smartphone, CheckCircle2, Zap } from 'lucide-react';

export const SmartAppSection: React.FC = () => {
  return (
    <section id="technology" className="py-24 relative overflow-hidden bg-[#050507]">
      <div className="w-full max-w-[1920px] px-6 sm:px-12 lg:px-20 mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff] text-xs font-mono tracking-widest uppercase"
          >
            <Smartphone className="w-4 h-4 text-[#00f0ff]" />
            SMART CONNECTED ECOSYSTEM
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight uppercase"
          >
            CONTROL EVERYTHING <br />
            <span className="text-cyan-gradient">FROM YOUR SMARTPHONE</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base font-sans"
          >
            The AVORE smartphone companion app turns your device into a keyless digital starter, live telemetry HUD, and anti-theft command center.
          </motion.p>
        </div>

        {/* 4 Connected Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-[#00f0ff]/40 transition-colors group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center mb-6 text-[#00f0ff] group-hover:scale-110 transition-transform">
              <Key className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">Cryptographic Key</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Touchless proximity key unlock. Tap phone to handlebar or share timed guest keys securely via encrypted cloud token.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-[#00ff9d]/40 transition-colors group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#00ff9d]/10 border border-[#00ff9d]/30 flex items-center justify-center mb-6 text-[#00ff9d] group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">GPS Anti-Theft</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              24/7 live satellite tracking with geofence breach notifications and instant motor power cut switch from mobile console.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-[#e2f952]/40 transition-colors group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#e2f952]/10 border border-[#e2f952]/30 flex items-center justify-center mb-6 text-[#e2f952] group-hover:scale-110 transition-transform">
              <Wifi className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">Wireless OTA</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Over-the-air software updates add new acceleration maps, efficiency modes, and dashboard theme styles automatically.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-[#00f0ff]/40 transition-colors group"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center mb-6 text-[#00f0ff] group-hover:scale-110 transition-transform">
              <Cpu className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">AI Diagnostics</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Predictive cell health analytics, real-time thermal monitoring, and turn-by-turn navigation with station stop recommendations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
