import type { BoxProps } from "@chakra-ui/react";
import type { default as KeenSlider, TOptionsEvents } from "keen-slider";

export interface CarouselProps extends BoxProps {
  interval?: number;
  noDots?: boolean;
  dotColor?: string;
  children: React.ReactNode[];
}

type SetCurrent = (c: number) => void;

export interface UseCarousel {
  total: number;
  current: number;
  setCurrent: SetCurrent;
}

type SliderEvent = (
  slider: KeenSlider,
  paused: boolean,
  setPaused: (paused: boolean) => void,
  currentSlide: number,
  setCurrentSlide: (slideNumber: number) => void,
) => void;

export interface UseSliderOptionsBase extends TOptionsEvents {
  interval?: number;
  onMouseOver?: SliderEvent;
  onMouseOut?: SliderEvent;
  onInterval?: SliderEvent;
}

export interface UseSliderOptions extends UseSliderOptionsBase {
  interval?: number;
  onMouseOver?: SliderEvent;
  onMouseOut?: SliderEvent;
  onInterval?: SliderEvent;
  optionsSm?: UseSliderOptionsBase;
  optionsMd?: UseSliderOptionsBase;
  optionsLg?: UseSliderOptionsBase;
  optionsXl?: UseSliderOptionsBase;
}

export interface UseSlider {
  slide: number;
  setSlide: (n: number) => void;
  nextSlide: () => void;
  previousSlide: () => void;
  isPaused: boolean;
  pause: () => void;
  unpause: () => void;
  slider: KeenSlider;
  containerRef: React.RefObject<HTMLDivElement>;
}
