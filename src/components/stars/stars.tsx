import { useMemo, useEffect, useState } from "react";

import { chakra } from "@chakra-ui/react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import { useKonami } from "~/hooks";

import type { BoxProps } from "@chakra-ui/react";
import type { IParticlesProps } from "@tsparticles/react";

export type ParticlesOptions = NonNullable<IParticlesProps["options"]>;

const DEFAULT_OPTIONS: ParticlesOptions = {
  detectRetina: true,
  responsive: [
    {
      mode: "screen",
      maxWidth: 991,
      options: {
        interactivity: {},
      },
    },
    {
      mode: "screen",
      maxWidth: 5000,
      options: {
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
      },
    },
  ],
  particles: {
    shape: { type: "circle" },
    number: {
      limit: { mode: "delete", value: 100 },
      value: 160,
      density: {
        enable: true,
        width: typeof window === "undefined" ? 1200 : window.outerWidth,
        height: typeof window === "undefined" ? 800 : window.outerHeight,
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
      animation: {
        mode: "random",
      },
    },
    opacity: {
      value: 0.5,
      animation: {
        enable: true,
        speed: 1,
        startValue: "min",
      },
    },
  },
};

const KONAMI_OPTIONS: ParticlesOptions = {
  detectRetina: true,
  particles: {
    shape: { type: "circle" },
    number: {
      limit: { mode: "delete", value: 1000 },
      value: 500,
      density: {
        enable: true,
        width: typeof window === "undefined" ? 1200 : window.outerWidth,
        height: typeof window === "undefined" ? 800 : window.outerHeight,
      },
    },
    size: {
      value: 0,
      animation: {
        mode: "random",
      },
    },
    opacity: {
      value: 0.5,
      animation: {
        enable: true,
        speed: 1,
        startValue: "min",
      },
    },
    twinkle: { particles: { enable: true } },
    move: {
      enable: true,
      speed: 6,
      direction: "inside",
      size: true,
      trail: { enable: true, length: 3, fill: { color: "transparent" } },
      outModes: "out",
      straight: true,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        parallax: { enable: true, force: 5, smooth: 25 },
      },
    },
  },
};

function useOptions(): ParticlesOptions {
  const [konami] = useKonami();

  return useMemo<ParticlesOptions>(() => {
    if (konami) {
      return KONAMI_OPTIONS;
    }
    return DEFAULT_OPTIONS;
  }, [konami]);
}

function useParticles(): boolean {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  return init;
}

const Base = (particleProps: IParticlesProps) => {
  const options = useOptions();
  const init = useParticles();
  return init ? <Particles options={options} {...particleProps} /> : <></>;
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
    bg: "transparent",
  },
});

export const Stars = (props: BoxProps) => (
  <Wrapper as={Base} opacity={0} _dark={{ opacity: 1 }} className="__stars-container" {...props} />
);
