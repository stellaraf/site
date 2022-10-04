import { VStack } from "@chakra-ui/react";
import { useColorValue } from "~/context";
import { forwardRef } from "~/util";

import type { ICard } from "./types";

export const Card = forwardRef<HTMLDivElement, ICard>((props, ref) => {
  const styles = useColorValue(
    { bg: "white", boxShadow: "2xl" },
    {
      bg: "blackAlpha.400",
      borderColor: "whiteAlpha.300",
      borderWidth: "1px",
      borderStyle: "solid",
      css: { backdropFilter: "blur(2px)" },
    },
  );
  return (
    <VStack
      p={8}
      w="md"
      h={props.minH ?? props.minHeight ?? props.height ?? props.h ?? "md"}
      ref={ref}
      zIndex={1}
      pos="relative"
      spacing={{ base: 8, lg: 0 }}
      borderRadius="lg"
      overflow="hidden"
      {...styles}
      {...props}
    />
  );
});
