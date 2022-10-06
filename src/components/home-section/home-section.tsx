import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { Divider } from "~/components";
import { useColorValue } from "~/context";
import { useRender } from "~/hooks";
import { HomeBlock } from "./home-block";

import type { HomeSectionProps, Sides, Side } from "./types";

function getSide(idx: number): Side {
  const sides: Sides = ["right", "left"];
  return sides[idx % sides.length];
}

export const HomeSection = (props: HomeSectionProps) => {
  const { section, index, ...rest } = props;
  const { title, subtitle, body, buttonText, buttonLink, image } = section;

  const showBorder = useColorValue(false, true);
  const renderedBody = useRender(body);

  const padding = useMemo<Partial<HomeSectionProps>>(() => {
    if (index === 0) {
      return { pt: { base: "20px", lg: "320px" }, pb: 24 };
    }
    return { py: 16 };
  }, [index]);

  const side = getSide(index);

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
          body={renderedBody}
          buttonText={buttonText}
          buttonLink={buttonLink}
          imageUrl={image.fields.file.url}
        />
      </Box>
      {showBorder && <Divider left={side === "left"} right={side === "right"} />}
    </>
  );
};
