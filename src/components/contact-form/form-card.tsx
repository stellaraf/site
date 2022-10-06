import { VStack } from "@chakra-ui/react";

import { useColorValue } from "~/context";
import { forwardRef } from "~/util";

import type { FormCardBodyProps } from "./types";
import type { StackProps } from "@chakra-ui/react";

export const FormCardBody = (props: FormCardBodyProps) => {
  const { spacing = 8, ...rest } = props;
  return <VStack zIndex={1} boxSize="100%" spacing={spacing} pos="relative" {...rest} />;
};

export const FormCard = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const styles = useColorValue(
    { bg: "white", boxShadow: "2xl" },
    {
      bg: "blackAlpha.400",
      css: { backdropFilter: "blur(2px)" },
    },
  );
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
      {...styles}
      {...props}
    />
  );
});
