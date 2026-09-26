import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check mobile or touch device
    const checkTouch = () => {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768) {
        setIsTouchDevice(true);
      } else {
        setIsTouchDevice(false);
      }
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('[data-cursor], button, a, input, select');

      if (interactiveEl) {
        setIsHovered(true);
        const label = interactiveEl.getAttribute('data-cursor');
        if (label) {
          setCursorText(label);
        } else if (interactiveEl.tagName === 'BUTTON' || interactiveEl.tagName === 'A') {
          setCursorText('EXPLORE');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Spring Following Circle */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovered ? (cursorText ? 2.5 : 1.5) : 1,
          borderColor: isHovered ? '#00f0ff' : 'rgba(255, 255, 255, 0.4)',
          backgroundColor: cursorText ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed w-9 h-9 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-[1px] transition-colors duration-200"
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-mono font-bold tracking-widest text-[#00f0ff] uppercase select-none px-1 text-center leading-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Instant Central Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? '#00f0ff' : '#ffffff',
        }}
        className="fixed w-2 h-2 rounded-full shadow-[0_0_10px_#00f0ff]"
      />
    </div>
  );
};
