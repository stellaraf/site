import { Tr as ChakraTr } from '@chakra-ui/react';

import type { TableRowProps } from '@chakra-ui/react';

export const Tr = (props: TableRowProps): JSX.Element => {
  return <ChakraTr {...props} />;
};
