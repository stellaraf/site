import * as React from 'react';
import { forwardRef } from 'react';
import { Box, Flex, useMultiStyleConfig } from '@chakra-ui/core';
import BsChevronRight from '@meronex/icons/bs/BsChevronRight';
import { Button } from 'site/components/Button';
import { usePageContent } from 'site/hooks/usePageContent';

import type { PageContent } from 'site/util/content';

type Ref = React.MutableRefObject<HTMLElement>;

interface SectionProps {
  items: PageContent;
  index: number;
  [k: string]: any;
}

export const ContentSection = forwardRef(({ items, index, ...props }: SectionProps, ref: Ref) => {
  const { title, subtitle, body, showButton, buttonText, buttonLink, subsections } = usePageContent(
    items,
  );
  const styles = useMultiStyleConfig('SyncedStyles', { variant: index });

  return (
    <Box ref={ref} as="section" p={24} overflow="hidden" sx={styles.box} {...props}>
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
