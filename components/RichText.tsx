import * as React from 'react';
import { Heading, Box, Code as ChakraCode, Text, List, ListItem } from '@chakra-ui/core';
import { useColorMode } from '../context';
import { titleMe } from '../util';
import type { HeadingProps, BoxProps } from '@chakra-ui/core';

const BaseHeading = ({ children, ...props }: HeadingProps) => {
  let title = children;
  if (typeof children === 'string') {
    title = titleMe(children);
  }
  return (
    <Heading mb={2} mt={12} {...props}>
      {title}
    </Heading>
  );
};

export const H1 = (props: HeadingProps) => <BaseHeading as="h1" my="1em" size="xl" {...props} />;
export const H2 = (props: HeadingProps) => (
  <BaseHeading as="h2" fontWeight="light" fontSize="2rem" {...props} />
);
export const H3 = (props: HeadingProps) => (
  <BaseHeading pl={1} as="h3" size="md" fontWeight="normal" {...props} />
);
export const H4 = (props: HeadingProps) => (
  <BaseHeading as="h4" pl={1} size="md" fontWeight="medium" {...props} />
);
export const H5 = (props: HeadingProps) => (
  <BaseHeading as="h5" pl={1} size="sm" fontWeight="medium" {...props} />
);
export const H6 = (props: HeadingProps) => (
  <BaseHeading as="h6" pl={1} size="sm" fontWeight="bold" {...props} />
);

export const P = (props: BoxProps) => <Text my={8} {...props} />;

export const BlockQuote = (props: BoxProps) => {
  const bg = { dark: 'whiteAlpha.100', light: 'blackAlpha.100' };
  const border = { dark: 'whiteAlpha.300', light: 'blackAlpha.300' };
  const { colorMode } = useColorMode();
  return (
    <Box
      my={8}
      pl={4}
      pt={2}
      pb={4}
      borderLeftWidth={2}
      borderLeftStyle="solid"
      borderLeftColor={border[colorMode]}
      position="relative"
      fontFamily="body"
      fontSize="lg"
      lineHeight="tall"
      fontWeight="light"
      backgroundColor={bg[colorMode]}
      {...props}
    />
  );
};

export const Ul = (props: BoxProps) => <List styleType="circle" {...props} />;

export const Ol = (props: BoxProps) => <List as="ol" styleType="decimal" {...props} />;

export const Li = (props: BoxProps) => <ListItem {...props} />;

export const Code = (props: BoxProps) => {
  const color = { dark: 'red', light: 'blackAlpha' };
  const { colorMode } = useColorMode();
  return <ChakraCode fontSize="sm" variantColor={color[colorMode]} {...props} />;
};
