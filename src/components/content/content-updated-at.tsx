import { Label } from "~/components";
import { useColorValue } from "~/context";
import { useDate } from "~/hooks";

import type { ContentUpdatedAtProps } from "./types";
import type { FlexProps } from "@chakra-ui/react";

export const ContentUpdatedAt = (props: ContentUpdatedAtProps) => {
  const { time, ...rest } = props;
  const updated = useDate(time);

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

  return <Label right="Last Updated" left={updated} {...label} {...rest} />;
};
