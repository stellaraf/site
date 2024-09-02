import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { type FieldValues, useController } from "react-hook-form";

import type { CheckboxGroupProps, CheckboxProps } from "./types";

export const CheckboxField = <V extends FieldValues>(
  props: CheckboxProps<CheckboxGroupProps, V>,
) => {
  const {
    opts,
    name,
    field,
    isMulti,
    rules = {},
    defaultValue,
    isRequired = false,
    ...rest
  } = props;

  const {
    field: { value, ...register },
    fieldState: { error },
  } = useController({ name, rules: { required: isRequired, ...rules } });

  return (
    <FormControl
      id={`form-control--${name}`}
      as="fieldset"
      isRequired={isRequired}
      isInvalid={typeof error !== "undefined"}
    >
      <FormLabel as="legend">{field.label ? field.label : field.displayName}</FormLabel>
      <>
        {isMulti ? (
          <CheckboxGroup defaultValue={[]} {...rest}>
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {opts.map(opt => (
                <Checkbox key={opt.value} value={opt.value} {...register}>
                  {opt.label}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        ) : (
          <RadioGroup defaultValue={opts[0].value} {...rest}>
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {opts.map(opt => (
                <Radio key={opt.value} value={opt.value} {...register}>
                  {opt.label}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        )}
      </>
      <FormErrorMessage>{typeof error !== "undefined" && error.message}</FormErrorMessage>
    </FormControl>
  );
};
