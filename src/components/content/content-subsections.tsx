import { SimpleGrid } from "@chakra-ui/react";

import { ContentSubSection } from "./content-subsection";

import type { SubSectionGroupProps } from "./types";

export const ContentSubSections = (props: SubSectionGroupProps) => {
  const { features, ...rest } = props;
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} my={16} {...rest}>
      {features.map(feature => (
        <ContentSubSection key={feature.title} {...feature} />
      ))}
    </SimpleGrid>
  );
};
