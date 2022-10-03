import {
  Box,
  List,
  ListItem,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from '@chakra-ui/react';
import { Link } from '~/components';
import { useColorValue } from '~/context';

import type { IFooterLinks } from './types';

export const MobileLinks: React.FC<IFooterLinks> = (props: IFooterLinks) => {
  const { groups } = props;
  const linkColor = useColorValue('whiteAlpha.700', 'whiteAlpha.700');
  return (
    <Accordion allowToggle position="relative" zIndex={1}>
      {groups.map(({ title, items }) => {
        return (
          <AccordionItem
            key={title}
            borderTopWidth={0}
            borderBottomWidth={1}
            _last={{ borderBottomWidth: 1 }}
          >
            <AccordionButton my={4}>
              <Box w="100%" textAlign="left">
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <List>
                {items.map(item => (
                  <ListItem key={item.title} my={2} pl={2}>
                    <Link href={item.href} fontSize="sm" color={linkColor}>
                      {item.title}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
