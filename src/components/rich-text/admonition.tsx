import { Box, Heading, chakra, HStack, useToken, useColorModeValue } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { BlockQuoteStyleProvider, CodeBlockStyleProvider, RichText } from "~/components";
import { useOpposingColor } from "~/hooks";
import {
  AdmonitionCritical,
  AdmonitionInfo,
  AdmonitionNote,
  AdmonitionTip,
  AdmonitionWarning,
  type IconProps,
} from "~/icons";
import { shouldForwardProp } from "~/theme";
import { AdmonitionType } from "~/types";

import { Table, Td, Th } from "./table";

import type { AdmonitionModel } from "~/queries";

const iconMap: { [K in AdmonitionType]: (props: IconProps) => JSX.Element } = {
  [AdmonitionType.Information]: AdmonitionInfo,
  [AdmonitionType.Critical]: AdmonitionCritical,
  [AdmonitionType.Warning]: AdmonitionWarning,
  [AdmonitionType.Note]: AdmonitionNote,
  [AdmonitionType.Tip]: AdmonitionTip,
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
  const Icon = iconMap[type];
  return <Icon boxSize={{ base: 8, lg: 6 }} />;
};

export const Admonition = (props: AdmonitionModel) => {
  const { title, body, type = AdmonitionType.Note, ...rest } = props;

  const fnTitle = useTitleCase();

  const bgBase = useColorModeValue(
    {
      [AdmonitionType.Information]: "primary",
      [AdmonitionType.Note]: "gray",
      [AdmonitionType.Tip]: "green",
      [AdmonitionType.Warning]: "yellow",
      [AdmonitionType.Critical]: "red",
    }[type],
    {
      [AdmonitionType.Information]: "primary",
      [AdmonitionType.Note]: "gray",
      [AdmonitionType.Tip]: "green",
      [AdmonitionType.Warning]: "yellow",
      [AdmonitionType.Critical]: "red",
    }[type],
  );
  const bg = useColorModeValue(`${bgBase}.500`, `${bgBase}.300`);

  const linkColor = useColorModeValue(
    {
      [AdmonitionType.Note]: undefined,
      [AdmonitionType.Information]: "secondary.100",
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

  const codeColorScheme = useColorModeValue(
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

  const codeCopyButtonColorScheme = useColorModeValue(
    {
      [AdmonitionType.Note]: "blackAlpha",
      [AdmonitionType.Information]: "whiteAlpha",
      [AdmonitionType.Tip]: "blackAlpha",
      [AdmonitionType.Warning]: "blackAlpha",
      [AdmonitionType.Critical]: "whiteAlpha",
    }[type],
    {
      [AdmonitionType.Note]: "blackSolid",
      [AdmonitionType.Information]: "whiteSolid",
      [AdmonitionType.Tip]: "blackSolid",
      [AdmonitionType.Warning]: "blackSolid",
      [AdmonitionType.Critical]: "blackSolid",
    }[type],
  );

  const tableColorScheme = {
    [AdmonitionType.Note]: "blackAlpha",
    [AdmonitionType.Information]: "primary",
    [AdmonitionType.Tip]: "green",
    [AdmonitionType.Warning]: "yellow",
    [AdmonitionType.Critical]: "red",
  }[type];

  const color = useOpposingColor(bg);

  return (
    <AdmonitionContainer bg={bg} color={color} {...rest}>
      <HStack direction="row" align="center" mb={6}>
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
            colorScheme: bgBase,
            codeBlock: { colorScheme: codeColorScheme },
            copyButton: { colorScheme: codeCopyButtonColorScheme, variant: "ghost" },
          }}
        >
          <BlockQuoteStyleProvider
            value={{ colorScheme: bgBase, blockQuote: { colorScheme: codeColorScheme } }}
          >
            <RichText
              content={body}
              overrides={{
                table: props => (
                  <Table colorScheme={tableColorScheme} borderRadius="md" {...props} />
                ),
                table_header_cell: props => (
                  <Th
                    sx={{
                      bg: `${tableColorScheme}.300`,
                      _dark: { bg: `${tableColorScheme}.400` },
                    }}
                    {...props}
                  />
                ),
                table_cell: props => <Td {...props} />,
              }}
            />
          </BlockQuoteStyleProvider>
        </CodeBlockStyleProvider>
      </Box>
    </AdmonitionContainer>
  );
};
