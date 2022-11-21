import { SimpleGrid } from "@chakra-ui/react";

import { ContentFeature } from "./content-feature";

import type { ContentFeatureGridProps } from "./types";

export const ContentFeatureGrid = (props: ContentFeatureGridProps) => {
  const { features, ...rest } = props;
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} my={16} {...rest}>
      {features.map(feature => (
        <ContentFeature key={feature.title} {...feature} />
      ))}
    </SimpleGrid>
  );
};
