import {
  Box,
  useToken,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  AccordionButton,
} from '@chakra-ui/react';
import { useColorValue } from '~/context';
import { useRender } from '~/hooks';

import type { TExpandable } from 'site/types';

export const Expandable: React.FC<TExpandable> = (props: TExpandable) => {
  const { title, body, useDefaultTitle } = props;
  const renderedBody = useRender(body);
  const hoverBorder = useColorValue('blackAlpha.400', 'whiteAlpha.400');
  return (
    <Accordion allowToggle>
      <AccordionItem
        _hover={{ borderColor: hoverBorder }}
        transition="border-color 0.2s ease"
        maxW={{ lg: '60%' }}
      >
        <AccordionButton mx={1} css={{ '&:focus': { borderRadius: useToken('radii', 'md') } }}>
          <Box flex={1} textAlign="left">
            {useDefaultTitle ? 'Expand...' : title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>{renderedBody}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
