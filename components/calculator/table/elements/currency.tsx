import { useMemo } from 'react';
import { chakra } from '@chakra-ui/react';
import { useColorValue } from '~/context';

import type { UseTableCellProps, UseTableInstanceProps } from 'react-table';
import type { TableRow } from '../../state';

/**
 * Display a numeric value as a currency in USD.
 */
export const CurrencyCell = (props: UseTableCellProps<TableRow, number>): JSX.Element => {
  const { value } = props;
  const currency = useMemo(
    () => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value),
    [value],
  );
  return <chakra.span>{currency}</chakra.span>;
};

/**
 * Total the values of a given column and display the value as currency in USD.
 */
export const TotalCell = (props: UseTableInstanceProps<TableRow>): JSX.Element => {
  const { rows } = props;
  const color = useColorValue('primary.500', 'secondary.300');
  const total = useMemo(() => {
    const value = rows.reduce((sum, row) => row.values.price + sum, 0);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }, [rows]);
  return (
    <chakra.span color={color} fontWeight="bold" letterSpacing="0.05rem">
      {total}
    </chakra.span>
  );
};
