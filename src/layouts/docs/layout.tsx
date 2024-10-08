import { Accordion, Box, Flex, VStack, chakra } from "@chakra-ui/react";

import { MSubNav } from "~/components";
import { useConfig } from "~/context";

import { DMenuGroup } from "./menu-desktop";
import { MMenuGroup } from "./menu-mobile";

import type { BoxProps } from "@chakra-ui/react";

const LayoutContainer = chakra("div", {
  baseStyle: { w: "100%", minH: "40vh", pt: 32, layerStyle: "container" },
});

const MLayout = (props: BoxProps) => {
  const { children, ...rest } = props;
  const { docsGroups } = useConfig();
  return (
    <LayoutContainer {...rest}>
      <MSubNav>
        <Accordion allowMultiple>
          {docsGroups.map(group => (
            <MMenuGroup key={group.title} {...group} />
          ))}
        </Accordion>
      </MSubNav>
      {children}
    </LayoutContainer>
  );
};

const DLayout = (props: BoxProps) => {
  const { children, ...rest } = props;

  return (
    <LayoutContainer {...rest}>
      <Flex flexWrap="nowrap" pos="relative">
        <DNav />
        <Box w="100%">
          <VStack spacing={20} my={{ lg: 16 }} px={{ lg: 4, xl: 16 }}>
            {children}
          </VStack>
        </Box>
      </Flex>
    </LayoutContainer>
  );
};

const DNav = () => {
  const { docsGroups } = useConfig();
  return (
    <Flex
      p={4}
      top={0}
      as="aside"
      zIndex={1}
      height="100%"
      flexShrink={0}
      minHeight="80vh"
      flexDir="column"
      position="sticky"
      borderRightWidth="1px"
      borderColor="blackAlpha.200"
      _dark={{ borderColor: "whiteAlpha.200" }}
      width={{ lg: "260px", xl: "300px" }}
    >
      <Accordion allowMultiple defaultIndex={[...Array(docsGroups.length).keys()]}>
        {docsGroups.map(group => (
          <DMenuGroup key={group.title} {...group} />
        ))}
      </Accordion>
    </Flex>
  );
};

export const DocsLayout = (props: BoxProps) => {
  const { children, ...rest } = props;

  return (
    <>
      <DLayout display={{ base: "none", lg: "block" }} {...rest}>
        {children}
      </DLayout>
      <MLayout display={{ lg: "none" }} {...rest}>
        {children}
      </MLayout>
    </>
  );
};
