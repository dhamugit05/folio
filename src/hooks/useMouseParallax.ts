import { useState, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useMouseParallax(intensity = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * intensity;
      const y = (e.clientY / innerHeight - 0.5) * intensity;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity, reducedMotion]);

  return offset;
}
