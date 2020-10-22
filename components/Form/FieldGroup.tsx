import { Stack } from '@chakra-ui/core';
import type { StackProps } from '@chakra-ui/core';

export const FieldGroup = (props: StackProps) => (
  <Stack
    w="100%"
    my={4}
    direction={{ base: 'column', lg: 'row' }}
    css={{
      '&:first-of-type': { marginTop: '0.6rem' },
      '&:last-of-type': { marginBottom: '0.6rem' },
      '& .chakra-form-control': { padding: '0.6rem' },
    }}
    {...props}
  />
);
