import { Flex, HStack, VStack, useDisclosure, useColorMode } from "@chakra-ui/react";
import { StellarLogo } from "@stellaraf/logo";
import { Spiral as Hamburger } from "hamburger-react";

import { Button, Controls, Modal } from "~/components";

import navConfig from "./config";
import { NavLink } from "./mobile-links";
import { Wrapper } from "./mobile-wrapper";

import type { FlexProps } from "@chakra-ui/react";
import type { ButtonProps } from "~/components";

const HEADING_HEIGHT = 56;

const LoginButton = (props: ButtonProps) => (
  <Button
    mr={8}
    w="100%"
    href="https://launch.stellar.tech"
    target="_blank"
    variant="outline"
    borderWidth="1px"
    colorScheme="primary"
    {...props}
  >
    Log In
  </Button>
);

export const MHeader = (props: FlexProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      <Wrapper isOpen={isOpen} onToggle={onToggle} navHeaderHeight={HEADING_HEIGHT} {...props}>
        <Hamburger
          rounded
          toggled={isOpen}
          toggle={onToggle}
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
            {navConfig.map(i => (
              <NavLink key={i.title} href={i.link} title={i.title} onClick={onClose} />
            ))}
            <NavLink href="/blog" title="Blog" onClick={onClose} />
          </VStack>
        }
        footer={
          <HStack w="100%" justify="flex-start">
            <LoginButton />
            <Controls.Mobile />
          </HStack>
        }
      />
    </>
  );
};
