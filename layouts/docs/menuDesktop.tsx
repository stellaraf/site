import { useRouter } from 'next/router';
import {
  Box,
  VStack,
  useToken,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from '@chakra-ui/core';
import { useColorValue } from 'site/context';
import { AnimatedFlex, Link } from 'site/components';

import type { IDocsGroup, IDocsArticle } from 'site/types';

const DMenuItem = (props: IDocsArticle) => {
  const { title, slug, docsGroup } = props;
  const { pathname } = useRouter();
  const isCurrent = pathname === slug;
  const bg = useColorValue('blackAlpha.200', 'whiteAlpha.200');
  let href = `/docs/${slug}`;
  if (typeof docsGroup !== 'undefined') {
    href = `/docs/${docsGroup.slug}/${slug}`;
  }
  return (
    <AnimatedFlex
      px={3}
      py={1}
      width="100%"
      align="center"
      borderRadius="md"
      userSelect="none"
      layoutId="menuItem"
      bg={isCurrent ? bg : undefined}>
      <Link
        href={href}
        width="100%"
        opacity={isCurrent ? 1 : 0.8}
        transition="all 0.2s ease 0s"
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

  return (
    <AccordionItem
      border="none"
      _last={{ borderBottomWidth: { base: 1, lg: 0 } }}
      borderBottomWidth={{ base: 1, lg: 0 }}
      borderTopWidth={{ base: 0 }}>
      <AccordionButton
        _hover={{ backgroundColor, borderRadius: 'lg' }}
        css={{ '&:focus': { borderRadius } }}>
        <Box flex={1} textAlign="left" fontSize="sm" fontWeight="medium" textTransform="uppercase">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <VStack align="flex-start" pl={4}>
          {items.map(item => (
            <DMenuItem key={item.title} {...item} />
          ))}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};
