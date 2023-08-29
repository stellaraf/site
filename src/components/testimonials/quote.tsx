import { useMemo } from "react";

import { Flex } from "@chakra-ui/react";

import { QuotesLeft, QuotesRight } from "~/icons";

import type { FlexProps } from "@chakra-ui/react";

interface QuoteProps extends FlexProps {
  kind: "open" | "close";
}

export const Quote = (props: QuoteProps) => {
  const { kind, ...rest } = props;

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
      align="center"
      justify="center"
      overflow="hidden"
      display="inline-flex"
      color="blackAlpha.400"
      _dark={{ color: "whiteAlpha.500" }}
      {...kindProps}
      {...rest}
    >
      {kind === "open" ? (
        <QuotesLeft boxSize={8} />
      ) : kind === "close" ? (
        <QuotesRight boxSize={8} />
      ) : (
        <></>
      )}
    </Flex>
  );
};
