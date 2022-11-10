import { useMemo } from "react";

import { Flex } from "@chakra-ui/react";

import { DynamicIcon } from "~/components";

import type { FlexProps } from "@chakra-ui/react";

interface QuoteProps extends FlexProps {
  kind: "open" | "close";
}

export const Quote = (props: QuoteProps) => {
  const { kind, ...rest } = props;

  const iconProps = useMemo(() => {
    switch (kind) {
      case "open": {
        return { ri: "RiDoubleQuotesL" };
      }
      case "close": {
        return { ri: "RiDoubleQuotesR" };
      }
    }
  }, [kind]);

  const kindProps = useMemo<Partial<FlexProps>>(() => {
    switch (kind) {
      case "open":
        return { verticalAlign: "top", marginRight: 2 };
      case "close":
        return { verticalAlign: "bottom", marginLeft: 2 };
    }
  }, [kind]);

  return (
    <Flex
      color="blackAlpha.300"
      _dark={{ color: "whiteAlpha.300" }}
      align="center"
      justify="center"
      overflow="hidden"
      display="inline-flex"
      {...kindProps}
      {...rest}
    >
      <DynamicIcon icon={iconProps} boxSize={8} />
    </Flex>
  );
};
