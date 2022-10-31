import { Box } from "@chakra-ui/react";

import { useColorValue } from "~/context";

import type { TdProps } from "./types";
import type { BoxProps } from "@chakra-ui/react";

export const Td = (props: TdProps) => {
  const { isHeader = false, children, ...rest } = props;
  const border = useColorValue("gray.100", "whiteAlpha.100");
  return (
    <Box
      p={2}
      fontSize="sm"
      whiteSpace="normal"
      borderTopWidth="1px"
      borderColor={border}
      as={isHeader ? "th" : "td"}
      sx={{ "& div.st-content-p": { m: 0 } }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export const Th = (props: BoxProps) => {
  const bg = useColorValue("blackAlpha.100", "whiteAlpha.100");
  return (
    <Box
      as="th"
      bg={bg}
      fontWeight="bold"
      p={2}
      fontSize="sm"
      sx={{ "& div.st-content-p,& div.st-content-p:first-of-type": { m: 0 } }}
      {...props}
    />
  );
};

export const Table = (props: BoxProps) => {
  const border = useColorValue("gray.100", "whiteAlpha.100");
  return (
    <Box overflowX="auto" width={{ base: "100%", lg: "fit-content" }}>
      <Box
        mt={4}
        zIndex={1}
        minWidth="50%"
        borderWidth="1px"
        borderRadius="lg"
        borderColor={border}
        width="100%"
      >
        <Box as="table" textAlign="left" width="100%" {...props} />
      </Box>
    </Box>
  );
};
