import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../../data/bikes';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#050507]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase block">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight uppercase">
            EVERYTHING YOU NEED <span className="text-cyan-gradient">TO KNOW</span>
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel rounded-2xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-base text-white hover:text-[#00f0ff] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#00f0ff] shrink-0" />
                  <span>{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${
                    openIndex === idx ? 'rotate-180 text-[#00f0ff]' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-sm text-gray-300 font-sans leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
