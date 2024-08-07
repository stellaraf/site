import { IconButton, type IconButtonProps, useColorMode } from "@chakra-ui/react";

import { Moon, Sun } from "~/icons";

export const MControls = (props: Omit<IconButtonProps, "aria-label">) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const colorModeLabel = `Switch to ${colorMode === "dark" ? "Light" : "Dark"} Mode`;

  return (
    <IconButton
      px={3}
      py={1}
      lineHeight={1.5}
      borderRadius="lg"
      variant="outline"
      colorScheme="primary"
      title={colorModeLabel}
      onClick={toggleColorMode}
      aria-label={colorModeLabel}
      icon={colorMode === "dark" ? <Sun /> : <Moon />}
      {...props}
    />
  );
};
