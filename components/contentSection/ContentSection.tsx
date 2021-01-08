import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Box, Flex } from '@chakra-ui/react';
import { Button, SectionDivider } from '~/components';
import { usePageContent, useMobile } from '~/hooks';
import { useColorValue } from '~/context';
import { forwardRef } from '~/util';
import { useResponsiveStyle } from '~/styles';

import type { IContentSection, TSides, TSideValues, ITitleLayout } from './types';

const RightArrow = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/bs').then(i => i.BsChevronRight),
);

function getSide(idx: number): TSideValues {
  const sides: TSides = ['right', 'left'];
  return sides[idx % 2];
}

const TitleLayout: React.FC<ITitleLayout> = (props: ITitleLayout) => {
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

export const ContentSection = forwardRef<HTMLDivElement, IContentSection>((props, ref) => {
  const { items, index, ...rest } = props;
  const {
    body,
    title,
    image,
    subtitle,
    updatedAt,
    showButton,
    buttonText,
    buttonLink,
    subsections,
    showUpdatedDate,
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
      textAlign={isMobile ? 'center' : !hasImage ? 'center' : side === 'right' ? 'left' : 'right'}
    >
      {title}
      {subtitle}
    </Flex>
  );

  return (
    <>
      <Box
        ref={ref}
        as="article"
        overflow="hidden"
        my={{ base: 4, lg: 16, xl: 32 }}
        px={{ base: 4, lg: 16, xl: 64 }}
        {...rStyles}
        {...rest}
      >
        <Flex h="100%" alignItems="center" justify="center" flexWrap="nowrap">
          <TitleLayout titleBlock={titleBlock} image={image} isMobile={isMobile} side={side} />
        </Flex>
        <Flex height="100%" align="center" direction="column">
          {body}
          {subsections}
          {showButton && (
            <Button my={8} href={buttonLink} leftIcon={<RightArrow />}>
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
