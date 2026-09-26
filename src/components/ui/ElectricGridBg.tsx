import React from 'react';

export const ElectricGridBg: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      {/* Radial Backlight Orbs */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#00f0ff]/15 via-[#00ff9d]/5 to-transparent rounded-full blur-[140px]" />
      <div className="absolute top-[40%] -left-[200px] w-[500px] h-[500px] bg-[#00f0ff]/10 rounded-full blur-[120px]" />
      <div className="absolute top-[70%] -right-[200px] w-[500px] h-[500px] bg-[#e2f952]/10 rounded-full blur-[120px]" />

      {/* Grid Mesh */}
      <div 
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );
};
