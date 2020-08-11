import { MutableRefObject } from 'react';
import { BoxProps } from '@chakra-ui/core';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { isEqual } from 'lodash';

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
  const last = sections.length - 1;

  const effect = ({ currPos }) => {
    const { y } = currPos;
    let toSet = defaultState;
    let sameAsCurrent = false;
    for (const [i, section] of sections.entries()) {
      const [ref, stateObj] = section;
      if (i === last) {
        if (y < -ref.current.offsetTop) {
          sameAsCurrent = isEqual(currentState, stateObj);
          toSet = stateObj;
        }
      } else {
        const [nextRef] = sections[i + 1];
        if (y >= -nextRef.current.offsetTop && y <= -ref.current.offsetTop) {
          sameAsCurrent = isEqual(currentState, stateObj);
          toSet = stateObj;
        }
      }
    }
    if (!sameAsCurrent) {
      callback(toSet);
    }
  };

  return useScrollPosition(effect, deps);
};
