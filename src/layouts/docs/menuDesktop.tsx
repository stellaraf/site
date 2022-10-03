import {
  Box,
  VStack,
  useToken,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from '@chakra-ui/react';
import { useColorValue } from '~/context';
import { AnimatedDiv, Link } from '~/components';
import { useDocsHref } from './useDocsHref';

import type { IDocsGroup, IDocsArticle } from '~/types';

const DMenuItem: React.FC<IDocsArticle> = (props: IDocsArticle) => {
  const { title } = props;
  const { href, isCurrent } = useDocsHref(props);

  const color = useColorValue('primary.500', 'secondary.200');

  return (
    <AnimatedDiv
      width="100%"
      borderRadius="md"
      userSelect="none"
      layoutId="menuItem"
      color={isCurrent ? color : 'currentColor'}
    >
      <Link
        px={3}
        py={1}
        href={href}
        width="100%"
        opacity={isCurrent ? 1 : 0.8}
        transition="all 0.2s ease 0s"
        _hover={{
          textDecoration: 'none',
          opacity: 1,
          transform: isCurrent ? undefined : 'translateX(2px)',
        }}
        css={{ '&:focus': { borderRadius: useToken('radii', 'lg') } }}
      >
        {title}
      </Link>
    </AnimatedDiv>
  );
};

export const DMenuGroup: React.FC<IDocsGroup> = (props: IDocsGroup) => {
  const { title, items } = props;

  const backgroundColor = useColorValue('blackAlpha.100', 'whiteAlpha.100');
  const borderRadius = useToken('radii', 'lg');

  const sorted = items.sort((a, b) => (a.title > b.title ? 1 : -1));

  return (
    <AccordionItem
      border="none"
      borderTopWidth={{ base: 0 }}
      borderBottomWidth={{ base: 1, lg: 0 }}
      _last={{ borderBottomWidth: { base: 1, lg: 0 } }}
    >
      <AccordionButton
        _hover={{ backgroundColor, borderRadius: 'lg' }}
        css={{ '&:focus': { borderRadius } }}
      >
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
