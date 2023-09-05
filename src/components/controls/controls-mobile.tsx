import { HStack, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";

import { Sun, Moon } from "~/icons";

import type { StackProps } from "@chakra-ui/react";

export const MControls = (props: StackProps) => {
  const { toggleColorMode } = useColorMode();
  const switchTo = useColorModeValue("Dark", "Light");
  const colorModeLabel = `Switch to ${switchTo} Mode`;

  return (
    <HStack {...props}>
      <Button
        py={2}
        minW="unset"
        height="unset"
        variant="unstyled"
        title={colorModeLabel}
        onClick={toggleColorMode}
        aria-label={colorModeLabel}
      >
        <>
          <Moon boxSize={8} _dark={{ display: "none" }} />
          <Sun boxSize={8} _light={{ display: "none" }} />
        </>
      </Button>
    </HStack>
  );
};
