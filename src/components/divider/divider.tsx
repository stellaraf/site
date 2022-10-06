import { useMemo } from "react";
import { Box, useToken } from "@chakra-ui/react";

import type { DividerProps } from "./types";

export const Divider = (props: DividerProps) => {
  const { left = true, right = false, straight = false, ...rest } = props;

  const transform = useMemo<{ transform: string | undefined }>(() => {
    if (!straight && right) {
      return { transform: "rotate(3deg)" };
    } else if (!straight && left) {
      return { transform: "rotate(-3deg)" };
    }
    return { transform: undefined };
  }, [straight, right, left]);

  const one = useToken("colors", "tertiary.600");
  const two = useToken("colors", "tertiary.700");
  const three = useToken("colors", "tertiary.800");

  return (
    <Box
      pos="relative"
      height="1px"
      opacity={0.9}
      width="150%"
      overflow="hidden"
      bg="tertiary.500"
      {...transform}
      boxShadow={`0 0 10px 1px ${one}, 0 0 20px 2px ${two}, 0 0 30px 4px ${three}`}
      {...rest}
    />
  );
};
