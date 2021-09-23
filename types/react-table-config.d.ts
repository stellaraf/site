/**
 * As-needed type patches for react-table.
 *
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table
 */
import { UseTableColumnOptions } from 'react-table';

declare module 'react-table' {
  /**
   * Add `align` support to columns.
   */
  export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
    extends UseTableColumnOptions<D> {
    sx?: import('@chakra-ui/react').TableHeadProps;
  }
}

export * from 'react-table';
