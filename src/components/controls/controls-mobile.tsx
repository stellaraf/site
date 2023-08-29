import { HStack, Button } from "@chakra-ui/react";

import { useColorMode, useColorValue } from "~/context";
import { Sun, Moon } from "~/icons";

import type { StackProps } from "@chakra-ui/react";

export const MControls = (props: StackProps) => {
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorValue(<Moon boxSize={10} />, <Sun boxSize={10} />);
  const switchTo = useColorValue("Dark", "Light");
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
        {colorModeIcon}
      </Button>
    </HStack>
  );
};
