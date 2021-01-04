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
} from '@chakra-ui/react';
import { useColorValue } from '~/context';
import { Link } from '~/components';

import type { IDocsGroup, IDocsArticle } from '~/types';

const MMenuItem: React.FC<IDocsArticle> = (props: IDocsArticle) => {
  const { title, slug, docsGroup } = props;

  const { asPath } = useRouter();
  const thisSlug = asPath.split('/').slice(-1)[0];
  const isCurrent = thisSlug === slug;

  let href = `/docs/${slug}`;
  if (typeof docsGroup !== 'undefined') {
    href = `/docs/${docsGroup.slug}/${slug}`;
  }

  const color = useColorValue('primary.500', 'secondary.200');

  return (
    <ListItem my={2} pl={4} color={isCurrent ? color : undefined}>
      <Link href={href} width="100%" fontSize="sm" opacity={isCurrent ? 1 : 0.8}>
        {title}
      </Link>
    </ListItem>
  );
};

export const MMenuGroup: React.FC<IDocsGroup> = (props: IDocsGroup) => {
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
            fontSize="md"
            fontWeight="medium"
          >
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
