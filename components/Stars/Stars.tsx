import * as React from 'react';
import { Box } from '@chakra-ui/core';
import Particles from 'react-particles-js';
import { useColorValue } from 'site/context';
import { useStarsConfig } from './useStarsConfig';
import type { ParticlesProps, WrapperProps } from './types';

export const Stars = (props: WrapperProps) => {
  const Base = (particleProps: ParticlesProps) => (
    <Particles params={useStarsConfig()} {...particleProps} />
  );
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
