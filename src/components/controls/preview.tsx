import NextLink from "next/link";

import { Button } from "@chakra-ui/react";

export const Preview = () => (
  <Button
    left={0}
    bottom={0}
    pos="fixed"
    zIndex={10}
    width="100%"
    as={NextLink}
    fontSize="sm"
    height="1.6vh"
    borderRadius={0}
    userSelect="none"
    colorScheme="primary"
    href="/api/preview/reset"
  >
    Exit Preview Mode
  </Button>
);
