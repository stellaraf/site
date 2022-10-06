import { VStack } from "@chakra-ui/react";

import { forwardRef } from "~/util";

import type { CardBodyProps } from "./types";

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>((props, ref) => {
  const { spacing = 8, ...rest } = props;
  return <VStack ref={ref} zIndex={1} boxSize="100%" spacing={spacing} pos="relative" {...rest} />;
});
