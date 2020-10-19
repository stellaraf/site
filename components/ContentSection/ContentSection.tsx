import * as React from 'react';
import { forwardRef, useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { BsChevronRight } from '@meronex/icons/bs';
import { Button, SectionDivider } from 'site/components';
import { usePageContent, useMobile } from 'site/hooks';
import { useColorValue } from 'site/context';
import { useResponsiveStyle } from 'site/styles';

import type { ContentSectionProps, TSides, TSideValues } from './types';

function _hasImage(image: React.FC | null) {
  return image !== null;
}

function getSide(idx: number): TSideValues {
  const sides: TSides = ['right', 'left'];
  return sides[idx % 2];
}

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
    image,
  } = usePageContent(items, [items.title]);
  const isMobile = useMobile();
  const rStyles = useResponsiveStyle();
  const showBorder = useColorValue(false, true);
  const hasImage = useMemo(() => image !== null && !isMobile, [items.title]);
  const titleBlock = (
    <Flex
      key="title"
      mr={hasImage ? 16 : undefined}
      direction="column"
      align={hasImage ? 'flex-start' : 'center'}>
      {title}
      {subtitle}
    </Flex>
  );
  let layout = [titleBlock, image];
  if (isMobile) {
    layout = [titleBlock];
  } else {
    if (getSide(index) === 'right') {
      layout = [image, titleBlock];
    }
  }
  return (
    <>
      <Box ref={ref} as="section" py={24} overflow="hidden" {...rStyles} {...rest}>
        <Flex h="100%" alignItems="center" justify="center" flexWrap="nowrap">
          {layout}
        </Flex>
        <Flex
          height="100%"
          overflow="hidden"
          align="center"
          direction="column"
          px={{ base: 0, lg: 32 }}>
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
