import { Td as ChakraTd } from '@chakra-ui/react';

import type { TableCellProps as ChakraTdProps } from '@chakra-ui/react';
import type { TableCellProps } from 'react-table';

type TdProps = TableCellProps & ChakraTdProps;

export const Td = (props: TdProps): JSX.Element => {
  return <ChakraTd p={4} m={0} {...props} />;
};
