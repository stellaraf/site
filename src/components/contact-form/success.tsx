import { VStack, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { useColorValue } from "~/context";
import { CircleCheck } from "~/icons";

import type { StackProps } from "@chakra-ui/react";

const AnimatedVStack = motion(VStack);

export const Success = (props: StackProps): JSX.Element => {
  const { children } = props;
  const color = useColorValue("green.500", "green.300");
  return (
    <AnimatedVStack
      spacing={8}
      color={color}
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
