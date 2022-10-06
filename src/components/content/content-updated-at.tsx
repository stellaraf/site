import { Label } from "~/components";
import { useColorValue } from "~/context";

import type { FlexProps } from "@chakra-ui/react";
import type { ContentUpdatedAtProps } from "./types";

export const ContentUpdatedAt = (props: ContentUpdatedAtProps) => {
  const { children, ...rest } = props;

  const label = useColorValue(
    { leftColor: "white", rightColor: "whiteAlpha.300" },
    {
      borderRadius: "md",
      border: "1px solid",
      leftColor: "transparent",
      rightColor: "transparent",
      borderColor: "whiteAlpha.300",
      rightProps: {
        borderLeft: "1px solid",
        borderLeftColor: "whiteAlpha.300",
      } as FlexProps,
    },
  );

  return <Label right="Last Updated" left={children} {...label} {...rest} />;
};
