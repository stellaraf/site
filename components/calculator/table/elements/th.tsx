import { Th as ChakraTh } from '@chakra-ui/react';

import type { TableCellProps } from '@chakra-ui/react';

export const Th = (props: TableCellProps): JSX.Element => {
  return <ChakraTh {...props} />;
};
