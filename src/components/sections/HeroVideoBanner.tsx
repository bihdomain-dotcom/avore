import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Maximize2, ShieldCheck, Zap, X, Gauge, Sparkles } from 'lucide-react';

export const HeroVideoBanner: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [telemetrySpeed, setTelemetrySpeed] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Speed telemetry counter effect
  useEffect(() => {
    let speed = 0;
    const interval = setInterval(() => {
      speed = (speed + 7) % 115;
      setTelemetrySpeed(speed);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <div className="w-full relative min-h-[75vh] sm:min-h-[85vh] overflow-hidden bg-black flex items-center justify-center border-y border-white/10 my-16 shadow-2xl">
        {/* Full-width Video Backdrop with Dynamic Visual Layers */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* HTML5 Video Stream with Poster Fallback */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster="/assets/avore_cinematic_hero_video.jpg"
            className="w-full h-full object-cover filter brightness-70 contrast-125 pointer-events-none scale-105"
          >
            <source src="https://cdn.coverr.co/videos/coverr-electric-motorcycle-night-ride-4392/1080p.mp4" type="video/mp4" />
          </video>

          {/* High quality overlay image fallback when video loads */}
          <img
            src="/assets/avore_cinematic_hero_video.jpg"
            alt="AVORE Electric Motorcycle Night Ride"
            className="absolute inset-0 w-full h-full object-cover filter brightness-65 contrast-125 opacity-30 mix-blend-overlay pointer-events-none"
          />

          {/* Cinematic Lighting Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/90 via-transparent to-[#050507]/90 pointer-events-none" />
          <div className="absolute inset-0 hud-scanlines opacity-20 pointer-events-none" />
        </div>

        {/* HUD Overlay Elements - Top Right Telemetry */}
        <div className="absolute top-8 right-8 z-10 hidden md:flex items-center gap-4 p-4 glass-panel rounded-2xl border border-white/10 text-xs font-mono text-gray-300">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-[#00f0ff] animate-pulse" />
            <span>LIVE TELEMETRY:</span>
            <span className="font-bold text-white text-sm font-heading">{telemetrySpeed} KM/H</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-ping" />
            <span className="text-[#00ff9d]">100% ELECTRIC</span>
          </div>
        </div>

        {/* Full-width Overlay Content */}
        <div className="relative z-10 w-full max-w-[1920px] px-6 sm:px-12 lg:px-20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-10 my-auto">
          <div className="max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#00f0ff]/40 bg-[#00f0ff]/15 text-[#00f0ff] text-xs font-mono tracking-widest uppercase"
            >
              <Zap className="w-4 h-4 fill-[#00f0ff]" />
              <span>AVORE OFFICIAL BRAND FILM • FULL SCREEN EXPERIENCE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-7xl font-heading font-extrabold text-white tracking-tight uppercase leading-[0.98]"
            >
              SILENT THRILL. <br />
              <span className="text-cyan-gradient">UNMATCHED POWER.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-base sm:text-xl font-sans max-w-2xl leading-relaxed"
            >
              Engineered with 110 Nm hyper-torque, 260 KM extended endurance range, and instantaneous throttle velocity response.
            </motion.p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-4 rounded-sm bg-gradient-to-r from-[#00f0ff] to-[#0088ff] text-black font-heading font-extrabold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:shadow-[0_0_50px_rgba(0,240,255,0.9)] hover:scale-105 transition-all flex items-center gap-3"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>PLAY FULL CINEMATIC FILM</span>
              </button>
            </div>
          </div>

          {/* Video Control Player Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-5 rounded-3xl border border-white/20 backdrop-blur-xl flex items-center gap-5 shadow-2xl"
          >
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-2xl bg-[#00f0ff] text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              title={isPlaying ? 'Pause Video' : 'Play Video'}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black" />}
            </button>

            <button
              onClick={toggleMute}
              className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-6 h-6 text-gray-400" /> : <Volume2 className="w-6 h-6 text-[#00ff9d]" />}
            </button>

            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              title="Full Screen Cinema Mode"
            >
              <Maximize2 className="w-6 h-6 text-[#00f0ff]" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Full-Screen Cinema Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/70 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <video
                autoPlay
                controls
                className="w-full h-full object-cover"
                poster="/assets/avore_cinematic_hero_video.jpg"
              >
                <source src="https://cdn.coverr.co/videos/coverr-electric-motorcycle-night-ride-4392/1080p.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
