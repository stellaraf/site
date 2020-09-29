import * as React from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/core';
import { motion } from 'framer-motion';
import { Marker } from 'react-simple-maps';
import { useColorValue } from 'site/context';
import type { MarkerProps } from './types';

export const MapMarker = (props: MarkerProps) => {
  const { color = 'currentColor', ...rest } = props;
  const fill = useColorValue('black', 'white');
  const radius = useBreakpointValue({ base: 12, lg: 4 });
  return (
    <Marker {...rest}>
      <Box
        as="circle"
        r={radius}
        fill={color}
        stroke="white"
        boxShadow="sm"
        strokeWidth={1.5}
        zIndex={2}
      />
      <motion.circle
        r={radius}
        fill={fill}
        animate={{ scale: [1, 4], opacity: [0.2, 0] }}
        transition={{ duration: 1, loop: Infinity, repeatDelay: 0.5 }}
      />
    </Marker>
  );
};
