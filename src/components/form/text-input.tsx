import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { useFormContext, useController } from "react-hook-form";

import { is } from "~/lib";

import type { FormFieldProps } from "./types";
import type { InputProps } from "@chakra-ui/react";
import type { FieldValues } from "react-hook-form";

export const TextInput = <V extends FieldValues>(props: FormFieldProps<InputProps, V>) => {
  const { field, name, defaultValue, rules = {}, isRequired = false, ...rest } = props;

  const { register } = useFormContext<V>();

  const {
    fieldState: { error },
  } = useController({ name });

  return (
    <FormControl id={name} isRequired={isRequired} isInvalid={typeof error !== "undefined"}>
      {is(field.label) && <FormLabel>{field.label}</FormLabel>}
      <Input
        placeholder={field.displayName}
        _placeholder={{
          color: "gray.600",
          opacity: 0.8,
          _dark: { color: "whiteAlpha.600", opacity: 1 },
        }}
        {...register(name, { required: isRequired, ...rules })}
        {...rest}
      />
      <FormErrorMessage>{typeof error !== "undefined" && error.message}</FormErrorMessage>
    </FormControl>
  );
};
