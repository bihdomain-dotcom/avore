import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge, Flame, Navigation, Zap } from 'lucide-react';

export const PerformanceSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'eco' | 'city' | 'apex'>('apex');

  const modes = {
    eco: { name: 'ECO MODE', speed: '65 KM/H', range: '260 KM', torque: '45 Nm', accent: '#00ff9d' },
    city: { name: 'CITY RIDER', speed: '85 KM/H', range: '255 KM', torque: '60 Nm', accent: '#00f0ff' },
    apex: { name: 'APEX HYPER', speed: '114 KM/H', range: '160-260 KM', torque: '95 Nm', accent: '#e2f952' }
  };

  const selected = modes[activeMode];

  return (
    <section id="performance" className="py-24 relative overflow-hidden bg-[#050507]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#00f0ff] text-xs font-mono tracking-widest uppercase"
          >
            <Gauge className="w-3.5 h-3.5 text-[#00f0ff]" />
            HIGH VELOCITY PERFORMANCE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight uppercase"
          >
            UNLEASH THE <span className="text-cyan-gradient">INSTANT TORQUE</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base font-sans"
          >
            Experience lightning-fast 0-40 km/h sprint acceleration in under 3.4 seconds with zero lag. Toggle drive modes dynamically on the fly.
          </motion.p>
        </div>

        {/* Dynamic Drive Mode Selector Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          {(['eco', 'city', 'apex'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setActiveMode(m)}
              className={`px-6 py-3 rounded-full text-xs font-heading font-bold uppercase tracking-widest transition-all duration-300 ${
                activeMode === m
                  ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-105'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {modes[m].name}
            </button>
          ))}
        </div>

        {/* Speedometer Telemetry Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-8 sm:p-12 rounded-3xl border border-white/10">
          
          {/* Main Digital Speed Display */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center text-center py-6 border-b lg:border-b-0 lg:border-r border-white/10">
            <span className="text-xs font-mono text-gray-400 tracking-widest block uppercase mb-2">
              TOP SPEED TELEMETRY
            </span>
            <motion.div
              key={selected.speed}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-6xl sm:text-8xl font-heading font-extrabold text-white tracking-tighter"
              style={{ color: selected.accent }}
            >
              {selected.speed}
            </motion.div>
            <span className="text-sm font-mono text-gray-300 mt-2">PEAK VELOCITY CAPABILITY</span>
          </div>

          {/* Performance Stats Grid */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs font-mono text-gray-400 block uppercase mb-1">MAX RANGE</span>
                <span className="text-3xl font-heading font-bold text-white">{selected.range}</span>
                <span className="text-[10px] font-mono text-gray-500 block mt-1">Single Charge Efficiency</span>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs font-mono text-gray-400 block uppercase mb-1">PEAK TORQUE</span>
                <span className="text-3xl font-heading font-bold text-white">{selected.torque}</span>
                <span className="text-[10px] font-mono text-gray-500 block mt-1">Instant Throttle Response</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#00f0ff] shrink-0">
                <Flame className="w-6 h-6 text-[#00f0ff]" />
              </div>
              <div>
                <h4 className="text-sm font-heading font-bold text-white uppercase">0-40 KM/H IN 3.4 SECONDS</h4>
                <p className="text-xs text-gray-400">Class-leading acceleration tuned for Indian traffic and highway overtaking.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
