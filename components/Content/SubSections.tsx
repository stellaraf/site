import { Box, Heading, SimpleGrid } from '@chakra-ui/core';
import { useRender, useTitle } from 'site/hooks';
import type { RenderedSubSectionProps, SubSectionGroupProps } from './types';

const SubSection = (props: RenderedSubSectionProps) => {
  const { title, body } = props;
  return (
    <Box>
      <Heading as="h4" fontSize="lg" mb={4}>
        {title}
      </Heading>
      <Box whiteSpace="pre-line" fontSize="lg" textAlign={{ base: 'left', lg: 'justify' }}>
        {body}
      </Box>
    </Box>
  );
};

export const SubSections = (props: SubSectionGroupProps) => {
  const titleMe = useTitle();
  const { sections, ...rest } = props;
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={16}
      my={16}
      maxW={[null, null, '80%']}
      {...rest}>
      {sections.map((s, i) => {
        const { title, body } = s;
        const renderedBody = useRender(body);
        return <SubSection key={i} title={titleMe(title)} body={renderedBody} />;
      })}
    </SimpleGrid>
  );
};
