import React from 'react';
import { motion } from 'framer-motion';
import { MEDIA_TESTIMONIALS } from '../../data/bikes';
import { Star, Quote, Award } from 'lucide-react';

export const PressTestimonialsSection: React.FC = () => {
  return (
    <section id="media" className="py-24 relative overflow-hidden bg-[#07080d] border-t border-white/10">
      <div className="w-full max-w-[1920px] px-6 sm:px-12 lg:px-20 mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#e2f952]/30 bg-[#e2f952]/10 text-[#e2f952] text-xs font-mono tracking-widest uppercase"
          >
            <Award className="w-3.5 h-3.5 text-[#e2f952]" />
            AUTOMOTIVE PRESS ACCLAIM
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight uppercase"
          >
            WHAT THE PRESS IS <span className="text-gold-gradient">SAYING</span>
          </motion.h2>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEDIA_TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-[#00f0ff]/40 transition-colors relative"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 text-[#e2f952] mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#e2f952]" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-gray-600 mb-4" />

                <p className="text-gray-200 text-sm leading-relaxed font-sans italic mb-8">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-heading font-bold text-white uppercase">{t.author}</h4>
                  <p className="text-xs text-gray-400 font-mono">{t.role}</p>
                </div>
                <span className="text-xs font-heading font-extrabold text-[#00f0ff] uppercase tracking-wider px-3 py-1 rounded bg-white/5 border border-white/10">
                  {t.publication}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
