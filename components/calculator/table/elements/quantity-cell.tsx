import { useEffect, useState } from 'react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { DynamicIcon } from '~/components';
import { useColorValue } from '~/context';
import { useTableState } from '../../state';

import type { UseCounterProps } from '@chakra-ui/react';
import type { UseTableCellProps } from 'react-table';
import type { TableRow } from '../../state';

export const QuantityCell = (props: UseTableCellProps<TableRow, number>): JSX.Element => {
  const {
    value: initialValue,
    row: { index },
  } = props;
  const [value, setValue] = useState<number>(initialValue);
  const updateQuantity = useTableState(s => s.updateRowQuantity);
  const green = useColorValue('green.500', 'green.300');
  const red = useColorValue('red.500', 'red.300');

  const onChange: UseCounterProps['onChange'] = (_, changed) => {
    if (isNaN(changed)) {
      changed = 0;
    }
    setValue(() => {
      updateQuantity(index, changed);
      return changed;
    });
  };

  useEffect(() => {
    // If the initialValue is changed external, sync it up with local state.
    setValue(initialValue);
  }, [initialValue]);

  return (
    <NumberInput
      value={value}
      onChange={onChange}
      borderColor="transparent"
      defaultValue={initialValue}
    >
      <NumberInputField maxW={24} textAlign="end" type="number" />
      <NumberInputStepper>
        <NumberIncrementStepper borderColor="transparent">
          <DynamicIcon icon={{ fa: 'plus' }} color={green} />
        </NumberIncrementStepper>
        <NumberDecrementStepper borderColor="transparent">
          <DynamicIcon icon={{ fa: 'minus' }} color={red} />
        </NumberDecrementStepper>
      </NumberInputStepper>
    </NumberInput>
  );
};
