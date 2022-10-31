import {
  Box,
  List,
  ListItem,
  Divider,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from "@chakra-ui/react";

import { Link } from "~/components";
import { useColorValue } from "~/context";

import { useDocsHref } from "./use-docs-href";

import type { DocsGroup, DocsPage } from "~/queries";

const MMenuItem = (props: Omit<DocsPage, "body">) => {
  const { title } = props;
  const { href, isCurrent } = useDocsHref(props);

  const color = useColorValue("primary.500", "secondary.200");

  return (
    <ListItem my={2} pl={4} color={isCurrent ? color : undefined}>
      <Link href={href} width="100%" fontSize="sm" opacity={isCurrent ? 1 : 0.8}>
        {title}
      </Link>
    </ListItem>
  );
};

export const MMenuGroup = (props: DocsGroup) => {
  const { title, docsPages } = props;

  const borderColor = useColorValue("blackAlpha.300", "whiteAlpha.300");

  return (
    <>
      <AccordionItem border="none">
        <AccordionButton my={4}>
          <Box
            w="100%"
            textAlign="left"
            textTransform="uppercase"
            fontSize="md"
            fontWeight="medium"
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
      <Divider mx="auto" w="90%" bg={borderColor} />
    </>
  );
};
