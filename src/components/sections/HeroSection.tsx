import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, ChevronDown, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  const bikeY = useTransform(scrollY, [0, 500], [0, 100]);
  const textY = useTransform(scrollY, [0, 500], [0, -60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 35;
      const y = (e.clientY / innerHeight - 0.5) * 35;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Background Hero Atmosphere */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

      {/* Main Full-Width Container */}
      <div className="w-full max-w-[1920px] px-6 sm:px-12 lg:px-20 mx-auto z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <motion.div
            style={{ y: textY, opacity }}
            className="lg:col-span-6 space-y-7 text-center lg:text-left"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#00f0ff]/40 bg-[#00f0ff]/10 text-[#00f0ff] text-xs font-mono tracking-widest uppercase"
            >
              <Zap className="w-4 h-4 animate-pulse text-[#00f0ff]" />
              <span>NEXT-GEN INDIAN HYPER EV MOTORCYCLE</span>
            </motion.div>

            {/* Giant Display Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-7xl xl:text-8xl font-extrabold tracking-tight font-heading uppercase leading-[0.98]">
                THE FUTURE <br />
                <span className="text-cyan-gradient">OF ELECTRIC</span> <br />
                MOBILITY.
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-300 text-base sm:text-xl max-w-2xl font-sans font-normal leading-relaxed"
            >
              Built for the city. Engineered for the next generation. Experience unmatched instant torque, 260 KM extended range, and 8-year battery security.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-2"
            >
              <button
                onClick={onOpenBooking}
                data-cursor="BOOK NOW"
                className="w-full sm:w-auto px-10 py-5 rounded-sm bg-gradient-to-r from-[#00f0ff] via-[#00c8ff] to-[#0088ff] text-black font-heading font-extrabold text-sm tracking-widest uppercase shadow-[0_0_40px_rgba(0,240,255,0.6)] hover:shadow-[0_0_60px_rgba(0,240,255,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Zap className="w-5 h-5 fill-black" />
                <span>PRE-BOOK @ ₹799</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#bikes"
                data-cursor="EXPLORE"
                className="w-full sm:w-auto px-10 py-5 rounded-sm border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white font-heading font-semibold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
              >
                EXPLORE RANGE
              </a>
            </motion.div>

            {/* Micro Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs font-mono text-gray-400"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00ff9d]" />
                <span>8 YR WARRANTY</span>
              </div>
              <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00f0ff]" />
                <span>DIGITAL KEY LOGIC</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Ultra-Wide 3D Interactive Hero Bike Presentation */}
          <motion.div
            style={{ y: bikeY }}
            className="lg:col-span-6 relative flex items-center justify-center mt-8 lg:mt-0"
          >
            {/* Ambient Cyan Glowing Ring behind Bike */}
            <div className="absolute w-[350px] sm:w-[580px] h-[350px] sm:h-[580px] bg-radial from-[#00f0ff]/30 via-[#00ff9d]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* Parallax Container reacting to mouse */}
            <motion.div
              animate={{
                x: mousePos.x,
                y: mousePos.y,
                rotateY: mousePos.x * 0.12,
                rotateX: -mousePos.y * 0.12,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="relative w-full max-w-3xl transform-gpu"
            >
              {/* High-res Hero Bike Image */}
              <img
                src="/assets/Home_Bike.83946231.webp"
                alt="AVORE Electric Motorcycle Launch"
                className="w-full h-auto object-contain filter drop-shadow-[0_25px_50px_rgba(0,240,255,0.3)] select-none"
              />

              {/* Floating Specification Cards */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute top-12 left-0 sm:-left-8 glass-panel px-5 py-3 rounded-xl border border-[#00f0ff]/40 shadow-2xl backdrop-blur-xl hidden sm:block"
              >
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">MAX RANGE</div>
                <div className="text-2xl font-heading font-extrabold text-[#00f0ff]">260 KM</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-16 right-0 sm:-right-6 glass-panel px-5 py-3 rounded-xl border border-[#00ff9d]/40 shadow-2xl backdrop-blur-xl hidden sm:block"
              >
                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">TOP VELOCITY</div>
                <div className="text-2xl font-heading font-extrabold text-[#00ff9d]">114 KM/H</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Telemetry Bar - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-[1920px] px-6 sm:px-12 lg:px-20 mx-auto z-10 pt-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 glass-panel rounded-2xl border border-white/10">
          <div className="border-r border-white/10 pr-6 last:border-0">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">EXTENDED RANGE</span>
            <span className="text-2xl sm:text-4xl font-heading font-extrabold text-white">UP TO 260 <span className="text-sm font-sans font-normal text-[#00f0ff]">KM</span></span>
          </div>

          <div className="border-r border-white/10 pr-6 last:border-0">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">BATTERY WARRANTY</span>
            <span className="text-2xl sm:text-4xl font-heading font-extrabold text-[#00ff9d]">8 YEARS</span>
          </div>

          <div className="border-r border-white/10 pr-6 last:border-0">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">ZERO INTEREST EMI</span>
            <span className="text-2xl sm:text-4xl font-heading font-extrabold text-[#e2f952]">0% INTEREST</span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">PRIORITY PRE-BOOK</span>
            <span className="text-2xl sm:text-4xl font-heading font-extrabold text-white">₹799 <span className="text-xs font-mono text-gray-400 font-normal">ONLY</span></span>
          </div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <a
        href="#brand-story"
        className="mx-auto mt-6 flex flex-col items-center gap-1 text-gray-400 hover:text-[#00f0ff] transition-colors"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">DISCOVER AVORE</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#00f0ff]" />
      </a>
    </section>
  );
};
