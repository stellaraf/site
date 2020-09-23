import * as React from 'react';
import { Box } from '@chakra-ui/core';
import Particles from 'react-tsparticles';
import { useColorValue } from 'site/context';

import type { ParticlesProps, WrapperProps, ParticleOptions } from './types';

const starsConfig: ParticleOptions = {
  particles: {
    shape: { type: 'circle' },
    number: {
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

const Base = (particleProps: ParticlesProps) => (
  <Particles options={starsConfig} {...particleProps} />
);

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
