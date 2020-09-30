import * as React from 'react';
import { useState } from '@hookstate/core';
import { Box, Flex } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { Link, Logo } from 'site/components';
import { useColorValue } from 'site/context';
import { useNavLogoState } from 'site/hooks';

import type { IBaseHeader } from './types';

export const Wrapper = (props: IBaseHeader) => {
  const { isOpen, onToggle, burger, navHeaderHeight, ...rest } = props;
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  const { pathname } = useRouter();
  const { value: globalShowLogo } = useNavLogoState();

  /**
   * Show logo in the navbar only if:
   *   a) the homepage hero logo is hidden
   *   b) or on any other page
   *   c) and if the mobile nav is NOT open
   */
  const showLogo = useState(false);
  if (pathname === '/') {
    // Homepage: mobile nav closed, hero hidden, not already shown, then SHOW
    !isOpen && globalShowLogo && !showLogo.value && showLogo.set(true);
    // Homepage: mobile nav closed, hero shown, already shown, then HIDE
    !isOpen && !globalShowLogo && showLogo.value && showLogo.set(false);
    // Homepage: mobile nav open, hero shown, already shown, then HIDE
    isOpen && showLogo.value && showLogo.set(false);
  } else if (pathname !== '/') {
    // Non-homepage: mobile nav closed, not already shown, then SHOW
    !isOpen && !showLogo.value && showLogo.set(true);
    // Non-homepage: mobile nav open, already shown, then HIDE
    isOpen && showLogo.value && showLogo.set(false);
  }
  return (
    <Box
      as="header"
      pos="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="transparent"
      transition={{ transition: 'all 200ms ease-in' }}
      w="100%"
      h={20}
      css={{ backdropFilter: 'blur(10px)' }}>
      <Flex
        px={8}
        h="100%"
        as="nav"
        flexDir="row"
        pos="relative"
        flexWrap="nowrap"
        alignItems="center"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor={borderColor}
        justifyContent="space-between"
        {...rest}>
        <Link href="/" opacity={showLogo.value ? 1 : 0}>
          <Logo.Text width="auto" height={navHeaderHeight} mb={2} />
        </Link>
        {!isOpen && burger}
      </Flex>
    </Box>
  );
};
