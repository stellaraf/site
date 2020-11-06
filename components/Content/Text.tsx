import { forwardRef } from 'react';
import { Box, Heading } from '@chakra-ui/core';
import { Label } from 'site/components';
import { useColorValue } from 'site/context';
import { useTitle } from 'site/hooks';

import type { IContentBody, IUpdatedAt, TitleProps, ISubtitle } from './types';

export const Title = forwardRef<HTMLHeadingElement, TitleProps>((props, ref) => {
  const titleMe = useTitle();
  const { id, children, ...rest } = props;
  return (
    <>
      <Box id={id} as="span" pos="relative" top={-130} visibility="hidden" />
      <Heading ref={ref} as="h3" fontSize={{ base: '3xl', lg: '4xl' }} {...rest}>
        {titleMe(children)}
      </Heading>
    </>
  );
});

export const Subtitle = (props: ISubtitle) => {
  const titleMe = useTitle();
  const { children, ...rest } = props;
  return (
    <Heading as="h4" fontSize={{ base: '1.5rem', lg: 'xl' }} fontWeight="light" mt={8} {...rest}>
      {titleMe(children)}
    </Heading>
  );
};

export const Body = (props: IContentBody) => (
  <Box
    my={{ base: 8, lg: 16 }}
    maxW={[null, null, '60%']}
    whiteSpace="pre-line"
    fontSize="lg"
    zIndex={1}
    {...props}
  />
);

export const UpdatedAt = (props: IUpdatedAt) => {
  const { children } = props;
  const leftColor = useColorValue('gray.300', 'gray.500');
  const rightColor = useColorValue('gray.100', 'gray.300');
  return (
    <Label right="Last Updated" left={children} leftColor={leftColor} rightColor={rightColor} />
  );
};
