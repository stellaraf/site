import { useMemo } from 'react';
import { QuantityCell, RowControls, TotalCell, CurrencyCell } from './elements';

import type { Column } from 'react-table';
import type { TableRow } from '../state';

const COLUMNS: Column<TableRow>[] = [
  {
    Header: () => null,
    id: 'rowControls',
    Cell: RowControls,
    Footer: '',
    sx: { textAlign: 'start' },
  },
  { Header: 'Product', accessor: 'product', Footer: '', sx: { textAlign: 'start' } },
  { Header: 'Item', accessor: 'name', Footer: '', sx: { textAlign: 'start' } },
  {
    Header: 'Quantity',
    accessor: 'quantity',
    id: 'editableQuantity',
    Cell: QuantityCell,
    Footer: '',
    sx: { textAlign: 'end' },
  },
  {
    Header: 'Price',
    accessor: 'price',
    Cell: CurrencyCell,
    Footer: TotalCell,
    sx: { textAlign: 'end' },
  },
];

export function useColumns(): Column<TableRow>[] {
  return useMemo<Column<TableRow>[]>(() => COLUMNS, []);
}
