import { useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { isEqual } from 'lodash';
import type { MutableRefObject } from 'react';
import type { BoxProps } from '@chakra-ui/core';

type Sections = [MutableRefObject<HTMLElement>, BoxProps];

/**
 * Set state based on the currently active section on a page
 */
export const useActiveSection = (
  currentState: BoxProps,
  callback: (s: BoxProps) => any,
  defaultState: BoxProps,
  [...deps]: any,
  [...sections]: Sections[],
) => {
  const first = sections[0];
  const last = sections.length - 1;
  const [style, setStyle] = useState(defaultState);
  const [sameAsCurrent, setSameAsCurrent] = useState(true);
  const handleChange = newState => {
    const isSame = isEqual(currentState, newState);
    if (isSame !== sameAsCurrent) {
      setSameAsCurrent(isSame);
    }
    setStyle(newState);
  };
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
      setTimeout(() => handleChange(defaultState), 250);
    }
    if (!sameAsCurrent) {
      callback(style);
    }
  };

  return useScrollPosition(effect, [deps]);
};
