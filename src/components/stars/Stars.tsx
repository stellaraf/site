import { useCallback, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useColorValue } from "~/context";
import { useKonami } from "~/hooks";

import type { BoxProps } from "@chakra-ui/react";
import type { Engine } from "tsparticles-engine";
import type { ParticlesProps } from "react-tsparticles";

export type ParticlesOptions = NonNullable<ParticlesProps["options"]>;

const DEFAULT_OPTIONS = {
  particles: {
    shape: { type: "circle" },
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
      direction: "none",
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
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "connect",
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
} as ParticlesOptions;

const konamiOptions: ParticlesOptions = {
  detectRetina: true,
  particles: {
    shape: { type: "circle" },
    number: {
      limit: 500,
      value: 300,
      density: {
        enable: true,
        value_area: 800,
      },
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
    twinkle: { particles: { enable: true } },
    move: {
      enable: true,
      speed: 5,
      direction: "inside",
      size: true,
      trail: { enable: true, length: 3 },
      warp: true,
    },
  },
  interactivity: {
    events: {
      onHover: {
        parallax: { enable: true, force: 10, smooth: 10 },
      },
    },
    modes: {
      connect: { distance: 100, radius: 200, links: { opacity: 0.2 } },
      push: {
        quantity: 2,
      },
    },
  },
};

const Base = (particleProps: ParticlesProps) => {
  const [konami] = useKonami();

  const options = useMemo(() => {
    if (konami) {
      return konamiOptions;
    }
    return DEFAULT_OPTIONS;
  }, [konami]);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async () => {
    return;
  }, []);

  return (
    <Particles options={options} {...particleProps} init={particlesInit} loaded={particlesLoaded} />
  );
};

const Wrapper = chakra("div", {
  baseStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    position: "fixed",
    transition: "opacity 500ms ease-in",
  },
});

export const Stars = (props: BoxProps): JSX.Element => {
  const starOpacity = (useColorValue(0, 1) ?? 0) as number;
  return <Wrapper as={Base} opacity={starOpacity} className="__stars-container" {...props} />;
};
