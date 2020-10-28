import { memo } from 'react';
import { useRouter } from 'next/router';
import { Center, Heading, VStack, Wrap } from '@chakra-ui/core';
import { useInView } from 'react-intersection-observer';
import { AnimatedBox, SectionDivider } from 'site/components';
import { useConfig, useColorValue } from 'site/context';
import { useTitle } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';
import { Action } from './Action';
import { filterActions, randomActions } from './util';

import type { ICallToAction, ICallToActionMemo } from './types';

export const _CallToActionContainer = (props: ICallToActionMemo) => {
  const { actions: rawActions, currentPath, ...rest } = props;

  const rStyles = useResponsiveStyle();
  const titleMe = useTitle();

  const { callToActionTitle, callsToActionShown } = useConfig();

  // Only filter out actions if we're NOT on the home page.
  const exclusions = currentPath !== '/' ? [currentPath.replace('/', '')] : undefined;
  const filteredActions = rawActions.filter(p => filterActions(p.page.slug, exclusions));

  // Randomize & limit the actions shown.
  const actions = randomActions(callsToActionShown, filteredActions);

  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '-100px' });

  return (
    <>
      <VStack py={24} spacing={12} className="__actions" minH="30vh" {...rStyles} {...rest}>
        <Center>
          <Heading as="h5" fontSize={{ base: 'lg', lg: '2xl' }}>
            {titleMe(callToActionTitle)}
          </Heading>
        </Center>
        <Wrap direction={{ base: 'column', lg: 'row' }} spacing={8} justify="center" ref={ref}>
          {inView &&
            actions.map((action, i) => (
              <AnimatedBox
                zIndex={1}
                animate={{ x: 0 }}
                key={`action${i}`}
                initial={{ x: '100%' }}
                whileTap={{ y: '-3%' }}
                whileHover={{ y: '-5%' }}
                transition={{ delay: i * 0.1 }}>
                <Action {...action} />
              </AnimatedBox>
            ))}
        </Wrap>
      </VStack>
    </>
  );
};

/**
 * Memoize the CTA container so that it doesn't re-render on every color-mode change. Because the
 * visibility of the <SectionDivider /> is dependent on dark-mode, this is expected, but a little
 * annoying.
 */
const CallToActionContainer = memo(
  _CallToActionContainer,
  (prev, next) => prev.currentPath === next.currentPath,
);

export const CallToAction = (props: ICallToAction) => {
  const showBorder = useColorValue(0, 1);
  const { asPath: currentPath } = useRouter();
  return (
    <>
      <CallToActionContainer currentPath={currentPath} {...props} />
      <SectionDivider straight opacity={showBorder} />
    </>
  );
};
