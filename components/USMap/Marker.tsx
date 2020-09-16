import * as React from 'react';
import { forwardRef } from 'react';
import { Box } from '@chakra-ui/core';
import { useSpring, animated } from 'react-spring';
import { Marker } from 'react-simple-maps';
import { useColorValue } from 'site/context';
import type { MarkerProps } from './types';

const Circle = props => <Box as="circle" {...props} />;

export const MapMarker = forwardRef<HTMLElement, MarkerProps>((props, ref) => {
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
      <Circle
        ref={ref}
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
});
