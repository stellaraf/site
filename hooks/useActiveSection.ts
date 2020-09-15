import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { useColorMode } from 'site/context';
import { useSyncedStyleVariant } from 'site/styles';

type Ref = React.MutableRefObject<HTMLElement>;

/**
 * Set state based on the currently active section on a page
 */
export const useActiveSection = ([...sectionRefs]: Ref[]) => {
  const { colorMode } = useColorMode();
  const variant = useSyncedStyleVariant();

  const last = sectionRefs.length - 1;
  const handleChange = newState => {
    variant.set(prev => {
      if (prev !== newState) {
        return newState;
      } else {
        return prev;
      }
    });
  };

  const effect = ({ currPos }) => {
    const { y } = currPos;

    for (const [i, ref] of sectionRefs.entries()) {
      if (i === last) {
        if (y < -ref.current.offsetTop) {
          handleChange(i);
        }
      } else {
        const nextRef = sectionRefs[i + 1];
        if (y >= -nextRef.current.offsetTop && y <= -ref.current.offsetTop) {
          handleChange(i);
        }
      }
    }

    if (y >= -50) {
      handleChange(0);
    }
  };
  return useScrollPosition(effect, [colorMode, variant.value]);
};
