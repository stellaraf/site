import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';

import type { FormControlProps } from '@chakra-ui/react';
import type { BaseField } from '~/types';

interface FieldWrapperProps extends FormControlProps {
  id: string;
  field: BaseField;
  error?: string;
}

export const FieldWrapper = (props: FieldWrapperProps): JSX.Element => {
  const { children, field, id, error, ...rest } = props;

  return (
    <FormControl id={id} isInvalid={typeof error !== 'undefined'} {...rest}>
      <FormLabel>{field.name}</FormLabel>
      {children}
      {!error && (
        <FormHelperText fontSize="xs" textAlign="end">
          {field.info}
        </FormHelperText>
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
