import { chakra } from '@chakra-ui/react';
import Particles from 'react-tsparticles';
import { useColorValue } from '~/context';
import { useKonamiState } from '~/state';

import type { ParticlesProps, IWrapper, ParticleOptions } from './types';

const DEFAULT_OPTIONS = {
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
} as ParticleOptions;

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

const Wrapper = chakra('div', {
  baseStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    position: 'fixed',
    transition: 'opacity: 500ms ease-in',
  },
});

export const Stars: React.FC<IWrapper> = (props: IWrapper) => {
  const starOpacity = (useColorValue(0, 1) ?? 0) as number;
  return <Wrapper as={Base} opacity={starOpacity} className="__stars-container" {...props} />;
};
