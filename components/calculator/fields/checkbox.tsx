import { useState } from 'react';
import { Box, Checkbox } from '@chakra-ui/react';
import { useFieldValues } from '../state';

import type { BoxProps } from '@chakra-ui/react';
import type { CheckboxField as CheckboxFieldT, DeepEntryMembers } from '~/types';

interface CheckboxFieldProps extends BoxProps {
  id: string;
  product: string;
  field: DeepEntryMembers<CheckboxFieldT>;
  colorScheme?: import('@chakra-ui/react').CheckboxProps['colorScheme'];
}

export const CheckboxField = (props: CheckboxFieldProps): JSX.Element => {
  const { id, product, field, colorScheme, ...rest } = props;
  const [, setValue] = useFieldValues<string>(product, id, '');
  const [checked, setChecked] = useState<boolean>(field.checkedByDefault);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
    if (checked) {
      setValue(field.productCode);
    } else {
      setValue('');
    }
  }
  return (
    <Box {...rest}>
      <Checkbox onChange={handleChange} colorScheme={colorScheme}>
        {field.name}
      </Checkbox>
    </Box>
  );
};
