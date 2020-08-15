import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/core';
import { useTransition, animated } from 'react-spring';

interface CarouselProps {
  interval?: number;
  noDots?: boolean;
  dotColor?: string;
  children: React.ReactNodeArray;
  [k: string]: any;
}

type SetCurrent = (c: number) => void;

interface UseCarousel {
  total: number;
  current: number;
  setCurrent: SetCurrent;
}

/**
 * Cycle through range of numbers `total` starting with `current`.
 * At interval, execute callback with current number.
 *
 * Used for cycling through each Hero Card.
 */
const cycle = (current: number, total: number, interval: number, callback: SetCurrent) => {
  let idx = current;
  if (current < total - 1) {
    idx = current + 1;
  } else {
    idx = 0;
  }
  return setTimeout(() => callback(idx), interval);
};

const CarouselContext = createContext(null);
const useCarousel = (): UseCarousel => useContext(CarouselContext);

/**
 * Show a row of dots for each Hero Card. The currently active card's dot is filled.
 */
const Dots = ({ color }) => {
  const { current, setCurrent, total } = useCarousel();
  return (
    <Flex position="absolute" width="100%" bottom={0} alignItems="flex-end" justifyContent="center">
      {Array.apply(null, Array(total)).map((_, i) => (
        <Button key={i} mx={1} minW="unset" variant="unstyled" onClick={() => setCurrent(i)}>
          <Box
            width={2}
            height={2}
            borderWidth="1px"
            borderRadius="50%"
            borderStyle="solid"
            borderColor={color}
            bg={i === current ? color : 'transparent'}
          />
        </Button>
      ))}
    </Flex>
  );
};

/**
 * Cycle through child elements with animation.
 */
export const Carousel = ({
  interval = 4000,
  noDots = false,
  dotColor = 'black',
  children,
  ...props
}: CarouselProps) => {
  const [current, setCurrent] = useState(0);
  const transition = useTransition(children[current], {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)', display: 'none' },
    onRest: () => cycle(current, children.length, interval, setCurrent),
  });
  return (
    <CarouselContext.Provider value={{ current, setCurrent, transition, total: children.length }}>
      <Box width="100%" height="100%" position="relative" {...props}>
        <Box width="100%" height="100%" position="absolute">
          {transition((style, item) => (
            <animated.div style={style}>{item}</animated.div>
          ))}
        </Box>
        {!noDots && <Dots color={dotColor} />}
      </Box>
    </CarouselContext.Provider>
  );
};
