import { forwardRef } from "react";

import { VStack } from "@chakra-ui/react";

import type { CardProps } from "./types";

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => (
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
    className="st-card"
    bg="white"
    _light={{ boxShadow: "2xl" }}
    _dark={{
      bg: "blackAlpha.400",
      borderColor: "whiteAlpha.300",
      borderWidth: "1px",
      borderStyle: "solid",
      backdropFilter: "blur(2px)",
    }}
    {...props}
  />
));

Card.displayName = "Card";
