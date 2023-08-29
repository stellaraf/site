import { VStack, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { CircleCheck } from "~/icons";

import type { StackProps } from "@chakra-ui/react";

const AnimatedVStack = motion(VStack);

export const Success = (props: StackProps): JSX.Element => {
  const { children } = props;
  return (
    <AnimatedVStack
      spacing={8}
      color="green.500"
      _dark={{ color: "green.300" }}
      textAlign="center"
      animate={{ scale: 1, opacity: 1 }}
      initial={{ scale: 0.5, opacity: 0 }}
    >
      <CircleCheck boxSize={{ base: 16, lg: 32 }} />
      <Heading as="h4" fontSize={{ base: "md", lg: "lg" }} fontWeight="medium">
        {children}
      </Heading>
    </AnimatedVStack>
  );
};
