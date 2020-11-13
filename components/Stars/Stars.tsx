import { Box } from '@chakra-ui/react';
import Particles from 'react-tsparticles';
import { useColorValue } from 'site/context';
import { useKonamiState } from 'site/state';

import type { ParticlesProps, WrapperProps, ParticleOptions } from './types';

const DEFAULT_OPTIONS: ParticleOptions = {
  particles: {
    shape: { type: 'circle' },
    number: {
      limit: 100,
      value: 160,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    links: {
      enable: true,
      opacity: 0.02,
      distance: 48,
    },
    move: {
      enable: true,
      direction: 'none',
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
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'connect',
      },
    },
    modes: {
      connect: { distance: 100, radius: 200, links: { opacity: 0.2 } },
      push: {
        quantity: 2,
      },
    },
  },
  detectRetina: true,
};

const Base = (particleProps: ParticlesProps) => {
  const konami = useKonamiState();
  let options = DEFAULT_OPTIONS;
  if (konami.value) {
    options = {
      ...DEFAULT_OPTIONS,
      particles: {
        ...DEFAULT_OPTIONS.particles,
        twinkle: { particles: { enable: true } },
        move: {
          ...DEFAULT_OPTIONS?.particles?.move,
          speed: 4,
          direction: 'top-left',
        },
      },
      interactivity: {
        ...DEFAULT_OPTIONS.interactivity,
        events: {
          ...DEFAULT_OPTIONS.interactivity?.events,
          onHover: {
            ...DEFAULT_OPTIONS.interactivity?.events?.onHover,
            parallax: { enable: true, force: 10, smooth: 10 },
          },
        },
      },
    };
  }

  return <Particles options={options} {...particleProps} />;
};

export const Stars = (props: WrapperProps) => {
  const starOpacity: number = useColorValue(0, 1);
  return (
    <Box
      as={Base}
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={0}
      position="fixed"
      opacity={starOpacity ?? 0}
      className="__stars-container"
      transition="opacity 500ms ease-in"
      {...props}
    />
  );
};
