import { Box, Heading, chakra, HStack, useToken } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { CodeBlockStyleProvider, DynamicIcon, RichText } from "~/components";
import { useColorValue } from "~/context";
import { useOpposingColor } from "~/hooks";
import { AdmonitionType } from "~/types/schema";
import { shouldForwardProp } from "~/util";

import type { AdmonitionModel } from "~/queries";

const iconMap = {
  [AdmonitionType.Information]: { bi: "BiInfoCircle" },
  [AdmonitionType.Critical]: { im: "ImFire" },
  [AdmonitionType.Warning]: { vsc: "VscWarning" },
  [AdmonitionType.Note]: { go: "GoNote" },
  [AdmonitionType.Tip]: { go: "GoLightBulb" },
};

const AdmonitionContainer = chakra("div", {
  shouldForwardProp,
  baseStyle: {
    borderRadius: "lg",
    width: "fit-content",
    p: { base: 4, lg: 6 },
    mx: { base: 4, lg: 8 },
    my: { base: 4, lg: 12 },
  },
});

const AdmonitionIcon = (props: Pick<AdmonitionModel, "type">) => {
  const { type = AdmonitionType.Note } = props;
  return <DynamicIcon icon={iconMap[type]} boxSize={{ base: 8, lg: 6 }} />;
};

export const Admonition = (props: AdmonitionModel) => {
  const { title, body, type = AdmonitionType.Note, ...rest } = props;

  const fnTitle = useTitleCase();

  const bg = useColorValue(
    {
      [AdmonitionType.Information]: "primary.500",
      [AdmonitionType.Note]: "gray.500",
      [AdmonitionType.Tip]: "green.500",
      [AdmonitionType.Warning]: "yellow.500",
      [AdmonitionType.Critical]: "red.500",
    }[type],
    {
      [AdmonitionType.Information]: "primary.300",
      [AdmonitionType.Note]: "gray.300",
      [AdmonitionType.Tip]: "green.300",
      [AdmonitionType.Warning]: "yellow.300",
      [AdmonitionType.Critical]: "red.300",
    }[type],
  );

  const linkColor = useColorValue(
    {
      [AdmonitionType.Note]: undefined,
      [AdmonitionType.Information]: "red.500",
      [AdmonitionType.Tip]: "primary.500",
      [AdmonitionType.Warning]: "primary.500",
      [AdmonitionType.Critical]: "primary.500",
    }[type],
    {
      [AdmonitionType.Note]: "secondary.500",
      [AdmonitionType.Information]: "gray.800",
      [AdmonitionType.Tip]: "primary.300",
      [AdmonitionType.Warning]: "primary.300",
      [AdmonitionType.Critical]: "primary.300",
    }[type],
  );

  const codeColorScheme = useColorValue(
    {
      [AdmonitionType.Note]: "blackAlpha",
      [AdmonitionType.Information]: "primary",
      [AdmonitionType.Tip]: "green",
      [AdmonitionType.Warning]: "yellow",
      [AdmonitionType.Critical]: "red",
    }[type],
    {
      [AdmonitionType.Note]: "blackSolid",
      [AdmonitionType.Information]: "whiteSolid",
      [AdmonitionType.Tip]: "blackSolid",
      [AdmonitionType.Warning]: "blackSolid",
      [AdmonitionType.Critical]: "blackSolid",
    }[type],
  );

  const color = useOpposingColor(bg);

  return (
    <AdmonitionContainer bg={bg} color={color} {...rest}>
      <HStack isInline align="center" mb={6}>
        <AdmonitionIcon type={type} />
        {title && (
          <Heading as="h3" fontWeight="bold" fontSize="md">
            {fnTitle(title)}
          </Heading>
        )}
      </HStack>
      <Box
        css={{
          "& div.st-content-p": { marginTop: "1rem", marginBottom: 0 },
          "& a": { "--link-color": useToken("colors", linkColor!) },
        }}
      >
        <CodeBlockStyleProvider
          value={{
            codeBlock: { colorScheme: codeColorScheme },
            copyButton: { colorScheme: codeColorScheme, variant: "ghost" },
          }}
        >
          <RichText content={body.raw} />
        </CodeBlockStyleProvider>
      </Box>
    </AdmonitionContainer>
  );
};
