import * as React from 'react';
import { forwardRef } from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useColorMode } from 'site/context';
import { Button } from 'site/components/Button';
import { usePageContent } from 'site/hooks/usePageContent';
import { _headerStyle } from 'site/state/atoms';
import { useSectionStyle } from 'site/styles';

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
  const style = useSectionStyle(index, colorMode);
  return (
    <Box
      ref={ref}
      as="section"
      p={24}
      overflow="hidden"
      bg={style.bg}
      color={style.text}
      {...style.border}
      {...props}>
      <Flex h="100%" overflow="hidden" px={24} alignItems="center" flexDir="column">
        {title}
        {subtitle}
        {body}
        {subsections}
        {showButton && (
          <Button
            href={buttonLink}
            leftIcon="chevron-right"
            color={style.btnText}
            variant={style.btnVariant}
            borderColor={style.btnBorder}
            _hover={{
              backgroundColor: style.btnHoverBg,
            }}>
            {buttonText}
          </Button>
        )}
      </Flex>
    </Box>
  );
});
