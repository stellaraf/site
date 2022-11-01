import { forwardRef } from "react";

import { VStack } from "@chakra-ui/react";

import type { CardBodyProps } from "./types";

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>((props, ref) => {
  const { spacing = 8, ...rest } = props;
  return (
    <VStack
      ref={ref}
      zIndex={1}
      boxSize="100%"
      pos="relative"
      spacing={spacing}
      className="st-card-body"
      {...rest}
    />
  );
});

CardBody.displayName = "CardBody";
