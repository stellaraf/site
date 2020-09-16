import { useMemo } from 'react';
import type { ParticlesConfig } from './types';

export const useStarsConfig = (): ParticlesConfig =>
  useMemo(
    () => ({
      particles: {
        type: 'circle',
        number: {
          value: 160,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        line_linked: {
          enable: true,
          opacity: 0.02,
          distance: 48,
        },
        move: {
          direction: null,
          random: true,
          speed: 0.25,
        },
        size: {
          value: 1,
          random: true,
        },
        opacity: {
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.05,
          },
        },
      },
      interactivity: {
        events: {
          onclick: {
            enable: true,
            mode: 'push',
          },
          onhover: {
            enable: true,
            mode: 'grab',
          },
        },
        modes: {
          push: {
            particles_nb: 1,
          },
          grab: {
            line_linked: {
              opacity: 0.2,
            },
            distance: 200,
          },
        },
      },
      retina_detect: true,
    }),
    [],
  );
