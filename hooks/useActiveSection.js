import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { isEqual } from 'lodash';

/**
 * Set state based on the currently active section on a page
 * @param {*} currentState State Object
 * @param {function} callback Set State Function
 * @param {*} defaultState State to Set by Default
 * @param {[]} deps Array of Dependencies
 * @param {[]} sections Array of Section Refs
 */
export const useActiveSection = (
  currentState,
  callback,
  defaultState,
  [...deps],
  [...sections],
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
