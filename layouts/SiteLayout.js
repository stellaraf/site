import * as React from 'react';
import dynamic from 'next/dynamic';
import { Box, CSSReset } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import { NavbarDesktop } from '../components/Nav';
import { Controls } from '../components/Controls';
import { Footer } from '../components/Footer';
import { CalltoAction } from '../components/CallToAction';
import { useTheme, useColorMode } from '../context';

const Stars = dynamic(() => import('../components/Stars').then(i => i.Stars));

import smoothscroll from 'smoothscroll-polyfill';

if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}

const Wrapper = props => <Box id="__wrapper" minH="100vh" h="100%" zIndex={-1} {...props} />;
const Main = props => <Box as="main" overflowX="hidden" {...props} />;
const Root = props => <Box id="__content" h="100%" minH="50vh" {...props} />;

export const SiteLayout = ({ children }) => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  // const bg = { dark: colors.original.dark, light: colors.original.light };
  const bg = { dark: 'transparent', light: colors.original.light };
  const color = { dark: colors.original.light, light: colors.original.dark };
  return (
    <>
      <CSSReset />
      <Wrapper>
        <NavbarDesktop />
        <Main>
          <Root>{children}</Root>
        </Main>
        <CalltoAction />
        <Footer />
        <Controls />
        <Stars opacity={colorMode === 'dark' ? 1 : 0} />
      </Wrapper>
      <Global
        styles={{
          body: {
            backgroundColor: bg[colorMode],
            color: color[colorMode],
          },
        }}
      />
      <Global
        styles={css`
          a,
          p,
          ol,
          ul,
          li,
          span,
          button,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            z-index: 1;
          }
        `}
      />
    </>
  );
};
