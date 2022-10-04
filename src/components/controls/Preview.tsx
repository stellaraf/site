import NextLink from "next/link";
import { Button } from "@chakra-ui/react";

export const Preview: React.FC = () => {
  return (
    <NextLink href="/api/preview/reset">
      <Button
        left={0}
        bottom={0}
        pos="fixed"
        zIndex={10}
        width="100%"
        fontSize="sm"
        height="1.6vh"
        borderRadius={0}
        userSelect="none"
        colorScheme="primary"
      >
        Exit Preview Mode
      </Button>
    </NextLink>
  );
};
