"use client";

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
        duration: 1.5, // longer duration = smoother scroll
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        lerp: 0.08, // lower = smoother but slower response
        smooth: true, 
      } as any); // workaround TS for 'smooth' option

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
};
