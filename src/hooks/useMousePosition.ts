import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, normalizedX: 0, normalizedY: 0 });

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (event: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const { clientX, clientY } = event;
          const { innerWidth, innerHeight } = window;
          
          // Normalized from -1 to 1 (center is 0, 0)
          const normalizedX = (clientX / innerWidth) * 2 - 1;
          const normalizedY = (clientY / innerHeight) * 2 - 1;

          setMousePosition({
            x: clientX,
            y: clientY,
            normalizedX,
            normalizedY,
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
}
