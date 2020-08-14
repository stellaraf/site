import * as React from 'react';
import { Flex } from '@chakra-ui/core';
import { AngleSection } from './AngleSection';
export const Hero = ({ children, props }) => {
  return (
    <AngleSection height="90vh" color="original.primary" {...props}>
      <Flex
        h="35%"
        mt="5vh"
        pos="relative"
        flexDir="column"
        alignItems="center"
        justifyContent="center">
        {children}
      </Flex>
    </AngleSection>
  );
};
