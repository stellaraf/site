import * as React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { Link, Logo } from 'site/components';
import { useColorValue } from 'site/context';

import type { IBaseHeader } from './types';

export const Wrapper = (props: IBaseHeader) => {
  const { isOpen, onToggle, burger, navHeaderHeight, ...rest } = props;
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  const { pathname } = useRouter();
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
        justifyContent={pathname === '/' ? 'flex-end' : 'space-between'}
        {...rest}>
        {!isOpen && pathname !== '/' && (
          <Link href="/">
            <Logo.Text width="auto" height={navHeaderHeight} mb={2} />
          </Link>
        )}
        {!isOpen && burger}
      </Flex>
    </Box>
  );
};
