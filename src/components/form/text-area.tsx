import { FormControl, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";

import { is } from "~/lib";

import type { TextareaProps } from "@chakra-ui/react";
import type { FieldValues } from "react-hook-form";
import type { FormFieldProps } from "./types";

export const TextArea = <V extends FieldValues>(props: FormFieldProps<TextareaProps, V>) => {
  const { name, field, defaultValue, rules = {}, isRequired = false, ...rest } = props;

  const { register } = useFormContext<V>();
  const {
    fieldState: { error },
  } = useController({ name });

  return (
    <FormControl id={name} isRequired={isRequired} isInvalid={typeof error !== "undefined"}>
      {is(field.label) && <FormLabel>{field.label}</FormLabel>}
      <Textarea
        resize="vertical"
        h={{ base: "10rem", lg: "unset" }}
        _placeholder={{
          _light: { opacity: 0.8, color: "gray.600" },
          _dark: { color: "whiteAlpha.600", opacity: 1 },
        }}
        {...register(name, { required: isRequired, ...rules })}
        {...rest}
      />
      <FormErrorMessage>{typeof error !== "undefined" && error.message}</FormErrorMessage>
    </FormControl>
  );
};
