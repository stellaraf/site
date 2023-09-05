import { Box, chakra, IconButton, type IconButtonProps } from "@chakra-ui/react";

interface ToggleButtonProps extends IconButtonProps {
  isOpen: boolean;
}

const Bar = chakra("span", {
  baseStyle: {
    display: "block",
    pos: "absolute",
    w: "1.25rem",
    h: "0.125rem",
    rounded: "full",
    bg: "currentcolor",
    mx: "auto",
    insetStart: "0.125rem",
    transition: "all 0.12s",
  },
});

const ToggleIcon = (props: { active: boolean }) => (
  <Box
    as="span"
    w="1.5rem"
    h="1.5rem"
    aria-hidden
    pos="relative"
    color="inherit"
    display="block"
    className="group"
    pointerEvents="none"
    data-active={props.active ? "" : undefined}
  >
    <Bar top="0.4375rem" _groupActive={{ top: "0.6875rem", transform: "rotate(45deg)" }} />
    <Bar bottom="0.4375rem" _groupActive={{ bottom: "0.6875rem", transform: "rotate(-45deg)" }} />
  </Box>
);

export const MenuToggle = (props: ToggleButtonProps) => {
  const { isOpen, ...rest } = props;
  return (
    <IconButton
      size="xs"
      variant="unstyled"
      display="inline-flex"
      icon={<ToggleIcon active={isOpen} />}
      {...rest}
    />
  );
};
