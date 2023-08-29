import {
  Box,
  VStack,
  useToken,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  useColorModeValue,
} from "@chakra-ui/react";

import { Link } from "~/components";

import { useDocsHref } from "./use-docs-href";

import type { DocsGroup, DocsPage } from "~/queries";

const DMenuItem = (props: Omit<DocsPage, "body">) => {
  const { title } = props;
  const { href, isCurrent } = useDocsHref(props);

  const color = useColorModeValue("primary.500", "secondary.200");
  const bg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");

  return (
    <Box
      py={2}
      width="100%"
      userSelect="none"
      borderRadius="lg"
      bg={isCurrent ? bg : "inherit"}
      color={isCurrent ? color : "currentColor"}
      transition="all 0.2s ease 0s"
      _hover={{
        color,
        transform: isCurrent ? undefined : "translateX(2px)",
      }}
    >
      <Link
        px={3}
        py={1}
        href={href}
        width="100%"
        opacity={isCurrent ? 1 : 0.7}
        fontWeight={isCurrent ? "semibold" : "inherit"}
        textDecoration="none"
        _hover={{
          textDecoration: "none",
        }}
      >
        {title}
      </Link>
    </Box>
  );
};

export const DMenuGroup = (props: DocsGroup) => {
  const { title, docsPages } = props;

  const borderRadius = useToken("radii", "lg");

  return (
    <AccordionItem
      border="none"
      borderTopWidth={{ base: 0 }}
      borderBottomWidth={{ base: 1, lg: 0 }}
      _last={{ borderBottomWidth: { base: 1, lg: 0 } }}
    >
      <AccordionButton
        _hover={{
          backgroundColor: "blackAlpha.100",
          borderRadius: "lg",
          _dark: { backgroundColor: "whiteAlpha.100" },
        }}
        css={{ "&:focus": { borderRadius } }}
      >
        <Box flex={1} textAlign="left" fontSize="sm" fontWeight="medium" textTransform="uppercase">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} px={0}>
        <VStack align="flex-start" pl={4}>
          {docsPages.map(page => (
            <DMenuItem key={page.title} {...page} />
          ))}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};
