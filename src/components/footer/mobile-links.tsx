import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";

import { Link, Status } from "~/components";

import type { MobileFooterLinksProps } from "./types";

export const MobileLinks = (props: MobileFooterLinksProps) => {
  const { groups, ...rest } = props;
  const flat = groups.flat();

  return (
    <Accordion allowToggle position="relative" zIndex={1} {...rest}>
      {flat.map((group, i) => {
        return (
          <AccordionItem
            key={i}
            borderTopWidth={0}
            borderBottomWidth={1}
            _last={{ borderBottomWidth: 0 }}
            _light={{ borderColor: "whiteAlpha.300" }}
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
                      color="whiteAlpha.700"
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
                    <Status fontSize="sm" color="whiteAlpha.700" borderBottom="none" />
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
