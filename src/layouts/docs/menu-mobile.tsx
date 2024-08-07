import { useMemo } from "react";

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  List,
  ListItem,
  type ListItemProps,
} from "@chakra-ui/react";

import { Link, useMobileSubNav } from "~/components";

import { useDocsHref } from "./use-docs-href";

import type { DocsGroup, DocsPage } from "~/queries";

const MMenuItem = (props: Omit<DocsPage, "body">) => {
  const { title } = props;
  const { href, isCurrent } = useDocsHref(props);
  const subNav = useMobileSubNav();

  if (subNav === null) {
    throw new Error("Cannot use MobileSubNavContext outside of provider");
  }

  const color = useMemo<ListItemProps | undefined>(
    () => (isCurrent ? { color: "primary.500", _dark: { color: "secondary.200" } } : undefined),
    [isCurrent],
  );

  return (
    <ListItem my={2} pl={4} {...color}>
      <Link
        href={href}
        width="100%"
        fontSize="sm"
        onClick={subNav.onClose}
        opacity={isCurrent ? 1 : 0.8}
        borderBottom="none"
      >
        {title}
      </Link>
    </ListItem>
  );
};

export const MMenuGroup = (props: DocsGroup) => {
  const { title, docsPages } = props;

  return (
    <>
      <AccordionItem border="none">
        <AccordionButton my={4}>
          <Box
            w="100%"
            fontSize="md"
            textAlign="left"
            fontWeight="medium"
            textTransform="uppercase"
          >
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <List>
            {docsPages.map(page => (
              <MMenuItem key={page.title} {...page} />
            ))}
          </List>
        </AccordionPanel>
      </AccordionItem>
      <Divider mx="auto" w="90%" bg="blackAlpha.300" _dark={{ color: "whiteAlpha.300" }} />
    </>
  );
};
