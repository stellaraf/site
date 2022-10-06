import { SimpleGrid } from "@chakra-ui/react";

import { ContentSubSection } from "./content-subsection";

import type { SubSectionGroupProps } from "./types";

export const ContentSubSections = (props: SubSectionGroupProps) => {
  const { sections, ...rest } = props;
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} my={16} {...rest}>
      {sections.map(s => {
        const { icon, ...otherProps } = s.fields;
        return (
          <ContentSubSection key={s.fields.title} icon={icon?.fields?.file?.url} {...otherProps} />
        );
      })}
    </SimpleGrid>
  );
};
