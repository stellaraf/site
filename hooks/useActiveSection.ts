import { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { Untracked } from '@hookstate/untracked';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { isEqual } from 'lodash';
import { useColorMode } from 'site/context';
import { useVariantStyle, useDefaultVariant, useSyncedStyle } from 'site/styles';

type Ref = React.MutableRefObject<HTMLElement>;

/**
 * Set state based on the currently active section on a page
 */
export const useActiveSection = ([...sectionRefs]: Ref[]) => {
  const { colorMode } = useColorMode();
  const defaultVariant = useDefaultVariant(colorMode);
  const style = useSyncedStyle();
  useEffect(() => {
    style.set(defaultVariant);
  }, [colorMode]);

  const sections = sectionRefs.map((ref, i) => [ref, useVariantStyle(i, colorMode)]);

  const first = sections[0];
  const last = sections.length - 1;
  const same = useState(true);
  const handleChange = newState => {
    Untracked(style).set(prev => {
      const equal = isEqual(prev, newState);
      if (equal !== same.value) {
        same.set(equal);
        return newState;
      } else {
        return prev;
      }
    });
  };
  let timeout = null;
  const effect = ({ currPos }) => {
    const { y } = currPos;

    for (const [i, section] of sections.entries()) {
      const [ref, stateObj] = section;
      if (i === last) {
        if (y < -ref.current.offsetTop) {
          handleChange(stateObj);
        }
      } else {
        const [nextRef] = sections[i + 1];
        if (y >= -nextRef.current.offsetTop && y <= -ref.current.offsetTop) {
          handleChange(stateObj);
        }
      }
    }
    if (y > -first[0].current.offsetTop) {
      timeout = setTimeout(() => handleChange(defaultVariant), 250);
    }

    if (!same.value) {
      style.set(p => p);
    }
    if (timeout !== null) {
      clearTimeout(timeout);
    }
  };

  return useScrollPosition(effect, [colorMode, style.value]);
};
