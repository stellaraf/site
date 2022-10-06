import { Box, Tooltip } from "@chakra-ui/react";

import { useConfig, useColorValue } from "~/context";
import { useOpposingColor } from "~/hooks";

import type { BoxProps } from "@chakra-ui/react";

export const Copyright = (props: BoxProps) => {
  const { orgName } = useConfig();
  const version = process.env.SITE_VERSION as string;

  const bg = useColorValue("tertiary.500", "secondary.300");
  const color = useOpposingColor(bg);

  return (
    <Tooltip hasArrow placement="bottom" bg={bg} color={color} label={`Version ${version}`}>
      <Box
        mt={8}
        zIndex={1}
        fontSize="sm"
        color="whiteAlpha.700"
        {...props}
      >{`Copyright © ${new Date().getFullYear()} ${orgName}`}</Box>
    </Tooltip>
  );
};
