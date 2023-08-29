import {
  Box,
  List,
  ListItem,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from "@chakra-ui/react";

import { Link, Status } from "~/components";
import { useColorValue } from "~/context";

import { useFooterLinks } from "./use-footer-links";

import type { FooterLinksProps } from "./types";

export const MobileLinks = (props: FooterLinksProps) => {
  const linkColor = useColorValue("whiteAlpha.700", "whiteAlpha.700");

  const rows = useFooterLinks(props.groups);
  const groups = rows.flat();

  return (
    <Accordion allowToggle position="relative" zIndex={1}>
      {groups.map((group, i) => {
        return (
          <AccordionItem
            key={i}
            borderTopWidth={0}
            borderBottomWidth={1}
            _last={{ borderBottomWidth: 1 }}
          >
            <AccordionButton my={4}>
              <Box w="100%" textAlign="left">
                {group.group}
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <List>
                {group.items.map(item => (
                  <ListItem key={item.title} my={2} pl={2}>
                    <Link
                      fontSize="sm"
                      color={linkColor}
                      borderBottom="none"
                      href={item.external ? item.slug : `/${item.slug}`}
                      showIcon={item.external && item.showIcon}
                    >
                      {item.footerTitle ? item.footerTitle : item.title}
                    </Link>
                  </ListItem>
                ))}
                {group.group === "Cloud" && (
                  <ListItem my={2} pl={2}>
                    <Status fontSize="sm" color={linkColor} borderBottom="none" />
                  </ListItem>
                )}
              </List>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
