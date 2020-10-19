import type KeenSlider from 'keen-slider';
import type { TOptionsEvents } from 'keen-slider';
import type { RefObject } from 'react';

interface UseScrollPositionPoint {
  x: number;
  y: number;
}
export interface ActiveSectionEffectProps {
  prevPos: UseScrollPositionPoint;
  currPos: UseScrollPositionPoint;
}

export interface UsePageContent {
  error: string | null;
  title: React.FC;
  subtitle: React.FC;
  body: React.FC | null;
  buttonText?: string;
  buttonLink?: string;
  showButton: boolean;
  subsections: React.FC;
  showUpdatedDate: boolean;
  updatedAt: React.FC;
  image: React.FC | null;
}

export type TitleMe = (t: string) => string;

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
  containerRef: RefObject<HTMLDivElement>;
}
