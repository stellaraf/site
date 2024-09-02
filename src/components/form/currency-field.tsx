import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  type NumberInputFieldProps,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useController } from "react-hook-form";

import type { FieldValues } from "react-hook-form";
import type { CurrencyFieldProps } from "./types";

export const CurrencyField = <V extends FieldValues>(
  props: CurrencyFieldProps<NumberInputFieldProps, V>,
) => {
  const { field, name, defaultValue, rules = {}, ...rest } = props;

  const {
    field: register,
    fieldState: { error },
  } = useController<V>({ name, rules: { required: field.required, ...rules } });

  return (
    <FormControl
      id={`form-control--${name}`}
      isRequired={field.required}
      isInvalid={typeof error !== "undefined"}
    >
      <FormLabel>{field.displayName}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none" opacity={0.5} fontSize="large">
          {field.unitSymbol}
        </InputLeftElement>
        <NumberInput min={0} precision={2}>
          <NumberInputField pl={8} {...register} {...rest} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </InputGroup>
      <FormErrorMessage>{typeof error !== "undefined" && error.message}</FormErrorMessage>
    </FormControl>
  );
};
