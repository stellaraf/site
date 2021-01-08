import dynamic from 'next/dynamic';
import { useBreakpointValue } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import {
  Banner,
  Footer,
  DHeader,
  Preview,
  MHeader,
  Favicons,
  RickRoll,
  DControls,
  CallToAction,
} from '~/components';
import { SyncedStyleProvider } from '~/context';
import { useMobile } from '~/hooks';
import { Wrapper, Root, Main } from './common';

import type { BoxProps } from '@chakra-ui/react';
import type { ISiteLayout } from './types';

const Stars = dynamic<BoxProps>(() => import('~/components').then(i => i.Stars));

export const SiteLayout: React.FC<ISiteLayout> = (props: ISiteLayout) => {
  const { children, footerGroups, actions, preview } = props;
  const isMobile = useMobile();

  const bp = useBreakpointValue({ base: 'Base', md: 'Medium', lg: 'Large', xl: 'X-Large' });

  if (process.env.NODE_ENV === 'development' && typeof bp !== 'undefined') {
    console.log(
      `%cBreakpoint%c${bp}`,
      'background: pink; color: black; padding: 0.5rem; font-size: 0.75rem;',
      'background: black; color: pink; padding: 0.5rem; font-size: 0.75rem; font-weight: bold;',
    );
  }

  return (
    <>
      <Favicons />
      {preview && <Preview />}
      <AnimatePresence exitBeforeEnter>
        <Wrapper>
          <SyncedStyleProvider>
            {isMobile ? <MHeader /> : <DHeader />}
            <Main>
              <Root>{children}</Root>
            </Main>
            <CallToAction actions={actions} />
            <Footer groups={footerGroups} />
            {!isMobile && <DControls />}
          </SyncedStyleProvider>
          <Stars />
          <Banner />
          <RickRoll />
        </Wrapper>
      </AnimatePresence>
    </>
  );
};
