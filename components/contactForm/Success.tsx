import { VStack, Icon, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCheckCircle as Check } from '@meronex/icons/fa';
import { useColorValue } from '~/context';

import type { StackProps } from '@chakra-ui/react';

const AnimatedVStack = motion(VStack);

export const Success: React.FC<StackProps> = (props: StackProps) => {
  const { children } = props;
  const color = useColorValue('green.500', 'green.300');
  return (
    <AnimatedVStack
      color={color}
      spacing={8}
      textAlign="center"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <Icon boxSize={{ base: 16, lg: 32 }} as={Check} />
      <Heading as="h4" fontSize={{ base: 'md', lg: 'lg' }} fontWeight="medium">
        {children}
      </Heading>
    </AnimatedVStack>
  );
};
