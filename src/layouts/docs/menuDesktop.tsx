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
import { Link } from '~/components';
import { useDocsHref } from './useDocsHref';

import type { IDocsGroup, IDocsArticle } from '~/types';

function menuItemKey(item: IDocsArticle): string {
  let result = '';
  const groupTitle = item.docsGroup?.fields.title.toLowerCase().split(' ').join('-');
  if (groupTitle !== '') result += groupTitle + '--';
  const title = item.title.toLowerCase().split(' ').join('-');
  result += title;
  return result;
}

const DMenuItem = (props: IDocsArticle): JSX.Element => {
  const { title } = props;
  const { href, isCurrent } = useDocsHref(props);

  const color = useColorValue('primary.500', 'secondary.200');
  const bg = useColorValue('blackAlpha.100', 'whiteAlpha.100');

  return (
    <Box
      py={2}
      width="100%"
      userSelect="none"
      borderRadius="lg"
      bg={isCurrent ? bg : 'inherit'}
      color={isCurrent ? color : 'currentColor'}
      transition="all 0.2s ease 0s"
      _hover={{
        color,
        transform: isCurrent ? undefined : 'translateX(2px)',
      }}
    >
      <Link
        px={3}
        py={1}
        href={href}
        width="100%"
        opacity={isCurrent ? 1 : 0.7}
        fontWeight={isCurrent ? 'semibold' : 'inherit'}
        textDecoration="none"
        _hover={{
          textDecoration: 'none',
        }}
      >
        {title}
      </Link>
    </Box>
  );
};

export const DMenuGroup = (props: IDocsGroup): JSX.Element => {
  const { title, items } = props;

  const backgroundColor = useColorValue('blackAlpha.100', 'whiteAlpha.100');
  const borderRadius = useToken('radii', 'lg');

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
          {items.map(item => (
            <DMenuItem key={menuItemKey(item)} {...item} />
          ))}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};
