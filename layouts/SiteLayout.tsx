import * as React from 'react';
import dynamic from 'next/dynamic';
import { Box, StylesProvider, useMultiStyleConfig } from '@chakra-ui/core';
import { NavbarDesktop } from 'site/components/Nav';
import { Controls } from 'site/components/Controls';
import { Footer } from 'site/components/Footer';
import { CalltoAction } from 'site/components/CallToAction';
import { useSyncedStyleVariant } from 'site/styles';

const Stars = dynamic(() => import('site/components/Stars').then(i => i.Stars));

import smoothscroll from 'smoothscroll-polyfill';

if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}

const Wrapper = props => <Box id="__wrapper" minH="100vh" h="100%" zIndex={-1} {...props} />;
const Main = props => <Box as="main" overflowX="hidden" {...props} />;
const Root = props => <Box id="__content" h="100%" minH="50vh" {...props} />;

export const SiteLayout = ({ children }) => {
  const variant = useSyncedStyleVariant();
  const styles = useMultiStyleConfig('SyncedStyles', { variant: variant.value });
  return (
    <Wrapper>
      <StylesProvider value={styles}>
        <NavbarDesktop />
        <Main>
          <Root>{children}</Root>
        </Main>
        <CalltoAction />
        <Footer />
        <Controls />
        <Stars />
      </StylesProvider>
    </Wrapper>
  );
};
