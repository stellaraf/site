import { Accordion, chakra, Box, Flex, VStack, useBreakpointValue } from "@chakra-ui/react";

import { MSubNav } from "~/components";
import { useColorValue, useConfig } from "~/context";
import { useResponsiveStyle } from "~/hooks";

import type { BoxProps } from "@chakra-ui/react";
import { DMenuGroup } from "./menu-desktop";
import { MMenuGroup } from "./menu-mobile";

const LayoutContainer = chakra("div", {
  baseStyle: { w: "100%", minH: "40vh", pt: 32 },
});

const MLayout = (props: BoxProps) => {
  const { children, ...rest } = props;
  const { docsGroups } = useConfig();
  return (
    <LayoutContainer {...rest}>
      <MSubNav>
        <Accordion allowMultiple allowToggle>
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
  const borderColor = useColorValue("blackAlpha.200", "whiteAlpha.200");
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
      borderColor={borderColor}
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

  const largeLayout = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
    xl: true,
  });
  const rStyles = useResponsiveStyle();

  return (
    <>
      {largeLayout ? (
        <DLayout {...rStyles} {...rest}>
          {children}
        </DLayout>
      ) : (
        <MLayout {...rStyles} {...rest}>
          {children}
        </MLayout>
      )}
    </>
  );
};
