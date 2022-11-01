import { createContext, useContext, forwardRef } from "react";

import { Box, Button, Flex } from "@chakra-ui/react";

import { useSlider } from "./use-slider";

import type { CarouselProps, UseCarousel } from "./types";
import type { BoxProps, FlexProps } from "@chakra-ui/react";

/**
 * Cycle through range of numbers `total` starting with `current`.
 * At interval, execute callback with current number.
 *
 * Used for cycling through each Hero Card.
 */
// function cycle(current: number, total: number, interval: number, callback: SetCurrent) {
//   let idx = current;
//   if (current < total - 1) {
//     idx = current + 1;
//   } else {
//     idx = 0;
//   }
//   return setTimeout(() => callback(idx), interval);
// }

const CarouselContext = createContext<UseCarousel>(Object());

const useCarousel = (): UseCarousel => {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw Error("useCarousel must be inside a Provider with a value");
  }
  return ctx;
};

/**
 * Show a row of dots for each Hero Card. The currently active card's dot is filled.
 */
const Dots = (props: BoxProps) => {
  const { color, ...rest } = props;
  const { current, setCurrent, total } = useCarousel();
  return (
    <Flex
      position="absolute"
      width="100%"
      bottom={0}
      alignItems="flex-end"
      justifyContent="center"
      zIndex={3}
    >
      {[...Array(total)].map((_, i) => {
        const handleClick = (): void => setCurrent(i);
        return (
          <Button key={i} mx={1} minW="unset" variant="unstyled" onClick={handleClick} h="unset">
            <Box
              width={2}
              height={2}
              borderWidth="1px"
              borderRadius="50%"
              borderStyle="solid"
              borderColor={color}
              bg={i === current ? color : "transparent"}
              {...rest}
            />
          </Button>
        );
      })}
    </Flex>
  );
};

/**
 * Bastardized Chakra/style props version of Keen-Slider's CSS so CSS doesn't have to be imported.
 * See: https://github.com/rcbyr/keen-slider/blob/master/src/keen-slider.scss
 */
const SliderContainer = forwardRef<HTMLDivElement, FlexProps>((props, ref) => (
  <Flex
    ref={ref}
    zIndex={1}
    width="100%"
    height="100%"
    overflow="hidden"
    position="absolute"
    className="__slider_container"
    css={{
      touchAction: "pan-y",
      msTouchAction: "none",
      KhtmlUserSelect: "none",
      WebkitTouchCallout: "none",
      WebkitTapHighlightColor: "transparent",
    }}
    {...props}
  />
));

/**
 * Bastardized Chakra/style props version of Keen-Slider's CSS so CSS doesn't have to be imported.
 * See: https://github.com/rcbyr/keen-slider/blob/master/src/keen-slider.scss
 */
const Slide = (props: FlexProps) => (
  <Flex
    width="100%"
    minHeight="100%"
    overflow="hidden"
    position="relative"
    display="inline-block"
    className="__slider_slide"
    {...props}
  />
);

/**
 * Cycle through child elements with animation.
 */
export const Carousel = (props: CarouselProps) => {
  const {
    interval,
    // = 4000
    noDots = false,
    dotColor = "black",
    children,
    ...rest
  } = props;
  const { slide, setSlide, containerRef } = useSlider();
  return (
    <CarouselContext.Provider
      value={{
        current: slide,
        setCurrent: setSlide,
        total: children.length,
      }}
    >
      <Box width="100%" height="100%" position="relative" {...rest}>
        <SliderContainer ref={containerRef}>
          {children.map((child, i) => (
            <Slide key={i}>{child}</Slide>
          ))}
        </SliderContainer>
        {!noDots && <Dots color={dotColor} />}
      </Box>
    </CarouselContext.Provider>
  );
};

SliderContainer.displayName = "SliderContainer";
