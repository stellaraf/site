import { Flex, HStack, VStack, useDisclosure } from "@chakra-ui/react";
import { StellarLogo } from "@stellaraf/logo";
import { Spiral as Hamburger } from "hamburger-react";

import { Button, DynamicIcon, Controls, Modal } from "~/components";
import { useColorMode } from "~/context";

import navConfig from "./config";
import { NavLink } from "./mobile-links";
import { Wrapper } from "./mobile-wrapper";

import type { FlexProps } from "@chakra-ui/react";
import type { ButtonProps } from "~/components";

const HEADING_HEIGHT = 56;

const ContactButton = (props: ButtonProps) => (
  <Button
    mr={8}
    w="100%"
    href="/contact"
    variant="outline"
    borderWidth="1px"
    colorScheme="primary"
    leftIcon={<DynamicIcon icon={{ fa: "FaHeart" }} />}
    {...props}
  >
    Talk to Us
  </Button>
);

export const MHeader = (props: FlexProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const navItems = [...navConfig.left, ...navConfig.right];

  return (
    <>
      <Wrapper isOpen={isOpen} onToggle={onToggle} navHeaderHeight={HEADING_HEIGHT} {...props}>
        <Hamburger
          toggled={isOpen}
          toggle={onToggle}
          rounded
          size={isOpen ? HEADING_HEIGHT : undefined}
        />
      </Wrapper>
      <Modal
        noOverlay
        size="full"
        scrollInside
        isOpen={isOpen}
        hideCloseButton
        onClose={onClose}
        isCentered={false}
        footerProps={{ mb: 4 }}
        containerProps={{ m: 2, width: "96vw", minH: "98vh" }}
        header={
          <Flex align="center" justify="space-between">
            <StellarLogo
              noAnimate
              width="auto"
              colorMode={colorMode}
              height={HEADING_HEIGHT}
              style={{ marginBlock: "0.5rem" }}
            />
            {isOpen && (
              <Hamburger
                toggled={isOpen}
                toggle={onToggle}
                rounded
                size={isOpen ? HEADING_HEIGHT : undefined}
              />
            )}
          </Flex>
        }
        body={
          <VStack align="flex-start" spacing={6}>
            {navItems.map(i => (
              <NavLink href={i.link} title={i.title} key={i.title} onClick={onClose} />
            ))}
          </VStack>
        }
        footer={
          <HStack w="100%" justify="flex-start">
            <ContactButton />
            <Controls.Mobile />
          </HStack>
        }
      />
    </>
  );
};
