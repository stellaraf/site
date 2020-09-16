import * as React from 'react';
import { forwardRef } from 'react';
import { Box, Flex, useMultiStyleConfig } from '@chakra-ui/core';
import BsChevronRight from '@meronex/icons/bs/BsChevronRight';
import { Button } from 'site/components/Button';
import { usePageContent } from 'site/hooks/usePageContent';

import type { ContentSectionProps } from './types';

export const ContentSection = forwardRef<HTMLDivElement, ContentSectionProps>((props, ref) => {
  const { items, index, ...rest } = props;
  const { title, subtitle, body, showButton, buttonText, buttonLink, subsections } = usePageContent(
    items,
  );
  const styles = useMultiStyleConfig('SyncedStyles', { variant: index });

  return (
    <Box ref={ref} as="section" p={24} overflow="hidden" sx={styles.box} {...rest}>
      <Flex height="100%" overflow="hidden" px={24} align="center" direction="column">
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
