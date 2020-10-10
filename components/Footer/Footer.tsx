import * as React from 'react';
import { Box, HStack, VStack } from '@chakra-ui/core';
import { SocialLinks } from './SocialLinks';
import { DesktopLinks } from './DesktopLinks';
import { MobileLinks } from './MobileLinks';
import { Copyright } from './Copyright';
import { Subscribe } from './Subscribe';
import { MControls } from 'site/components';
import { useColorValue } from 'site/context';
import { useMobile } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { FooterProps } from './types';

const BottomDesktop = () => {
  return (
    <HStack justify="space-between" align="flex-end" mb={12} mt={24}>
      <VStack align="flex-start" spacing={12}>
        <SocialLinks />
        <Copyright />
      </VStack>
      <Subscribe />
    </HStack>
  );
};

const BottomMobile = () => {
  return (
    <VStack justify="space-between" align="center" mb={8} mt={12} spacing={12}>
      <MControls />
      <Subscribe
        width="100%"
        align="center"
        alertProps={{ right: 0, mx: 4, top: 16 }}
        alertPosition="top"
      />
      <VStack align="flex-start" spacing={12}>
        <SocialLinks />
      </VStack>
      <Copyright />
    </VStack>
  );
};

export const Footer = (props: FooterProps) => {
  const { groups, ...rest } = props;
  const bg = useColorValue('primary.800', 'original.dark');
  const color = useColorValue('white', 'white');
  const rStyles = useResponsiveStyle();
  const isMobile = useMobile();
  return (
    <Box as="footer" pt={24} pb={12} w="100%" bg={bg} color={color} {...rStyles} {...rest}>
      {isMobile ? <MobileLinks groups={groups} /> : <DesktopLinks groups={groups} />}
      {isMobile ? <BottomMobile /> : <BottomDesktop />}
    </Box>
  );
};
