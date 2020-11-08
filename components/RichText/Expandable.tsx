import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToken,
} from '@chakra-ui/core';
import { useColorValue } from 'site/context';
import { useRender } from 'site/hooks';

import type { TExpandable } from 'site/types';

export const Expandable = (props: TExpandable) => {
  const { title, body, useDefaultTitle } = props;
  const renderedBody = useRender(body);
  const hoverBorder = useColorValue('blackAlpha.400', 'whiteAlpha.400');
  return (
    <Accordion allowToggle>
      <AccordionItem
        _hover={{ borderColor: hoverBorder }}
        transition="border-color 0.2s ease"
        maxW={{ lg: '60%' }}>
        <AccordionButton css={{ '&:focus': { borderRadius: useToken('radii', 'md') } }}>
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
