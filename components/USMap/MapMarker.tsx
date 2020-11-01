import { Box, Link, PopoverTrigger, useBreakpointValue, useToken } from '@chakra-ui/core';
import { motion } from 'framer-motion';
import { Marker } from 'react-simple-maps';
import { useColorValue } from 'site/context';

import type { Variants } from 'framer-motion';
import type { IMapMarker } from './types';

const bestVariants = {
  best: {
    opacity: 1,
    scale: 3,
    display: 'block',
  },
  notBest: { opacity: 0, scale: 15, display: 'none' },
} as Variants;

export const MapMarker = (props: IMapMarker) => {
  const { color = 'currentColor', best = false, ...rest } = props;
  const bestOutline = useColorValue(
    useToken('colors', 'original.secondary'),
    useToken('colors', 'original.tertiary'),
  );
  const fill = useColorValue('black', 'white');
  const radius = useBreakpointValue({ base: 12, lg: 4 });
  const bestColor = useColorValue('original.tertiary', 'original.red');

  return (
    <Marker {...rest}>
      <motion.circle
        r={radius}
        fill="transparent"
        strokeWidth={0.25}
        stroke={bestOutline}
        layoutId="bestLocation"
        variants={bestVariants}
        style={{ position: 'absolute' }}
        animate={best ? 'best' : 'notBest'}
        initial={{ opacity: 0, scale: 15, display: 'none' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <PopoverTrigger>
        <Link>
          <Box
            r={radius}
            zIndex={2}
            as="circle"
            stroke="white"
            boxShadow="sm"
            strokeWidth={1.5}
            fill={best ? bestColor : color}
          />
          <motion.circle
            r={radius}
            fill={fill}
            animate={{ scale: [1, 4], opacity: [0.2, 0] }}
            transition={{ duration: 1, loop: Infinity, repeatDelay: 0.5 }}
          />
        </Link>
      </PopoverTrigger>
    </Marker>
  );
};
