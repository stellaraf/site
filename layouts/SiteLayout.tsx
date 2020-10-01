import * as React from 'react';
import dynamic from 'next/dynamic';
import { DHeader, MHeader } from 'site/components';
import { DControls } from 'site/components';
import { Footer } from 'site/components';
import { CallToAction } from 'site/components';
import { SyncedStyleProvider } from 'site/context';
import { useMobile } from 'site/hooks';
import { Wrapper, Root, Main } from './common';

import type { BoxProps, SiteLayoutProps } from './types';

const Stars = dynamic<BoxProps>(() => import('site/components').then(i => i.Stars));

export const SiteLayout = (props: SiteLayoutProps) => {
  const { children, footerGroups } = props;
  const isMobile = useMobile();
  return (
    <Wrapper>
      <SyncedStyleProvider>
        {isMobile ? <MHeader /> : <DHeader />}
        <Main>
          <Root>{children}</Root>
        </Main>
        <CallToAction />
        <Footer groups={footerGroups} />
        {!isMobile && <DControls />}
      </SyncedStyleProvider>
      <Stars />
    </Wrapper>
  );
};
