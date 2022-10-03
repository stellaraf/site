import type { ChakraProps } from '@chakra-ui/react';
import type { DynamicIconProps } from '~/components';

export interface IconProps extends DynamicIconProps, ChakraProps {
  size?: number;
  color?: string;
}
