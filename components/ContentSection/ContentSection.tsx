import * as React from 'react';
import { forwardRef } from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { BsChevronRight } from '@meronex/icons/bs';
import { Button, SectionDivider } from 'site/components';
import { usePageContent } from 'site/hooks';
import { useColorValue } from 'site/context';
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
    showUpdatedDate,
    updatedAt,
  } = usePageContent(items, [items.title]);
  const rStyles = useResponsiveStyle();
  const showBorder = useColorValue(false, true);
  return (
    <>
      <Box ref={ref} as="section" py={24} overflow="hidden" {...rest}>
        <Flex height="100%" overflow="hidden" align="center" direction="column" {...rStyles}>
          {title}
          {subtitle}
          {body}
          {subsections}
          {showButton && (
            <Button my={8} href={buttonLink} leftIcon={<BsChevronRight />}>
              {buttonText}
            </Button>
          )}
          {showUpdatedDate && updatedAt}
        </Flex>
      </Box>
      {showBorder && <SectionDivider />}
    </>
  );
});
