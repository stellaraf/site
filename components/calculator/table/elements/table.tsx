import { Table as ChakraTable } from '@chakra-ui/react';

import type { TableProps } from '@chakra-ui/react';

export const Table = (props: TableProps): JSX.Element => {
  return <ChakraTable variant="simple" {...props} />;
};
