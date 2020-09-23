import { Box, Heading, Grid } from '@chakra-ui/core';
import { useRender, useTitle } from 'site/hooks';
import type { RenderedSubSectionProps, SubSectionGroupProps } from './types';

const SubSection = (props: RenderedSubSectionProps) => {
  const { title, body } = props;
  return (
    <Box>
      <Heading as="h4" fontSize="lg" mb={4}>
        {title}
      </Heading>
      <Box whiteSpace="pre-line" fontSize="lg" textAlign="justify">
        {body}
      </Box>
    </Box>
  );
};

export const SubSections = (props: SubSectionGroupProps) => {
  const titleMe = useTitle();
  const { sections, ...rest } = props;
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={16} my={16} maxW={[null, null, '80%']} {...rest}>
      {sections.map((s, i) => {
        const { title, body } = s;
        const renderedBody = useRender(body);
        return <SubSection key={i} title={titleMe(title)} body={renderedBody} />;
      })}
    </Grid>
  );
};
