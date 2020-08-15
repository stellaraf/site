import * as React from 'react';
import { Box } from '@chakra-ui/core';
import Particles from 'react-particles-js';
import type { ParticlesProps } from 'react-particles-js';
import type { BoxProps } from '@chakra-ui/core';

const starConfig = {
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
};

export const Stars = (rest: BoxProps) => {
  const Base = (props: ParticlesProps) => <Particles params={starConfig} {...props} />;
  return (
    <Box
      as={Base}
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={0}
      position="fixed"
      className="__stars-container"
      transition="opacity 500ms ease-in"
      {...rest}
    />
  );
};
