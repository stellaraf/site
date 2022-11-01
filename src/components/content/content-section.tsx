import { forwardRef, useMemo } from "react";

import { Box, Flex, VStack, Heading, VisuallyHidden } from "@chakra-ui/react";

import { Button, DynamicIcon, Divider, RichText } from "~/components";
import { useColorValue } from "~/context";
import { useMobile, useResponsiveStyle } from "~/hooks";
import { is } from "~/lib";

import { ContentBody } from "./content-body";
import { ContentForm } from "./content-form";
import { ContentImage } from "./content-image";
import { ContentSubSections } from "./content-subsections";
import { ContentSubtitle } from "./content-subtitle";
import { ContentTitle } from "./content-title";
import { ContentUpdatedAt } from "./content-updated-at";

import type { ContentSectionProps, ContentSides, ContentSide, TitleLayoutProps } from "./types";
import type { FlexProps } from "@chakra-ui/react";

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
  const { content, index, ...rest } = props;
  const {
    title,
    subtitle,
    body,
    showUpdatedDate,
    button,
    image,
    form,
    features,
    slug,
    updatedAt,
    vendorLogo,
  } = content;

  const isMobile = useMobile();
  const rStyles = useResponsiveStyle();
  const showBorder = useColorValue(false, true);

  const hasImage = useMemo(() => is(image) && !isMobile, [title, index, isMobile]);
  const side = useMemo<ContentSide>(() => (["right", "left"] as ContentSides)[index % 2], [index]);

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
      key={title}
      {...titleMargin}
      direction="column"
      textAlign={isMobile ? "center" : !hasImage ? "center" : side === "right" ? "left" : "right"}
    >
      <ContentTitle id={slug}>{title}</ContentTitle>
      {subtitle && <ContentSubtitle>{subtitle}</ContentSubtitle>}
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
          <TitleLayout
            side={side}
            isMobile={isMobile}
            titleBlock={titleBlock}
            image={is(image) ? <ContentImage src={image.url} /> : null}
          />
        </Flex>
        <Flex height="100%" align="center" direction="column" mb={{ base: 12, lg: "" }}>
          {is(body) && (
            <ContentBody>
              <RichText content={body?.raw} />
            </ContentBody>
          )}
          <ContentSubSections features={features} />
          {is(vendorLogo) && (
            <VStack w="100%" alignItems={{ base: "center", lg: "flex-start" }} spacing={4}>
              <Heading as="h3" fontSize="sm" opacity={0.8}>
                {vendorLogo.pretext}
              </Heading>
              <Flex w="100%" flex="1 0 100%" height={8} justifyContent="flex-start">
                <Box
                  display="inline-block"
                  boxSize="100%"
                  css={{
                    maskImage: `url(${vendorLogo.logo.url})`,
                    maskRepeat: "no-repeat",
                    maskPosition: isMobile ? "center" : "left",
                  }}
                  backgroundColor={{
                    _light: vendorLogo.lightColor.hex,
                    _dark: vendorLogo.darkColor.hex,
                  }}
                />
                <VisuallyHidden>{vendorLogo.name}</VisuallyHidden>
              </Flex>
              {vendorLogo.postText && (
                <Heading as="h3" fontSize="sm" opacity={0.8}>
                  {vendorLogo.postText}
                </Heading>
              )}
            </VStack>
          )}
          {is(form) && <ContentForm form={form} />}
          {is(button) && (
            <Button
              my={8}
              href={button.link ?? "#"}
              leftIcon={<DynamicIcon icon={{ bs: "BsChevronRight" }} />}
              variant={is(button.variant) ? button.variant : undefined}
            >
              {button.text}
            </Button>
          )}
          {showUpdatedDate && <ContentUpdatedAt time={updatedAt} />}
        </Flex>
      </Box>
      {showBorder && <Divider left={side === "left"} right={side === "right"} />}
    </>
  );
});

ContentSection.displayName = "ContentSection";
