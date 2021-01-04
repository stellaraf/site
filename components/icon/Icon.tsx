import { Box, Flex, Icon as ChakraIcon } from '@chakra-ui/react';
import { useOpposingColor } from '~/hooks';
import { useColorValue } from '~/context';
import type { IIcon } from './types';

export const Icon: React.FC<IIcon> = (props: IIcon) => {
  const { color: bgColor = 'primary', icon, size = 20, ...rest } = props;

  const bg = useColorValue(`${bgColor}.500`, `${bgColor}.300`);
  const color = useOpposingColor(bg);

  let component = null;
  if (typeof icon === 'string') {
    component = (
      <Box css={{ mask: `url(${icon}) no-repeat center` }} backgroundColor={color} boxSize="50%" />
    );
  } else if (typeof icon === 'undefined') {
    component = <ChakraIcon boxSize="50%" />;
  } else {
    component = <ChakraIcon as={icon} boxSize="50%" />;
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
      {...rest}
    >
      {component}
    </Flex>
  );
};
