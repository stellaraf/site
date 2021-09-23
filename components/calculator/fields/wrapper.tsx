import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';

import type { FormControlProps } from '@chakra-ui/react';

interface FieldWrapperProps extends FormControlProps {
  id: string;
  label: string;
  error?: string;
}

export const FieldWrapper = (props: FieldWrapperProps): JSX.Element => {
  const { children, label, id, error, ...rest } = props;

  return (
    <FormControl id={id} isInvalid={typeof error !== 'undefined'} {...rest}>
      <FormLabel>{label}</FormLabel>
      {children}
      <FormHelperText></FormHelperText>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
