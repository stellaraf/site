import { Box, Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { Button, Icon, RichText } from "~/components";
import { is } from "~/lib";

import type { ContentFeatureProps } from "./types";

export const ContentFeature = (props: ContentFeatureProps) => {
  const { title, body, icon, iconColor, button } = props;

  const fnTitle = useTitleCase();

  return (
    <Flex
      p={8}
      bg="white"
      zIndex={1}
      borderRadius="md"
      direction="column"
      justify="space-between"
      _light={{ boxShadow: "xl" }}
      _dark={{
        bg: "whiteAlpha.50",
        backdropFilter: "blur(2px)",
      }}
    >
      <Flex direction="column">
        <Flex align="center" justify="space-between">
          <Heading as="h4" fontSize="lg" mb={4} mr={4}>
            {fnTitle(title)}
          </Heading>
          {icon && <Icon size={12} url={icon.url} color={iconColor ?? "primary"} />}
        </Flex>
        <Box whiteSpace="pre-line" fontSize="lg" textAlign={{ base: "left", xl: "justify" }}>
          <RichText content={body} />
        </Box>
      </Flex>
      {is(button) && (
        <Flex align="center" justify={{ base: "flex-start", lg: "flex-end" }}>
          <Button
            size="sm"
            colorScheme={iconColor ?? "primary"}
            variant={button.variant ?? "outline"}
            href={button.link ?? "#"}
          >
            {fnTitle(button.text)}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
