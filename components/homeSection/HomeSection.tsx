import { Box } from '@chakra-ui/react';
import { SectionDivider } from '~/components';
import { useColorValue } from '~/context';
import { useRender } from '~/hooks';
import { HomeBlock } from './HomeBlock';

import type { IHomeSection, TSides, TSideValues } from './types';

function getSide(idx: number): TSideValues {
  const sides: TSides = ['right', 'left'];
  return sides[idx % sides.length];
}

export const HomeSection: React.FC<IHomeSection> = (props: IHomeSection) => {
  const { section, index, ...rest } = props;
  const { title, subtitle, body, buttonText, buttonLink, image } = section;

  const showBorder = useColorValue(false, true);
  const renderedBody = useRender(body);

  const padding = {} as IHomeSection;
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
        {...rest}
      >
        <HomeBlock
          title={title}
          subtitle={subtitle}
          body={renderedBody}
          buttonText={buttonText}
          buttonLink={buttonLink}
          imageUrl={image.fields.file.url}
          side={side}
        />
      </Box>
      {showBorder && <SectionDivider left={side === 'left'} right={side === 'right'} />}
    </>
  );
};
