/* eslint-disable react/jsx-key */
import { HStack, Button } from '@chakra-ui/react';
import { useTable } from 'react-table';
import { useColumns } from './columns';
import { Table, Td, Tr, Th, Tbody, Thead, Tfoot, TableCaption } from './elements';
import { useTableState } from '../state';

import type { HeaderGroup } from 'react-table';
import type { TableRow } from '../state';

function getFooterCells<H extends HeaderGroup<TableRow>>(headers: H[]): [JSX.Element, H[]] {
  const empty = headers.filter(h => h.Footer === '').length;
  const nonEmpty = headers.filter(h => h.Footer !== '');
  const emptyCell = (
    <Td key="__empty" colSpan={empty}>
      &nbsp;
    </Td>
  );
  return [emptyCell, nonEmpty];
}

export const QuoteTable = (): JSX.Element => {
  const data = useTableState(s => s.rows);
  const reset = useTableState(s => s.resetRows);
  const columns = useColumns();

  const tableInstance = useTable<TableRow>({
    data,
    columns,
  });

  const {
    rows,
    headers,
    prepareRow,
    footerGroups,
    getTableProps,
    getTableBodyProps,
  } = tableInstance;

  return (
    <Table {...getTableProps()}>
      <TableCaption px={0}>
        <HStack justify="flex-end">
          <Button size="sm" colorScheme="red" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button size="sm" colorScheme="green" variant="solid" onClick={() => console.log(data)}>
            Submit
          </Button>
        </HStack>
      </TableCaption>
      <Thead>
        <Tr>
          {headers.map(({ sx, ...column }) => (
            <Th sx={sx} {...column.getHeaderProps()}>
              {column.render('Header')}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <Td isNumeric={typeof cell.value === 'number'} {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
      <Tfoot>
        {footerGroups.map(group => {
          const [empty, columns] = getFooterCells(group.headers);
          return (
            <>
              {empty}
              {columns.map(column => (
                <Td {...column.getFooterProps()} textAlign="end">
                  {column.render('Footer')}
                </Td>
              ))}
            </>
          );
        })}
      </Tfoot>
    </Table>
  );
};
