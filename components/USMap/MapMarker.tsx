import * as React from 'react';
import { Box } from '@chakra-ui/core';
import { motion } from 'framer-motion';
import { Marker } from 'react-simple-maps';
import { useColorValue } from 'site/context';
import type { MarkerProps } from './types';

export const MapMarker = (props: MarkerProps) => {
  const { color = 'currentColor', ...rest } = props;
  const fill = useColorValue('black', 'white');
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
      <motion.circle
        r={4}
        fill={fill}
        animate={{ scale: [1, 4], opacity: [0.2, 0] }}
        transition={{ duration: 1, loop: Infinity, repeatDelay: 0.5 }}
      />
    </Marker>
  );
};
