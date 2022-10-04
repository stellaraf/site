import { useEffect, useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { useBreakpointString } from "~/hooks";

import type KeenSlider from "keen-slider";
import type { TOptionsEvents } from "keen-slider";
import type { UseSlider, UseSliderOptions } from "~/types";

export function useSlider(options: UseSliderOptions = {}): UseSlider {
  const { sm, md, lg, xl } = useBreakpointString();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  /**
   * Pause automatic slide advancement.
   */
  const pause = () => {
    setPaused(true);
  };

  /**
   * Resume automatic slide advancement.
   */
  const unpause = () => {
    setPaused(false);
  };

  /**
   * When the slide changes, update currentSlide state.
   */
  const handleSlideChange = (sliderInstance: KeenSlider): void => {
    setCurrentSlide(sliderInstance.details().relativeSlide);
  };

  /**
   * Advance to a specific slide.
   */
  const setSlide = (n: number): void => {
    if (slider && n !== currentSlide) {
      slider.moveToSlide(n);
    }
  };

  /**
   * Go to the next slide.
   */
  const nextSlide = () => {
    if (!paused && slider) {
      slider.next();
    }
  };

  /**
   * Advance to the next slide.
   */
  const previousSlide = () => {
    if (!paused && slider) {
      slider.prev();
    }
  };

  /**
   * Default keen-slider options, with overrides.
   */
  const {
    interval = 4000,
    onInterval = nextSlide,
    onMouseOver = pause,
    onMouseOut = unpause,
    optionsSm,
    optionsMd,
    optionsLg,
    optionsXl,
    ...ksOverrides
  } = options;

  /**
   * Default keen-slider options.
   */
  const defaultOptions = {
    loop: true,
    duration: 1000,
    dragStart: pause,
    dragEnd: unpause,
    slides: ".__slider_slide",
    slideChanged: handleSlideChange,
  } as TOptionsEvents;

  /**
   * Use overridden breakpoint options or defaults.
   */
  const breakpointOptions = {
    [sm]: optionsSm ?? {},
    [md]: optionsMd ?? {},
    [lg]: optionsLg ?? { controls: false },
    [xl]: optionsXl ?? { controls: false },
  } as TOptionsEvents["breakpoints"];

  /**
   * Merge default options with overrides.
   */
  const sliderOptions = {
    ...defaultOptions,
    breakpoints: breakpointOptions,
    ...ksOverrides,
  } as TOptionsEvents;

  /* eslint @typescript-eslint/no-explicit-any: 0 */
  const timerRef = useRef<any>();
  const [containerRef, slider] = useKeenSlider<HTMLDivElement>(sliderOptions);

  /**
   * Add mouseover/mouseout events with callbacks.
   */
  useEffect(() => {
    containerRef.current?.addEventListener("mouseover", () =>
      onMouseOver(slider, paused, setPaused, currentSlide, setSlide),
    );
    containerRef.current?.addEventListener("mouseout", () =>
      onMouseOut(slider, paused, setPaused, currentSlide, setSlide),
    );
  }, [containerRef]);

  /**
   * Perform action on interval.
   */
  useEffect(() => {
    timerRef.current = setInterval(
      () => onInterval(slider, paused, setPaused, currentSlide, setSlide),
      interval,
    );
    return () => {
      clearInterval(timerRef.current);
    };
  }, [paused, slider]);

  return {
    pause,
    slider,
    unpause,
    setSlide,
    nextSlide,
    containerRef,
    previousSlide,
    isPaused: paused,
    slide: currentSlide,
  };
}
