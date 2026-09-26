import React from 'react';
import { motion } from 'framer-motion';
import { BIKES } from '../../data/bikes';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

export const DetailedSpecsTableSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#07080d] border-t border-white/10">
      <div className="w-full max-w-[1920px] px-6 sm:px-12 lg:px-20 mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#00ff9d] uppercase block">
            TECHNICAL ENGINEERING MANIFEST
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight uppercase">
            FULL SPECIFICATIONS <span className="text-cyan-gradient">SHEET</span>
          </h2>
          <p className="text-gray-400 text-sm font-sans">
            Comprehensive side-by-side engineering comparison across all three AVORE motorcycle variants.
          </p>
        </div>

        {/* Full-width Responsive Table */}
        <div className="glass-panel rounded-3xl border border-white/15 overflow-x-auto shadow-2xl">
          <table className="w-full text-left text-sm border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/15 bg-white/5 font-heading text-xs uppercase tracking-wider">
                <th className="p-6 text-gray-400 font-mono">SPECIFICATION ATTR</th>
                {BIKES.map((bike) => (
                  <th key={bike.id} className="p-6 text-white text-base font-extrabold">
                    <span className="block text-[#00f0ff]">{bike.name}</span>
                    <span className="text-xs font-mono text-gray-400 font-normal">{bike.battery} Pack</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-xs font-mono">
              <tr>
                <td className="p-6 text-gray-400 font-bold">PEAK MOTOR POWER</td>
                <td className="p-6 text-white font-bold">{BIKES[0].detailedSpecs?.motorPower}</td>
                <td className="p-6 text-[#00ff9d] font-bold">{BIKES[1].detailedSpecs?.motorPower}</td>
                <td className="p-6 text-[#e2f952] font-bold">{BIKES[2].detailedSpecs?.motorPower}</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-400 font-bold">INSTANT WHEEL TORQUE</td>
                <td className="p-6 text-white">{BIKES[0].detailedSpecs?.peakTorque}</td>
                <td className="p-6 text-white">{BIKES[1].detailedSpecs?.peakTorque}</td>
                <td className="p-6 text-white">{BIKES[2].detailedSpecs?.peakTorque}</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-400 font-bold">MAX VELOCITY (TOP SPEED)</td>
                <td className="p-6 text-white">{BIKES[0].topSpeed}</td>
                <td className="p-6 text-[#00ff9d] font-bold">{BIKES[1].topSpeed}</td>
                <td className="p-6 text-[#e2f952] font-bold">{BIKES[2].topSpeed}</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-400 font-bold">CERTIFIED MAX RANGE</td>
                <td className="p-6 text-white">{BIKES[0].range}</td>
                <td className="p-6 text-white">{BIKES[1].range}</td>
                <td className="p-6 text-[#00f0ff] font-bold">{BIKES[2].range}</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-400 font-bold">0 - 40 KM/H SPRINT</td>
                <td className="p-6 text-white">{BIKES[0].detailedSpecs?.acceleration}</td>
                <td className="p-6 text-white">{BIKES[1].detailedSpecs?.acceleration}</td>
                <td className="p-6 text-[#00ff9d] font-bold">{BIKES[2].detailedSpecs?.acceleration}</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-400 font-bold">HYPER CHARGE DURATION (0-80%)</td>
                <td className="p-6 text-white">{BIKES[0].detailedSpecs?.chargingTime}</td>
                <td className="p-6 text-white">{BIKES[1].detailedSpecs?.chargingTime}</td>
                <td className="p-6 text-white">{BIKES[2].detailedSpecs?.chargingTime}</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-400 font-bold">BRAKING ARCHITECTURE</td>
                <td className="p-6 text-white">{BIKES[0].detailedSpecs?.brakes}</td>
                <td className="p-6 text-white">{BIKES[1].detailedSpecs?.brakes}</td>
                <td className="p-6 text-white">{BIKES[2].detailedSpecs?.brakes}</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-400 font-bold">GROUND CLEARANCE / WEIGHT</td>
                <td className="p-6 text-white">{BIKES[0].detailedSpecs?.groundClearance} / {BIKES[0].detailedSpecs?.weight}</td>
                <td className="p-6 text-white">{BIKES[1].detailedSpecs?.groundClearance} / {BIKES[1].detailedSpecs?.weight}</td>
                <td className="p-6 text-white">{BIKES[2].detailedSpecs?.groundClearance} / {BIKES[2].detailedSpecs?.weight}</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-400 font-bold">WATER & DUST INGRESS RATING</td>
                <td className="p-6 text-[#00ff9d]">{BIKES[0].detailedSpecs?.waterRating}</td>
                <td className="p-6 text-[#00ff9d]">{BIKES[1].detailedSpecs?.waterRating}</td>
                <td className="p-6 text-[#00ff9d]">{BIKES[2].detailedSpecs?.waterRating}</td>
              </tr>
              <tr>
                <td className="p-6 text-gray-400 font-bold">BATTERY WARRANTY</td>
                <td className="p-6 text-[#e2f952] font-bold">8 YEARS WARRANTY</td>
                <td className="p-6 text-[#e2f952] font-bold">8 YEARS WARRANTY</td>
                <td className="p-6 text-[#e2f952] font-bold">8 YEARS WARRANTY</td>
              </tr>
              <tr className="bg-white/5">
                <td className="p-6 text-white font-bold font-heading">EFFECTIVE ON ROAD PRICE</td>
                <td className="p-6 text-white font-heading font-extrabold text-base">{BIKES[0].onRoadPrice}</td>
                <td className="p-6 text-[#00f0ff] font-heading font-extrabold text-base">{BIKES[1].onRoadPrice}</td>
                <td className="p-6 text-[#00ff9d] font-heading font-extrabold text-base">{BIKES[2].onRoadPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
