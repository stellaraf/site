import { useMemo } from "react";

import { Box } from "@chakra-ui/react";

import { Divider, RichText } from "~/components";
import { useColorValue } from "~/context";

import { HomeBlock } from "./home-block";

import type { HomeSectionProps, Sides } from "./types";

const sides: Sides = ["right", "left"];

export const HomeSection = (props: HomeSectionProps) => {
  const { block, index, ...rest } = props;
  const { title, subtitle, body, button, image } = block;

  const showBorder = useColorValue(false, true);

  const padding = useMemo<Partial<HomeSectionProps>>(() => {
    if (index === 0) {
      return { pt: { base: "20px", lg: "320px" }, pb: 24 };
    }
    return { py: 16 };
  }, [index]);

  const side = useMemo(() => sides[index % sides.length], [index]);

  return (
    <>
      <Box
        as="section"
        overflow="hidden"
        my={{ base: 4, lg: 16, xl: 32 }}
        px={{ base: 4, lg: 16, xl: 64 }}
        {...padding}
        {...rest}
      >
        <HomeBlock
          side={side}
          title={title}
          subtitle={subtitle}
          body={<RichText content={body.raw} />}
          button={button}
          image={image}
        />
      </Box>
      {showBorder && <Divider left={side === "left"} right={side === "right"} />}
    </>
  );
};
