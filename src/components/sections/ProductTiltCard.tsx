import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BikeModel } from '../../types';
import { Zap, Key, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface ProductTiltCardProps {
  bike: BikeModel;
  onSelectBike: (bike: BikeModel) => void;
  onOpenBooking: () => void;
}

export const ProductTiltCard: React.FC<ProductTiltCardProps> = ({ bike, onSelectBike, onOpenBooking }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;

    const centerX = box.width / 2;
    const centerY = box.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="relative rounded-2xl p-6 sm:p-8 transition-transform duration-200 ease-out glass-panel border border-white/10 hover:border-white/30 flex flex-col justify-between group overflow-hidden"
    >
      {/* Dynamic Color Accent Backlight */}
      <div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: bike.accentColor }}
      />

      <div>
        {/* Badge & Model Title */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-md uppercase"
            style={{
              backgroundColor: `${bike.accentColor}20`,
              color: bike.accentColor,
              border: `1px solid ${bike.accentColor}50`
            }}
          >
            {bike.badge}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono text-gray-400">
            <Key className="w-3.5 h-3.5 text-[#00f0ff]" /> DIGITAL KEY
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight uppercase mb-1">
          {bike.name}
        </h3>
        <p className="text-gray-400 text-xs font-sans mb-6 line-clamp-1">{bike.tagline}</p>

        {/* High-res Bike Image Showcase */}
        <div 
          onClick={() => onSelectBike(bike)}
          className="relative w-full h-56 my-4 flex items-center justify-center cursor-pointer overflow-hidden rounded-xl bg-black/30 border border-white/5 group-hover:border-white/20 transition-all duration-300"
          data-cursor="VIEW"
        >
          <img
            src={bike.image}
            alt={bike.name}
            className="max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
            <span className="text-xs font-heading font-bold text-[#00f0ff] uppercase tracking-wider flex items-center gap-1">
              CLICK FOR FULL SPECS <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/10 my-4 text-center">
          <div>
            <span className="text-[9px] font-mono text-gray-400 block uppercase">BATTERY</span>
            <span className="text-sm font-heading font-bold text-white">{bike.battery}</span>
          </div>
          <div>
            <span className="text-[9px] font-mono text-gray-400 block uppercase">RANGE</span>
            <span className="text-sm font-heading font-bold text-[#00f0ff]">{bike.range.split(' ')[0]} {bike.range.split(' ')[1]}</span>
          </div>
          <div>
            <span className="text-[9px] font-mono text-gray-400 block uppercase">TOP SPEED</span>
            <span className="text-sm font-heading font-bold text-[#00ff9d]">{bike.topSpeed}</span>
          </div>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="pt-2">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono text-gray-400 block uppercase">ON ROAD PRICE</span>
            <span className="text-2xl font-heading font-extrabold text-white">{bike.onRoadPrice}</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-gray-500 line-through block">{bike.price}</span>
            <span className="text-xs font-mono font-semibold text-[#00ff9d] flex items-center gap-1">
              <Tag className="w-3 h-3" /> SAVE {bike.discount}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onSelectBike(bike)}
            data-cursor="SPECS"
            className="py-3 rounded-sm border border-white/20 bg-white/5 hover:bg-white/10 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors"
          >
            SPECS & DETAILS
          </button>
          <button
            onClick={onOpenBooking}
            data-cursor="BOOK NOW"
            className="py-3 rounded-sm bg-gradient-to-r from-[#00f0ff] to-[#0088ff] text-black font-heading font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all flex items-center justify-center gap-1"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            BOOK @ ₹799
          </button>
        </div>
      </div>
    </motion.div>
  );
};
