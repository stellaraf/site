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
import { useController, useFormContext } from "react-hook-form";

import type { FieldValues } from "react-hook-form";
import type { CurrencyFieldProps } from "./types";

export const CurrencyField = <V extends FieldValues>(
  props: CurrencyFieldProps<NumberInputFieldProps, V>,
) => {
  const { field, name, defaultValue, rules = {}, ...rest } = props;

  const { register } = useFormContext<V>();

  const {
    fieldState: { error },
  } = useController<V>({ name });

  return (
    <FormControl id={name} isRequired={field.required} isInvalid={typeof error !== "undefined"}>
      <FormLabel>{field.displayName}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none" opacity={0.5} fontSize="large">
          {field.unitSymbol}
        </InputLeftElement>
        <NumberInput min={1} precision={2}>
          <NumberInputField
            pl={8}
            {...register(name, { required: field.required, ...rules })}
            {...rest}
          />
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
