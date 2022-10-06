import { useCallback } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";
import { Button, Icon } from "~/components";
import { useRender } from "~/hooks";
import { useColorValue } from "~/context";

import type { ContentSubSectionProps } from "./types";

export const ContentSubSection = (props: ContentSubSectionProps) => {
  const { title, body, icon, iconColor = "primary", buttonLink, buttonText } = props;

  const fnTitle = useTitleCase();

  const boxProps = useColorValue(
    { bg: "white", boxShadow: "xl" },
    { bg: "whiteAlpha.50", css: { backdropFilter: "blur(2px)" } },
  );
  const renderedBody = useRender(body);

  const hasButton = useCallback(
    () => typeof buttonLink !== "undefined" && typeof buttonText !== "undefined",
    [buttonText, buttonLink],
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
          {icon && <Icon size={12} url={icon} color={iconColor} />}
        </Flex>
        <Box whiteSpace="pre-line" fontSize="lg" textAlign={{ base: "left", xl: "justify" }}>
          {renderedBody}
        </Box>
      </Flex>
      {hasButton() && (
        <Flex align="center" justify={{ base: "flex-start", lg: "flex-end" }}>
          <Button size="sm" colorScheme={iconColor} variant="outline" href={buttonLink}>
            {typeof buttonText !== "undefined" && fnTitle(buttonText)}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
