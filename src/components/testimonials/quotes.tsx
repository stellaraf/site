import { useMemo } from "react";
import { Flex } from "@chakra-ui/react";
import { DynamicIcon } from "~/components";
import { useColorValue } from "~/context";

import type { FlexProps } from "@chakra-ui/react";

interface QuoteProps extends FlexProps {
  kind: "open" | "close";
}

export const Quote = (props: QuoteProps): JSX.Element => {
  const { kind, ...rest } = props;

  const color = useColorValue("blackAlpha.300", "secondary.200");

  const iconProps = useMemo(() => {
    switch (kind) {
      case "open":
        return { ri: "RiDoubleQuotesL" };
      case "close":
        return { ri: "RiDoubleQuotesR" };
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
    <Flex color={color} align="center" justify="center" overflow="hidden" display="inline-flex" {...kindProps} {...rest}>
      <DynamicIcon icon={iconProps} boxSize="100%" />
    </Flex>
  );
};
