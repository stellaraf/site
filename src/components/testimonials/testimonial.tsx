import { Box, Flex, Image, VStack, Heading, Divider } from "@chakra-ui/react";
import { useColorValue } from "~/context";
import { useRender } from "~/hooks";
import { Quote } from "./quotes";

import type { TestimonialEntry } from "~/types";

export const Testimonial = (props: TestimonialEntry): JSX.Element => {
  const { title, subtitle, body, image } = props;
  const renderedBody = useRender(body, [], [], { paragraph: { display: "inline" } });
  const fontWeight = useColorValue("thin", undefined);

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
              fontWeight={fontWeight}
              fontSize={{ base: "lg", lg: "xl" }}
              textAlign={{ base: "left", xl: "justify" }}
            >
              <Quote kind="open" />
              {renderedBody}
              <Quote kind="close" />
            </Box>
            <VStack w="100%" pt={8} align="center" textAlign="center">
              <Divider mb={4} />
              {subtitle && (
                <Heading as="h5" fontSize={{ base: "md", lg: "lg" }} fontWeight="light">
                  {subtitle}
                </Heading>
              )}
              <Heading as="h4" fontSize={{ base: "lg", lg: "xl" }}>
                {title}
              </Heading>
              <Box minW={12} maxW={48} overflow="hidden">
                <Image
                  alt={title}
                  width="100%"
                  userSelect="none"
                  draggable={false}
                  pointerEvents="none"
                  src={image.fields.file.url}
                  fallbackSrc="https://via.placeholder.com/150"
                />
              </Box>
            </VStack>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};
