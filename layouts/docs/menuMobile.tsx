import { useRouter } from 'next/router';
import {
  Box,
  List,
  ListItem,
  Divider,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from '@chakra-ui/core';
import { useColorValue } from 'site/context';
import { Link } from 'site/components';

import type { IDocsGroup, IDocsArticle } from 'site/types';

const MMenuItem = (props: IDocsArticle) => {
  const { title, slug, docsGroup } = props;

  const bg = useColorValue('blackAlpha.200', 'whiteAlpha.200');

  const { pathname } = useRouter();
  const isCurrent = pathname === slug;

  let href = `/docs/${slug}`;
  if (typeof docsGroup !== 'undefined') {
    href = `/docs/${docsGroup.slug}/${slug}`;
  }

  return (
    <ListItem my={2} pl={4} bg={isCurrent ? bg : undefined}>
      <Link href={href} width="100%" fontSize="xs" opacity={isCurrent ? 1 : 0.8}>
        {title}
      </Link>
    </ListItem>
  );
};

export const MMenuGroup = (props: IDocsGroup) => {
  const { title, items } = props;
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  return (
    <>
      <AccordionItem border="none">
        <AccordionButton my={4}>
          <Box
            w="100%"
            textAlign="left"
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="medium">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <List>
            {items.map(item => (
              <MMenuItem key={item.title} {...item} />
            ))}
          </List>
        </AccordionPanel>
      </AccordionItem>
      <Divider mx="auto" w="90%" bg={borderColor} />
    </>
  );
};
