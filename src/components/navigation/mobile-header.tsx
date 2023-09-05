import { useDisclosure } from "@chakra-ui/react";

import { MobileDrawer } from "./mobile-drawer";
import { Wrapper } from "./mobile-wrapper";

import type { HeaderProps } from "./types";

export const MHeader = (props: HeaderProps) => {
  const { menus, ...rest } = props;
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Wrapper isOpen={isOpen} onToggle={onToggle} navHeaderHeight={56} {...rest}>
      <MobileDrawer isOpen={isOpen} onToggle={onToggle} onClose={onClose} menus={menus} />
    </Wrapper>
  );
};
