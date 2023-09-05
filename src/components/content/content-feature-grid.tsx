import { SimpleGrid } from "@chakra-ui/react";

import { ContentFeature } from "./content-feature";

import type { ContentFeatureGridProps } from "./types";

export const ContentFeatureGrid = (props: ContentFeatureGridProps) => {
  const { features, ...rest } = props;
  return (
    <SimpleGrid
      spacing={16}
      my={{ base: 8, lg: 16 }}
      columns={{ base: 2, lg: 4 }}
      css={{
        "& > *": {
          gridColumn: "span 2",
        },
      }}
      sx={
        features.length % 2 == 0
          ? undefined
          : {
              // CSS fuckery to center-align the last row which may not be full.
              // See: https://css-irl.info/controlling-leftover-grid-items
              "& :last-child:nth-of-type(2n - 1)": {
                gridColumnEnd: { lg: -2 },
              },
              "& :nth-last-of-type(2):nth-of-type(2n + 1)": {
                gridColumnEnd: { lg: 4 },
              },
              "& :last-child:nth-of-type(2n - 2)": {
                gridColumnEnd: { lg: 5 },
              },
            }
      }
      {...rest}
    >
      {features.map(feature => (
        <ContentFeature key={feature.title} {...feature} />
      ))}
    </SimpleGrid>
  );
};
