import React from 'react';
import { BOOKING_INFO, HELPLINE_NUMBER, HELPLINE_TEL } from '../../data/bikes';
import { Zap, ShieldCheck, ArrowUpRight, PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030406] text-white border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="w-full max-w-[1920px] px-6 sm:px-12 lg:px-20 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <svg width="36" height="36" viewBox="0 0 177 182" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
                <path d="M152.036 85.129C152.188 85.3583 152.513 85.3583 152.666 85.129L175.558 50.772C175.73 50.5236 175.558 50.1797 175.233 50.1797H129.144C128.838 50.1797 128.647 50.5236 128.819 50.772L152.016 85.129H152.036Z" fill="#00f0ff"/>
                <path d="M88.5591 0.171976C88.4062 -0.0573253 88.0813 -0.0573253 87.9285 0.171976L0.0678395 130.931C-0.104137 131.179 0.0678395 131.523 0.392683 131.523H37.2338C37.3675 131.523 37.4822 131.466 37.5586 131.351L87.852 56.6565C88.0049 56.4272 88.3297 56.4272 88.4826 56.6565L138.948 131.351C139.024 131.466 139.139 131.523 139.273 131.523H176.114C176.42 131.523 176.611 131.179 176.439 130.931L88.5591 0.171976Z" fill="#ffffff"/>
                <path d="M88.4665 82.1642C88.3136 81.9349 87.9887 81.9349 87.8359 82.1642L54.7592 131.311C54.6636 131.445 54.6636 131.598 54.7592 131.731L87.7403 180.936C87.8932 181.165 88.2181 181.165 88.3709 180.936L121.429 131.731C121.505 131.598 121.505 131.426 121.429 131.311L88.4665 82.1642Z" fill="#00ff9d"/>
                <path d="M23.5306 85.129C23.6835 85.3583 24.0083 85.3583 24.1612 85.129L47.3588 50.772C47.5308 50.5236 47.3588 50.1797 47.034 50.1797H0.94441C0.638675 50.1797 0.44759 50.5236 0.619566 50.772L23.5115 85.129H23.5306Z" fill="#00f0ff"/>
              </svg>
              <span className="font-heading font-extrabold text-3xl tracking-[0.25em] text-white">
                AVORE
              </span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md font-sans">
              AVORE is India's premier electric motorcycle brand offering zero-emission high performance two-wheelers built with proprietary in-house battery and telemetry tech.
            </p>
            <div className="flex flex-col gap-2 pt-1 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#00ff9d]">
                <ShieldCheck className="w-4 h-4" /> 8-YEAR BATTERY WARRANTY STANDARD
              </div>
              <a href={HELPLINE_TEL} className="flex items-center gap-2 text-[#00f0ff] hover:underline font-bold text-sm">
                <PhoneCall className="w-4 h-4" /> CALL HELPLINE: {HELPLINE_NUMBER}
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-heading font-bold uppercase tracking-widest text-[#00f0ff]">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-mono text-gray-400">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#bikes" className="hover:text-white transition-colors">Bikes Range (EX1, EX2, EX2S)</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Proprietary Technology</a></li>
              <li><a href="#battery" className="hover:text-white transition-colors">8-Year Battery Shield</a></li>
              <li><a href="#performance" className="hover:text-white transition-colors">Performance & Range</a></li>
              <li><a href="#comparison" className="hover:text-white transition-colors">Model Comparison Matrix</a></li>
              <li><a href="#finance" className="hover:text-white transition-colors">0% EMI Finance Calculator</a></li>
              <li><a href="#dealership" className="hover:text-white transition-colors">Experience Centers & Test Rides</a></li>
              <li><a href="#media" className="hover:text-white transition-colors">Press & Media Reviews</a></li>
            </ul>
          </div>

          {/* Quick Booking Info */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-heading font-bold uppercase tracking-widest text-[#00f0ff]">
              OFFICIAL HELPLINE & PORTAL
            </h4>
            <div className="p-4 rounded-xl glass-panel border border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-gray-400 uppercase block">DIRECT PHONE HELPLINE:</span>
              <a href={HELPLINE_TEL} className="text-lg font-heading font-extrabold text-[#00f0ff] hover:underline block">
                {HELPLINE_NUMBER}
              </a>
              <span className="text-[10px] font-mono text-gray-400 uppercase block pt-2">ONLINE RESERVATIONS:</span>
              <a
                href={BOOKING_INFO.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00ff9d] hover:underline"
              >
                <span>https://avoreelectric.ct.ws/</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} AVORE Electric Mobility India. All Rights Reserved. Helpline: {HELPLINE_NUMBER}</p>
          <p className="flex items-center gap-2">
            <span>BUILT FOR HIGH PERFORMANCE</span>
            <span>•</span>
            <span className="text-gray-400">ZERO CARBON FOOTPRINT</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
