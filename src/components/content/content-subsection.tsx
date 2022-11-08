import { Box, Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { Button, Icon, RichText } from "~/components";
import { useColorValue } from "~/context";
import { is } from "~/lib";

import type { ContentSubSectionProps } from "./types";

export const ContentSubSection = (props: ContentSubSectionProps) => {
  const { title, body, icon, iconColor, button } = props;

  const fnTitle = useTitleCase();

  const boxProps = useColorValue(
    { bg: "white", boxShadow: "xl" },
    { bg: "whiteAlpha.50", css: { backdropFilter: "blur(2px)" } },
  );

  return (
    <Flex
      {...boxProps}
      p={8}
      direction="column"
      justify="space-between"
      borderRadius="md"
      zIndex={1}
    >
      <Flex direction="column">
        <Flex align="center" justify="space-between">
          <Heading as="h4" fontSize="lg" mb={4}>
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
