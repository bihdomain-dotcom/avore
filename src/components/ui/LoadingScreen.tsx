import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING POWER CELL...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 12) + 3;
        if (next > 30 && next < 60) {
          setStatusText('CONNECTING TELEMETRY SYSTEMS...');
        } else if (next >= 60 && next < 85) {
          setStatusText('CALIBRATING DUAL MOTOR DRIVES...');
        } else if (next >= 85) {
          setStatusText('SYSTEM READY - ENGAGING AVORE MOBILITY');
        }
        return next > 100 ? 100 : next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-[#050507] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
        >
          {/* Subtle Grid Lines in Background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none hud-scanlines" />
          <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

          <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center">
            {/* AVORE Stylized SVG Emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mb-8"
            >
              <svg width="120" height="120" viewBox="0 0 177 182" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24">
                <path d="M152.036 85.129C152.188 85.3583 152.513 85.3583 152.666 85.129L175.558 50.772C175.73 50.5236 175.558 50.1797 175.233 50.1797H129.144C128.838 50.1797 128.647 50.5236 128.819 50.772L152.016 85.129H152.036Z" fill="#00f0ff"/>
                <path d="M88.5591 0.171976C88.4062 -0.0573253 88.0813 -0.0573253 87.9285 0.171976L0.0678395 130.931C-0.104137 131.179 0.0678395 131.523 0.392683 131.523H37.2338C37.3675 131.523 37.4822 131.466 37.5586 131.351L87.852 56.6565C88.0049 56.4272 88.3297 56.4272 88.4826 56.6565L138.948 131.351C139.024 131.466 139.139 131.523 139.273 131.523H176.114C176.42 131.523 176.611 131.179 176.439 130.931L88.5591 0.171976Z" fill="#ffffff"/>
                <path d="M88.4665 82.1642C88.3136 81.9349 87.9887 81.9349 87.8359 82.1642L54.7592 131.311C54.6636 131.445 54.6636 131.598 54.7592 131.731L87.7403 180.936C87.8932 181.165 88.2181 181.165 88.3709 180.936L121.429 131.731C121.505 131.598 121.505 131.426 121.429 131.311L88.4665 82.1642Z" fill="#00ff9d"/>
                <path d="M23.5306 85.129C23.6835 85.3583 24.0083 85.3583 24.1612 85.129L47.3588 50.772C47.5308 50.5236 47.3588 50.1797 47.034 50.1797H0.94441C0.638675 50.1797 0.44759 50.5236 0.619566 50.772L23.5115 85.129H23.5306Z" fill="#00f0ff"/>
              </svg>
              {/* Radial Cyan Glow */}
              <div className="absolute inset-0 bg-[#00f0ff]/20 blur-2xl rounded-full pointer-events-none" />
            </motion.div>

            {/* Brand Title */}
            <h1 className="text-3xl font-extrabold tracking-[0.3em] font-heading mb-1 text-white">
              AVORE
            </h1>
            <p className="text-[11px] font-mono tracking-[0.4em] text-[#00f0ff] uppercase mb-10">
              ELECTRIC MOBILITY
            </p>

            {/* Bike Silhouette Fading In */}
            <div className="relative w-full h-32 mb-8 flex items-center justify-center">
              <motion.img
                src="/assets/Home_Bike.83946231.webp"
                alt="AVORE Bike Silhouette"
                className="max-h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: progress / 100, scale: 0.9 + (progress / 1000) }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* HUD Gauge Progress Bar */}
            <div className="w-full bg-[#121622] rounded-full h-2 p-0.5 border border-white/10 mb-4 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00f0ff] via-[#00ff9d] to-[#e2f952] rounded-full relative"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_10px_#ffffff]" />
              </motion.div>
            </div>

            {/* Percentage & Telemetry Status Text */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 text-[#00f0ff]">
                <Zap className="w-3.5 h-3.5 animate-pulse text-[#00f0ff]" />
                {statusText}
              </span>
              <span className="font-bold text-white text-sm font-heading">{progress}%</span>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00ff9d]" />
            BUILT & ENGINEERED IN INDIA • ZERO EMISSIONS
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
