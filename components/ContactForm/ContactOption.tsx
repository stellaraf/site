import * as React from 'react';
import { Heading, Text } from '@chakra-ui/core';
import { useTitle } from 'site/hooks';

import type { IContactOption } from './types';

export const ContactOption = (props: IContactOption) => {
  const { title, body, icon } = props;
  const titleMe = useTitle();

  return (
    <>
      {icon}
      <Heading as="h3" fontSize="lg">
        {titleMe(title)}
      </Heading>
      <Text textAlign="center">{body}</Text>
    </>
  );
};
