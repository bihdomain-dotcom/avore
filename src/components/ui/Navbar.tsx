import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Zap, PhoneCall } from 'lucide-react';
import { HELPLINE_TEL, HELPLINE_NUMBER } from '../../data/bikes';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Bikes', href: '#bikes' },
    { name: 'Technology', href: '#technology' },
    { name: 'Battery', href: '#battery' },
    { name: 'Performance', href: '#performance' },
    { name: 'Comparison', href: '#comparison' },
    { name: 'Finance', href: '#finance' },
    { name: 'Dealerships', href: '#dealership' },
    { name: 'Media', href: '#media' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#050507]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1920px] px-6 sm:px-12 lg:px-20 mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            data-cursor="AVORE"
          >
            <div className="relative w-9 h-9 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 177 182" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 transition-transform duration-300 group-hover:scale-110">
                <path d="M152.036 85.129C152.188 85.3583 152.513 85.3583 152.666 85.129L175.558 50.772C175.73 50.5236 175.558 50.1797 175.233 50.1797H129.144C128.838 50.1797 128.647 50.5236 128.819 50.772L152.016 85.129H152.036Z" fill="#00f0ff"/>
                <path d="M88.5591 0.171976C88.4062 -0.0573253 88.0813 -0.0573253 87.9285 0.171976L0.0678395 130.931C-0.104137 131.179 0.0678395 131.523 0.392683 131.523H37.2338C37.3675 131.523 37.4822 131.466 37.5586 131.351L87.852 56.6565C88.0049 56.4272 88.3297 56.4272 88.4826 56.6565L138.948 131.351C139.024 131.466 139.139 131.523 139.273 131.523H176.114C176.42 131.523 176.611 131.179 176.439 130.931L88.5591 0.171976Z" fill="#ffffff"/>
                <path d="M88.4665 82.1642C88.3136 81.9349 87.9887 81.9349 87.8359 82.1642L54.7592 131.311C54.6636 131.445 54.6636 131.598 54.7592 131.731L87.7403 180.936C87.8932 181.165 88.2181 181.165 88.3709 180.936L121.429 131.731C121.505 131.598 121.505 131.426 121.429 131.311L88.4665 82.1642Z" fill="#00ff9d"/>
                <path d="M23.5306 85.129C23.6835 85.3583 24.0083 85.3583 24.1612 85.129L47.3588 50.772C47.5308 50.5236 47.3588 50.1797 47.034 50.1797H0.94441C0.638675 50.1797 0.44759 50.5236 0.619566 50.772L23.5115 85.129H23.5306Z" fill="#00f0ff"/>
              </svg>
            </div>
            <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-[0.25em] text-white">
              AVORE
            </span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden xl:flex items-center gap-7 bg-black/50 border border-white/10 rounded-full px-7 py-2.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono font-medium tracking-wider text-gray-300 hover:text-[#00f0ff] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00f0ff] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={HELPLINE_TEL}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-mono transition-colors"
              title={`Call AVORE Helpline ${HELPLINE_NUMBER}`}
              data-cursor="CALL"
            >
              <PhoneCall className="w-4 h-4 text-[#00f0ff]" />
              <span className="font-bold">{HELPLINE_NUMBER}</span>
            </a>

            <button
              onClick={onOpenBooking}
              data-cursor="BOOK NOW"
              className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-sm bg-gradient-to-r from-[#00f0ff] via-[#00c8ff] to-[#0088ff] text-black font-heading font-extrabold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] transition-all duration-300 active:scale-95"
            >
              <Zap className="w-4 h-4 fill-black text-black" />
              <span>PRE-BOOK @ ₹799</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-white hover:text-[#00f0ff] focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#050507] pt-24 px-6 pb-8 flex flex-col justify-between xl:hidden border-b border-white/10 overflow-y-auto"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-heading font-bold tracking-wider text-gray-200 hover:text-[#00f0ff] transition-colors border-b border-white/5 pb-2 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-gray-500" />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <a
                href={HELPLINE_TEL}
                className="w-full py-4 rounded-sm border border-white/20 bg-white/5 text-white font-mono font-bold text-sm tracking-widest flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-5 h-5 text-[#00f0ff]" />
                CALL: {HELPLINE_NUMBER}
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-4 rounded-sm bg-[#00f0ff] text-black font-heading font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.5)]"
              >
                <Zap className="w-5 h-5 fill-black" />
                BOOK YOUR AVORE NOW — ₹799
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
