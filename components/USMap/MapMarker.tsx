import { Box, useBreakpointValue, useToken } from '@chakra-ui/core';
import { motion, AnimatePresence } from 'framer-motion';
import { Marker } from 'react-simple-maps';
import { useColorValue } from 'site/context';

import type { IMapMarker } from './types';

export const MapMarker = (props: IMapMarker) => {
  const { color = 'currentColor', best = false, ...rest } = props;
  const fill = useColorValue('black', 'white');
  const bestOutline = useColorValue(
    useToken('colors', 'original.secondary'),
    useToken('colors', 'original.tertiary'),
  );
  const bestColor = useColorValue('original.tertiary', 'original.red');
  const radius = useBreakpointValue({ base: 12, lg: 4 });
  return (
    <Marker {...rest}>
      <AnimatePresence>
        {best && (
          <motion.circle
            layoutId="bestLocation"
            style={{ position: 'absolute' }}
            r={radius}
            fill="transparent"
            stroke={bestOutline}
            strokeWidth={0.25}
            initial={{ opacity: 0, scale: 15 }}
            animate={{ opacity: 1, scale: 3 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </AnimatePresence>
      <Box
        as="circle"
        r={radius}
        fill={best ? bestColor : color}
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
