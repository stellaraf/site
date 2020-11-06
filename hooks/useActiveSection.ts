import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { useColorMode } from 'site/context';
import { useSyncedStyleVariant } from 'site/styles';
import type { ActiveSectionEffectProps } from 'site/types';

/**
 * Set state based on the currently active section on a page
 */
export const useActiveSection = (sectionRefs: ReactRef[]): void => {
  const { colorMode } = useColorMode();
  const variant = useSyncedStyleVariant();

  // This should be the highest possible index number:
  // [1,2,3].length === 3, but indexes are 0,1,2
  const lastRef = sectionRefs.length - 1;

  const handleChange = (newState: number) => {
    setTimeout(
      () =>
        variant.set(prev => {
          /**
           * Ensure newState starts over at 0 if it exceeds the number of sections.
           * This means that for 5 style variants, the 6th section uses the 1st variant.
           * For example, for 5 sections & s= current style variant (newState):
           *
           * 1: s=1
           * 2: s=2
           * 3: s=3
           * 4: s=4
           * 5: s=5
           * 6: s=0
           * 7: s=1
           *
           * ...etc.
           * */
          if (prev !== newState) {
            return newState % sectionRefs.length;
          } else {
            return prev;
          }
        }),
      200,
    );
  };

  const effect = (props: ActiveSectionEffectProps) => {
    const { y } = props.currPos;
    for (const [i, ref] of sectionRefs.entries()) {
      const refCurrent = ref.current;

      if (refCurrent) {
        if (i === lastRef) {
          if (y < -refCurrent.offsetTop ?? 0) {
            handleChange(i);
          }
        } else {
          const refNext = sectionRefs[i + 1]?.current;
          if (refNext) {
            if (y >= -refNext.offsetTop && y <= -refCurrent.offsetTop) {
              handleChange(i);
            }
          }
        }
      }
    }

    if (y >= -50 && variant.value !== 0) {
      handleChange(0);
    }
  };
  useScrollPosition(effect, [colorMode, variant.value]);
};
