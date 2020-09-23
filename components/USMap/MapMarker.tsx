import * as React from 'react';
import { Box } from '@chakra-ui/core';
import { useSpring, animated } from 'react-spring';
import { Marker } from 'react-simple-maps';
import { useColorValue } from 'site/context';
import type { MarkerProps } from './types';

export const MapMarker = (props: MarkerProps) => {
  const { color = 'currentColor', ...rest } = props;
  const fill = useColorValue('black', 'white');
  const animation = useSpring({
    to: async next => {
      while (1) {
        await next({ opacity: 0.2, transform: 'scale(1)' });
        await next({ opacity: 0, transform: 'scale(4)' });
        await next({ opacity: 0, transform: 'scale(1)' });
      }
    },
    config: { duration: 1000 },
  });
  return (
    <Marker {...rest}>
      <Box
        as="circle"
        r={4}
        fill={color}
        stroke="white"
        boxShadow="sm"
        strokeWidth={1.5}
        zIndex={2}
      />
      <animated.circle r={4} fill={fill} style={animation} />
    </Marker>
  );
};
