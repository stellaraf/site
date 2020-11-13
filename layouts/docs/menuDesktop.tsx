import { useRouter } from 'next/router';
import {
  Box,
  VStack,
  useToken,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from '@chakra-ui/react';
import { useColorValue } from 'site/context';
import { AnimatedFlex, Link } from 'site/components';

import type { IDocsGroup, IDocsArticle } from 'site/types';

const DMenuItem = (props: IDocsArticle) => {
  const { title, slug, docsGroup } = props;

  const { asPath } = useRouter();
  const thisSlug = asPath.split('/').slice(-1)[0];
  const isCurrent = thisSlug === slug;

  let href = `/docs/${slug}`;
  if (typeof docsGroup !== 'undefined') {
    href = `/docs/${docsGroup.slug}/${slug}`;
  }

  const color = useColorValue('original.primary', 'secondary.200');

  return (
    <AnimatedFlex
      width="100%"
      align="center"
      borderRadius="md"
      userSelect="none"
      layoutId="menuItem"
      color={isCurrent ? color : 'currentColor'}>
      <Link
        px={3}
        py={1}
        href={href}
        width="100%"
        opacity={isCurrent ? 1 : 0.8}
        transition="all 0.2s ease 0s"
        css={{ '&:focus': { borderRadius: useToken('radii', 'lg') } }}
        _hover={{
          textDecoration: 'none',
          opacity: 1,
          transform: isCurrent ? undefined : 'translateX(2px)',
        }}>
        {title}
      </Link>
    </AnimatedFlex>
  );
};

export const DMenuGroup = (props: IDocsGroup) => {
  const { title, items } = props;

  const backgroundColor = useColorValue('blackAlpha.100', 'whiteAlpha.100');
  const borderRadius = useToken('radii', 'lg');

  const sorted = items.sort((a, b) => (a.title > b.title ? 1 : -1));

  return (
    <AccordionItem
      border="none"
      borderTopWidth={{ base: 0 }}
      borderBottomWidth={{ base: 1, lg: 0 }}
      _last={{ borderBottomWidth: { base: 1, lg: 0 } }}>
      <AccordionButton
        _hover={{ backgroundColor, borderRadius: 'lg' }}
        css={{ '&:focus': { borderRadius } }}>
        <Box flex={1} textAlign="left" fontSize="sm" fontWeight="medium" textTransform="uppercase">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} px={0}>
        <VStack align="flex-start" pl={4}>
          {sorted.map(item => (
            <DMenuItem key={item.title} {...item} />
          ))}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};
