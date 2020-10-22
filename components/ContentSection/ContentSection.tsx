import { forwardRef, useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { BsChevronRight } from '@meronex/icons/bs';
import { Button, SectionDivider } from 'site/components';
import { usePageContent, useMobile } from 'site/hooks';
import { useColorValue } from 'site/context';
import { useResponsiveStyle } from 'site/styles';

import type { ContentSectionProps, TSides, TSideValues, ITitleLayout } from './types';

function getSide(idx: number): TSideValues {
  const sides: TSides = ['right', 'left'];
  return sides[idx % 2];
}

const TitleLayout = (props: ITitleLayout) => {
  const { titleBlock, image, side, isMobile } = props;
  if (isMobile) {
    return titleBlock;
  } else {
    if (side === 'right') {
      return (
        <>
          {image}
          {titleBlock}
        </>
      );
    } else {
      return (
        <>
          {titleBlock}
          {image}
        </>
      );
    }
  }
};

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
  const hasImage = useMemo(() => image !== null && !isMobile, [items.title, index]);
  const side = useMemo(() => getSide(index), [index]);
  let titleMargin = {};
  if (image !== null && !isMobile) {
    if (side === 'right') {
      titleMargin = { ml: 16 };
    } else if (side === 'left') {
      titleMargin = { mr: 16 };
    }
  }
  const titleBlock = (
    <Flex
      key={items.title}
      {...titleMargin}
      direction="column"
      textAlign={isMobile ? 'center' : !hasImage ? 'center' : side === 'right' ? 'left' : 'right'}>
      {title}
      {subtitle}
    </Flex>
  );

  return (
    <>
      <Box
        ref={ref}
        as="section"
        my={{ base: 4, lg: 16, xl: 32 }}
        px={{ base: 4, lg: 16, xl: 64 }}
        overflow="hidden"
        {...rStyles}
        {...rest}>
        <Flex h="100%" alignItems="center" justify="center" flexWrap="nowrap">
          <TitleLayout titleBlock={titleBlock} image={image} isMobile={isMobile} side={side} />
        </Flex>
        <Flex height="100%" align="center" direction="column">
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
      {showBorder && <SectionDivider left={side === 'left'} right={side === 'right'} />}
    </>
  );
});
