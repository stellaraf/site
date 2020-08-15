import * as React from 'react';
import { forwardRef } from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useColorMode } from 'site/context';
import { Button } from 'site/components/Button';
import { usePageContent } from 'site/hooks/usePageContent';
import { _headerStyle } from 'site/state/atoms';
import { useVariantStyle } from 'site/styles';

import type { PageContent } from 'site/util/content';

type Ref = React.MutableRefObject<HTMLElement>;

interface SectionProps {
  items: PageContent;
  index: number;
  [k: string]: any;
}

export const ContentSection = forwardRef(({ items, index, ...props }: SectionProps, ref: Ref) => {
  const { colorMode } = useColorMode();
  const { title, subtitle, body, showButton, buttonText, buttonLink, subsections } = usePageContent(
    items,
  );
  const { buttonStyle, linkAccent, ...style } = useVariantStyle(index, colorMode);
  return (
    <Box ref={ref} as="section" p={24} overflow="hidden" {...style} {...props}>
      <Flex h="100%" overflow="hidden" px={24} alignItems="center" flexDir="column">
        {title}
        {subtitle}
        {body}
        {subsections}
        {showButton && (
          <Button href={buttonLink} leftIcon="chevron-right" {...buttonStyle}>
            {buttonText}
          </Button>
        )}
      </Flex>
    </Box>
  );
});
