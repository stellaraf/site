import { chakra } from "@chakra-ui/react";

import { useDate } from "~/hooks";

import type { BoxProps } from "@chakra-ui/react";

interface PublishedAtProps extends BoxProps {
  time: string;
}

export const PublishedAt = (props: PublishedAtProps) => {
  const { time, ...rest } = props;
  const value = useDate(time, { format: "MMMM DD, YYYY" });
  return (
    <chakra.span fontSize="md" my={1} opacity={0.5} {...rest}>
      {value}
    </chakra.span>
  );
};
