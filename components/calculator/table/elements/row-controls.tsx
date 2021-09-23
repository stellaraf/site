import { useCallback } from 'react';
import { HStack, IconButton } from '@chakra-ui/react';
import { DynamicIcon } from '~/components';
import { useTableState } from '../../state';

import type { StackProps } from '@chakra-ui/react';
import type { UseTableCellProps } from 'react-table';
import type { TableRow } from '../../state';

type RowControlsProps = StackProps & UseTableCellProps<TableRow>;

export const RowControls = (props: RowControlsProps): JSX.Element => {
  const { row, column, value, getCellProps, render, ...rest } = props;
  const remove = useTableState(useCallback(s => s.removeRow, []));
  const clone = useTableState(useCallback(s => s.cloneRow, []));
  return (
    <HStack {...rest}>
      <IconButton
        size="xs"
        colorScheme="red"
        aria-label="Remove Row"
        onClick={() => remove(row.index)}
        icon={<DynamicIcon icon={{ fa: 'times' }} />}
      />
      <IconButton
        icon={<DynamicIcon icon={{ bi: 'copy' }} />}
        onClick={() => clone(row.index)}
        aria-label="Clone Row"
        colorScheme="green"
        variant="outline"
        size="xs"
      />
    </HStack>
  );
};
