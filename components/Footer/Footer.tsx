import * as React from 'react';
import { Box, HStack, VStack } from '@chakra-ui/core';
import { SocialLinks } from './SocialLinks';
import { FooterLinks } from './FooterLinks';
import { Copyright } from './Copyright';
import { Subscribe } from './Subscribe';
import { useColorValue } from 'site/context';

import type { FooterProps } from './types';

export const Footer = (props: FooterProps) => {
  const { groups, ...rest } = props;
  const bg = useColorValue('original.dark', 'original.dark');
  const color = useColorValue('white', 'white');
  return (
    <Box as="footer" px={24} pt={24} pb={12} w="100%" bg={bg} color={color} {...rest}>
      <FooterLinks groups={groups} />
      <HStack justify="space-between" align="flex-end" mb={12} mt={24}>
        <VStack align="flex-start" spacing={12}>
          {/* <Box
          w="10%"
          mb={8}
          borderColor="original.tertiary"
          borderWidth="1.5px"
          borderRadius="full"
          opacity={0.6}
        /> */}
          <SocialLinks />
          <Copyright />
        </VStack>
        <Subscribe />
      </HStack>
    </Box>
  );
};
