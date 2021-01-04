import { Flex } from '@chakra-ui/react';
import { useOpposingColor } from '~/hooks';

import type { ILabel } from './types';

export const Label: React.FC<ILabel> = (props: ILabel) => {
  const {
    left,
    right,
    leftProps = {},
    rightProps = {},
    leftColor: leftBg = 'primary.500',
    rightColor: rightBg = 'secondary.500',
    ...rest
  } = props;

  const leftColor = useOpposingColor(leftBg);
  const rightColor = useOpposingColor(rightBg);

  return (
    <Flex
      my={2}
      zIndex={1}
      boxShadow="md"
      flexWrap="nowrap"
      alignItems="center"
      mx={{ base: 1, md: 2 }}
      justifyContent="flex-start"
      {...rest}
    >
      <Flex
        mr={0}
        py={1}
        bg={leftBg}
        lineHeight="1.5"
        color={leftColor}
        fontWeight="bold"
        whiteSpace="nowrap"
        display="inline-flex"
        px={{ base: 2, md: 3 }}
        justifyContent="center"
        borderTopLeftRadius={4}
        borderTopRightRadius={0}
        borderBottomLeftRadius={4}
        borderBottomRightRadius={0}
        fontSize={{ base: 'xs', md: 'sm' }}
        {...leftProps}
      >
        {left}
      </Flex>
      <Flex
        py={1}
        ml={0}
        mr={0}
        bg={rightBg}
        lineHeight="1.5"
        color={rightColor}
        fontWeight="medium"
        whiteSpace="nowrap"
        display="inline-flex"
        px={{ base: 2, md: 3 }}
        justifyContent="center"
        borderTopLeftRadius={0}
        borderTopRightRadius={4}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={4}
        fontSize={{ base: 'xs', md: 'sm' }}
        {...rightProps}
      >
        {right}
      </Flex>
    </Flex>
  );
};
