import * as React from 'react';
import { forwardRef } from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { BsChevronRight } from '@meronex/icons/bs';
import { Button } from 'site/components/Button';
import { usePageContent } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { ContentSectionProps } from './types';

export const ContentSection = forwardRef<HTMLElement, ContentSectionProps>((props, ref) => {
  const { items, index, ...rest } = props;
  const {
    title,
    subtitle,
    body,
    showButton,
    buttonText,
    buttonLink,
    subsections,
  } = usePageContent(items, [items.title]);
  const rStyles = useResponsiveStyle();
  return (
    <Box ref={ref} as="section" py={24} overflow="hidden" {...rest}>
      <Flex height="100%" overflow="hidden" align="center" direction="column" {...rStyles}>
        {title}
        {subtitle}
        {body}
        {subsections}
        {showButton && (
          <Button href={buttonLink} leftIcon={<BsChevronRight />}>
            {buttonText}
          </Button>
        )}
      </Flex>
    </Box>
  );
});
