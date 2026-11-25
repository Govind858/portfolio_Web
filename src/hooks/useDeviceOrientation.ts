import { useState, useEffect } from 'react';

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState({ tiltX: 0, tiltY: 0, isSupported: false });

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // gamma is left-to-right tilt in degrees (-90 to 90)
      // beta is front-to-back tilt in degrees (-180 to 180)
      const gamma = event.gamma ?? 0;
      const beta = event.beta ?? 0;

      // Normalize roughly between -1 and 1
      const tiltX = Math.max(-1, Math.min(1, gamma / 30));
      const tiltY = Math.max(-1, Math.min(1, (beta - 45) / 30));

      setOrientation({
        tiltX,
        tiltY,
        isSupported: true,
      });
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  return orientation;
}
