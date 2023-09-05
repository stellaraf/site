import { Box, chakra, IconButton, type IconButtonProps } from "@chakra-ui/react";

interface ToggleButtonProps extends IconButtonProps {
  isOpen: boolean;
}

const Bar = chakra("span", {
  baseStyle: {
    w: "2rem",
    mx: "auto",
    bg: "body-fg",
    h: "0.1875rem",
    pos: "absolute",
    rounded: "full",
    display: "block",
    insetStart: "0.125rem",
    transition: "all 0.12s",
  },
});

const ToggleIcon = (props: { active: boolean }) => (
  <Box
    as="span"
    w="3rem"
    h="3rem"
    aria-hidden
    pos="relative"
    color="inherit"
    display="block"
    className="group"
    pointerEvents="none"
    data-active={props.active ? "" : undefined}
  >
    <Bar top="1rem" _groupActive={{ top: "1.5rem", transform: "rotate(45deg)" }} />
    <Bar bottom="1rem" _groupActive={{ top: "1.5rem", transform: "rotate(-45deg)" }} />
  </Box>
);

export const MenuToggle = (props: ToggleButtonProps) => {
  const { isOpen, ...rest } = props;
  return <IconButton variant="unstyled" icon={<ToggleIcon active={isOpen} />} {...rest} />;
};
