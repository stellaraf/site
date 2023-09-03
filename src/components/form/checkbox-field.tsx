import {
  Stack,
  Radio,
  Checkbox,
  FormLabel,
  RadioGroup,
  FormControl,
  CheckboxGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext, useController, type FieldValues } from "react-hook-form";

import type { CheckboxGroupProps, FormFieldProps } from "./types";

export const CheckboxField = <V extends FieldValues>(
  props: FormFieldProps<CheckboxGroupProps, V>,
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

  const { register } = useFormContext<V>();

  const {
    fieldState: { error },
  } = useController({ name });

  return (
    <FormControl
      id={name}
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
                <Checkbox
                  key={opt.value}
                  value={opt.value}
                  {...register(name, { required: isRequired, ...rules })}
                >
                  {opt.label}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        ) : (
          <RadioGroup {...rest}>
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {opts.map(opt => (
                <Radio
                  key={opt.value}
                  value={opt.value}
                  {...register(name, { required: isRequired, ...rules })}
                >
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
