import { useMemo } from "react";

import { Box, Flex } from "@chakra-ui/react";

import { Button, DynamicIcon, Divider } from "~/components";
import { useColorValue } from "~/context";
import { useMobile, useResponsiveStyle } from "~/hooks";
import { forwardRef } from "~/util";

import type { ContentSectionProps, ContentSides, ContentSide, TitleLayoutProps } from "./types";
import type { FlexProps } from "@chakra-ui/react";
import { usePageContent } from "./use-page-content";

function getSide(idx: number): ContentSide {
  const sides: ContentSides = ["right", "left"];
  return sides[idx % 2];
}

const TitleLayout = (props: TitleLayoutProps) => {
  const { titleBlock, image, side, isMobile } = props;
  if (isMobile) {
    return titleBlock;
  } else {
    if (side === "right") {
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

export const ContentSection = forwardRef<HTMLDivElement, ContentSectionProps>((props, ref) => {
  const { items, index, ...rest } = props;
  const {
    form,
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
  const hasImage = useMemo(() => image !== null && !isMobile, [items.title, index, isMobile]);
  const side = useMemo(() => getSide(index), [index]);

  const titleMargin = useMemo<FlexProps>(() => {
    if (image !== null && !isMobile) {
      if (side === "right") {
        return { ml: 16 };
      } else if (side === "left") {
        return { mr: 16 };
      }
    }
    return {};
  }, [image, side, isMobile]);

  const titleBlock = (
    <Flex
      key={items.title}
      {...titleMargin}
      direction="column"
      textAlign={isMobile ? "center" : !hasImage ? "center" : side === "right" ? "left" : "right"}
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
        <Flex height="100%" align="center" direction="column" mb={{ base: 12, lg: "" }}>
          {body}
          {form}
          {subsections}
          {showButton && (
            <Button
              my={8}
              href={buttonLink}
              leftIcon={<DynamicIcon icon={{ bs: "BsChevronRight" }} />}
            >
              {buttonText}
            </Button>
          )}
          {showUpdatedDate && updatedAt}
        </Flex>
      </Box>
      {showBorder && <Divider left={side === "left"} right={side === "right"} />}
    </>
  );
});
