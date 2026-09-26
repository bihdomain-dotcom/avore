import React from 'react';
import { motion } from 'framer-motion';
import { BOOKING_INFO } from '../../data/bikes';
import { Zap, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';

export const MegaCTASection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050507]">
      <div className="w-full max-w-[1920px] px-6 sm:px-12 lg:px-20 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-white/20 p-8 sm:p-24 text-center flex flex-col items-center justify-center shadow-2xl group"
        >
          {/* Backdrop Image with Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/footer_top.9abb89c8.webp"
              alt="AVORE Electric Motorcycle Night Highway"
              className="w-full h-full object-cover filter brightness-50 contrast-125 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-black/70 to-[#050507]/60" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-7">
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-[#00f0ff] uppercase block">
              THE ELECTRIC REVOLUTION IS HERE
            </span>

            <h2 className="text-4xl sm:text-7xl xl:text-8xl font-heading font-extrabold text-white tracking-tight uppercase leading-none">
              READY TO GO <br />
              <span className="text-cyan-gradient">ELECTRIC?</span>
            </h2>

            <p className="text-xl sm:text-3xl font-heading font-semibold uppercase tracking-wider text-gray-200">
              YOUR NEXT RIDE STARTS HERE.
            </p>

            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-sans">
              Join thousands of forward-thinking riders across India. Secure your priority manufacturing queue slot for only ₹799/-.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
              <a
                href={BOOKING_INFO.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="BOOK NOW"
                className="w-full sm:w-auto px-12 py-5 rounded-sm bg-gradient-to-r from-[#00f0ff] via-[#00c8ff] to-[#0088ff] text-black font-heading font-extrabold text-sm uppercase tracking-widest shadow-[0_0_40px_rgba(0,240,255,0.7)] hover:shadow-[0_0_60px_rgba(0,240,255,1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <Zap className="w-5 h-5 fill-black" />
                <span>BOOK AVORE — ₹799</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-gray-400 uppercase tracking-widest">
              <span>100% REFUNDABLE DEPOSIT</span>
              <span>•</span>
              <span>8-YEAR WARRANTY</span>
              <span>•</span>
              <span>0% EMI SCHEMES</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
