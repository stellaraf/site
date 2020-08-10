import * as React from 'react';
import { Box } from '@chakra-ui/core';
import Particles from 'react-particles-js';
import { useConfig } from '../context';

export const Stars = rest => {
  const { stars } = useConfig();
  const Base = props => <Particles params={stars} {...props} />;
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
