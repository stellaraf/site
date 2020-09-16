import * as React from 'react';
import { Heading } from '@chakra-ui/core';
import { useTitle } from 'site/hooks';
import type { BaseHeadingProps, HeadingProps } from './types';

const BaseHeading = (props: BaseHeadingProps) => {
  const { level, children, ...rest } = props;
  const titleMe = useTitle();
  let title = children;

  if (typeof children === 'string') {
    title = titleMe(children);
  }
  return (
    <Heading as={`h${level}`} mb={2} mt={12} {...rest}>
      {title}
    </Heading>
  );
};

export const H1 = (props: HeadingProps) => <BaseHeading level={1} my="1em" size="xl" {...props} />;
export const H2 = (props: HeadingProps) => (
  <BaseHeading level={2} fontWeight="light" fontSize="2rem" {...props} />
);
export const H3 = (props: HeadingProps) => (
  <BaseHeading pl={1} level={3} size="md" fontWeight="normal" {...props} />
);
export const H4 = (props: HeadingProps) => (
  <BaseHeading level={4} pl={1} size="md" fontWeight="medium" {...props} />
);
export const H5 = (props: HeadingProps) => (
  <BaseHeading level={5} pl={1} size="sm" fontWeight="medium" {...props} />
);
export const H6 = (props: HeadingProps) => (
  <BaseHeading level={6} pl={1} size="sm" fontWeight="bold" {...props} />
);
