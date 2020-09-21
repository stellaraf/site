import * as React from 'react';
import dynamic from 'next/dynamic';
import { Box, StylesProvider, useMultiStyleConfig } from '@chakra-ui/core';
import smoothscroll from 'smoothscroll-polyfill';
import { HeaderDesktop } from 'site/components';
import { Controls } from 'site/components';
import { Footer } from 'site/components';
import { CalltoAction } from 'site/components';
import { useSyncedStyleVariant } from 'site/styles';

import type { BoxProps, SiteLayoutProps } from './types';

const Stars = dynamic(() => import('site/components').then(i => i.Stars));

if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}

const Wrapper = (props: BoxProps) => (
  <Box id="__wrapper" minH="100vh" h="100%" zIndex={-1} {...props} />
);
const Main = (props: BoxProps) => <Box as="main" overflowX="hidden" {...props} />;
const Root = (props: BoxProps) => <Box id="__content" h="100%" minH="50vh" {...props} />;

export const SiteLayout = (props: SiteLayoutProps) => {
  const { children, footerGroups } = props;
  const variant = useSyncedStyleVariant();
  const styles = useMultiStyleConfig('SyncedStyles', { variant: variant.value });
  return (
    <Wrapper>
      <StylesProvider value={styles}>
        <HeaderDesktop />
        <Main>
          <Root>{children}</Root>
        </Main>
        <CalltoAction />
        <Footer groups={footerGroups} />
        <Controls />
        <Stars />
      </StylesProvider>
    </Wrapper>
  );
};
