import { Box, Flex, VStack, Heading, Divider } from "@chakra-ui/react";

import { RichText, ChakraNextImage } from "~/components";

import { Quote } from "./quote";

import type { Testimonial as TestimonialProps } from "~/queries";

export const Testimonial = (props: TestimonialProps) => {
  const { title, subtitle, body, image } = props;

  return (
    <Flex
      zIndex={1}
      pos="relative"
      borderRadius="md"
      direction="column"
      p={{ base: 4, lg: 12 }}
      justify="space-between"
    >
      <Flex direction="column">
        <Flex align="center" justify="space-between">
          <VStack align="flex-start">
            <Box
              whiteSpace="pre-line"
              _light={{ fontWeight: "thin" }}
              fontSize={{ base: "lg", lg: "xl" }}
              textAlign={{ base: "left", xl: "justify" }}
              sx={{ "& p, & .st-content-p": { display: "inline" } }}
            >
              <Quote kind="open" />
              <RichText content={body} />
              <Quote kind="close" />
            </Box>
            <VStack w="100%" pt={8} align="center" textAlign="center">
              <Divider mb={4} _dark={{ borderColor: "whiteAlpha.500" }} />
              {subtitle && (
                <Heading as="h5" fontSize={{ base: "md", lg: "lg" }} fontWeight="light">
                  {subtitle}
                </Heading>
              )}
              <Heading as="h4" fontSize={{ base: "lg", lg: "xl" }}>
                {title}
              </Heading>
              <Box
                minW={12}
                overflow="hidden"
                css={{ "& > img": { maxWidth: "12rem", height: "auto" } }}
              >
                <ChakraNextImage
                  alt={title}
                  width={200}
                  height={113}
                  src={image.url}
                  userSelect="none"
                  placeholder="blur"
                  pointerEvents="none"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=)"
                />
              </Box>
            </VStack>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};
