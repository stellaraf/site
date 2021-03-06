import { VStack } from '@chakra-ui/react';
import { useColorValue } from '~/context';
import { forwardRef } from '~/util';

import type { ICardBody } from './types';
import type { StackProps } from '@chakra-ui/react';

export const CardBody: React.FC<ICardBody> = (props: ICardBody) => {
  const { spacing = 8, ...rest } = props;
  return <VStack zIndex={1} boxSize="100%" spacing={spacing} pos="relative" {...rest} />;
};

export const Card = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const styles = useColorValue(
    { bg: 'white', boxShadow: '2xl' },
    {
      bg: 'blackAlpha.400',
      css: { backdropFilter: 'blur(2px)' },
    },
  );
  return (
    <VStack
      p={8}
      w="md"
      h={props.minH ?? props.minHeight ?? props.height ?? props.h ?? 'md'}
      ref={ref}
      zIndex={1}
      pos="relative"
      spacing={{ base: 8, lg: 0 }}
      borderRadius="lg"
      overflow="hidden"
      {...styles}
      {...props}
    />
  );
});
