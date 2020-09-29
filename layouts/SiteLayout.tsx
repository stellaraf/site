import * as React from 'react';
import dynamic from 'next/dynamic';
// import smoothscroll from 'smoothscroll-polyfill';
import { useBreakpointValue } from '@chakra-ui/core';
import { DHeader, MHeader } from 'site/components';
import { Controls } from 'site/components';
import { Footer } from 'site/components';
import { CallToAction } from 'site/components';
import { SyncedStyleProvider } from 'site/context';
import { Wrapper, Root, Main } from './common';

import type { BoxProps, SiteLayoutProps } from './types';

const Stars = dynamic<BoxProps>(() => import('site/components').then(i => i.Stars));

// if (typeof window !== 'undefined') {
//   smoothscroll.polyfill();
// }

export const SiteLayout = (props: SiteLayoutProps) => {
  const { children, footerGroups } = props;
  const isMobile = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
    xl: false,
  });
  return (
    <Wrapper>
      <SyncedStyleProvider>
        {isMobile ? <MHeader /> : <DHeader />}
        <Main>
          <Root>{children}</Root>
        </Main>
        <CallToAction />
        <Footer groups={footerGroups} />
        <Controls />
      </SyncedStyleProvider>
      <Stars />
    </Wrapper>
  );
};
