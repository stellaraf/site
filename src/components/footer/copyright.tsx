import { useEffect, useState } from "react";

import { Box, Tooltip, useColorModeValue } from "@chakra-ui/react";

import { useConfig } from "~/context";
import { useOpposingColor } from "~/hooks";

import type { BoxProps } from "@chakra-ui/react";

export const Copyright = (props: BoxProps) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const { organizationName } = useConfig();
  const version = process.env.SITE_VERSION as string;

  const bg = useColorModeValue("tertiary.500", "secondary.300");
  const color = useOpposingColor(bg);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <Tooltip hasArrow placement="bottom" bg={bg} color={color} label={`Version ${version}`}>
      <Box
        mt={8}
        zIndex={1}
        fontSize="sm"
        color="whiteAlpha.700"
        {...props}
      >{`Copyright © ${year} ${organizationName}`}</Box>
    </Tooltip>
  );
};
