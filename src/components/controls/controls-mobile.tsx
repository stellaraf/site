import { HStack, Button } from "@chakra-ui/react";

import { DynamicIcon } from "~/components";
import { useColorMode, useColorValue } from "~/context";

import type { StackProps } from "@chakra-ui/react";

export const MControls = (props: StackProps) => {
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorValue({ bs: "BsMoon" }, { md: "MdWbSunny" });
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
        <DynamicIcon icon={colorModeIcon} boxSize={10} />
      </Button>
    </HStack>
  );
};
