import { Box, Flex, isStyleProp } from '@chakra-ui/react';
import { DynamicIcon } from '~/components';
import { useColorValue } from '~/context';
import { useOpposingColor } from '~/hooks';

import type { ChakraProps } from '@chakra-ui/react';
import type { IconProps } from './types';

export const Icon = (props: IconProps): JSX.Element => {
  const { color: bgColor = 'primary', icon, size = 20, ...rest } = props;

  const restProps = Object.entries(rest).reduce<ChakraProps>((final, [key, value]) => {
    if (isStyleProp(key)) {
      // @ts-expect-error TS can't infer key type even when cast.
      final[key] = value;
    }
    return final;
  }, {} as ChakraProps);

  const bg = useColorValue(`${bgColor}.500`, `${bgColor}.300`);
  const color = useOpposingColor(bg);

  if (typeof icon === 'undefined') {
    return (
      <Box css={{ mask: `url(${icon}) no-repeat center` }} backgroundColor={color} boxSize="50%" />
    );
  }

  return (
    <Flex
      bg={bg}
      width={size}
      height={size}
      color={color}
      align="center"
      minWidth={size}
      justify="center"
      overflow="hidden"
      borderRadius="full"
      {...restProps}
    >
      <DynamicIcon icon={icon} boxSize="50%" />
    </Flex>
  );
};
