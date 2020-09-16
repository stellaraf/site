import * as React from 'react';
import { useState } from 'react';
import { createContext, useContext, useMemo } from 'react';
import { useMedia as useMediaEffect, useMediaLayout as useMediaLayoutEffect } from 'use-media';
import { useTheme } from './UI';

import type { MediaProviderProps, UseMedia } from 'site/types';

const MediaContext = createContext(null);

export const MediaProvider = (props: MediaProviderProps) => {
  const { children } = props;

  let hook = useMediaLayoutEffect;
  if (typeof window === 'undefined') {
    hook = useMediaEffect;
  }

  const [mediaSize, setMediaSize] = useState(null);

  const { breakpoints } = useTheme();
  const { sm, md, lg, xl } = breakpoints;

  const isSm = hook({ maxWidth: md });
  const isMd = hook({ minWidth: md, maxWidth: lg });
  const isLg = hook({ minWidth: lg, maxWidth: xl });
  const isXl = hook({ minWidth: xl });

  const handleChange = (newValue: string): void => {
    if (newValue !== mediaSize) {
      setMediaSize(newValue);
    }
  };

  switch (true) {
    case isSm:
      handleChange('sm');
      break;
    case isMd:
      handleChange('md');
      break;
    case isLg:
      handleChange('lg');
      break;
    case isXl:
      handleChange('xl');
      break;
  }

  const value: UseMedia = useMemo(
    () => ({
      isSm,
      isMd,
      isLg,
      isXl,
      mediaSize,
    }),
    [mediaSize],
  );

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
};

export const useMedia = (): UseMedia => useContext(MediaContext);
