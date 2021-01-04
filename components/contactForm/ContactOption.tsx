import { Heading, Text } from '@chakra-ui/react';
import { useTitle } from '~/hooks';

import type { IContactOption } from './types';

export const ContactOption: React.FC<IContactOption> = (props: IContactOption) => {
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
