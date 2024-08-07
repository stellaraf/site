import { forwardRef } from "react";

import { VStack } from "@chakra-ui/react";

import type { StackProps } from "@chakra-ui/react";
import type { FormCardBodyProps } from "./types";

export const FormCardBody = (props: FormCardBodyProps) => {
  const { spacing = 8, ...rest } = props;
  return <VStack zIndex={1} boxSize="100%" spacing={spacing} pos="relative" {...rest} />;
};

export const FormCard = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  return (
    <VStack
      p={8}
      w="md"
      ref={ref}
      zIndex={1}
      pos="relative"
      borderRadius="lg"
      overflow="hidden"
      spacing={{ base: 8, lg: 0 }}
      h={props.minH ?? props.minHeight ?? props.height ?? props.h ?? "md"}
      bg="white"
      _light={{ boxShadow: "2xl" }}
      _dark={{ bg: "blackAlpha.400", backdropFilter: "blur(2px)" }}
      {...props}
    />
  );
});

FormCard.displayName = "FormCard";
