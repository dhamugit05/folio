import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const cursor = usePortfolioStore((s) => s.cursor);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Check for fine pointer (mouse/trackpad, not touch)
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches || reducedMotion) {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    setHasMouse(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.closest('button') ||
            target.closest('a') ||
            target.getAttribute('role') === 'button'
        );
        setIsPointer(isClickable);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [reducedMotion]);

  if (!hasMouse || reducedMotion) return null;

  const ringSize = cursor.text ? 68 : isPointer ? 44 : isMouseDown ? 24 : 32;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-cyan-400 pointer-events-none shadow-[0_0_10px_#22D3EE]"
        animate={{
          x: pos.x - 5,
          y: pos.y - 5,
          scale: isMouseDown ? 0.6 : isPointer ? 1.4 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Trailing ring with state text */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-400/80 bg-cyan-400/10 backdrop-blur-[1px] pointer-events-none flex items-center justify-center font-mono text-[9px] uppercase font-bold text-cyan-300"
        animate={{
          x: pos.x - ringSize / 2,
          y: pos.y - ringSize / 2,
          width: ringSize,
          height: ringSize,
          borderColor: isPointer ? '#A78BFA' : '#22D3EE',
          scale: isMouseDown ? 0.85 : 1,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 220, mass: 0.25 }}
      >
        {cursor.text && <span>{cursor.text}</span>}
      </motion.div>
    </div>
  );
};
