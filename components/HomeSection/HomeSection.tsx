import * as React from 'react';
import { Box } from '@chakra-ui/core';
import { SectionDivider } from 'site/components';
import { useColorValue } from 'site/context';
import { useRender } from 'site/hooks';
import { HomeBlock } from './HomeBlock';
import type { HomeSectionProps, TSides, TSideValues } from './types';

function getSide(idx: number): TSideValues {
  const sides: TSides = ['right', 'left'];
  return sides[idx % sides.length];
}

export const HomeSection = (props: HomeSectionProps) => {
  const { section, index, ...rest } = props;
  const { title, subtitle, body, buttonText, buttonLink, image } = section;
  const showBorder = useColorValue(false, true);
  const renderedBody = useRender(body);
  const padding = Object();
  if (index === 0) {
    padding.pt = '320px';
    padding.pb = 24;
  } else {
    padding.py = 16;
  }
  const side = getSide(index);
  return (
    <>
      <Box
        as="section"
        overflow="hidden"
        my={{ base: 4, lg: 16, xl: 32 }}
        px={{ base: 4, lg: 16, xl: 64 }}
        {...padding}
        {...rest}>
        <HomeBlock
          title={title}
          subtitle={subtitle}
          body={renderedBody}
          buttonText={buttonText}
          buttonLink={buttonLink}
          imageUrl={image.file.url}
          side={side}
        />
      </Box>
      {showBorder && <SectionDivider left={side === 'left'} right={side === 'right'} />}
    </>
  );
};
