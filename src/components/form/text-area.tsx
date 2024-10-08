import { FormControl, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react";
import { useController } from "react-hook-form";

import { is } from "~/lib";

import type { TextareaProps } from "@chakra-ui/react";
import type { FieldValues } from "react-hook-form";
import type { TextAreaProps } from "./types";

export const TextArea = <V extends FieldValues>(props: TextAreaProps<TextareaProps, V>) => {
  const { name, field, defaultValue, rules = {}, isRequired = false, ...rest } = props;

  // const { register } = useFormContext<V>();
  const {
    field: register,
    fieldState: { error },
  } = useController({ name, rules: { required: isRequired, ...rules } });

  return (
    <FormControl
      id={`form-control--${name}`}
      isRequired={isRequired}
      isInvalid={typeof error !== "undefined"}
    >
      {is(field.label) && <FormLabel>{field.label}</FormLabel>}
      <Textarea
        resize="vertical"
        h={{ base: "10rem", lg: "unset" }}
        _placeholder={{
          _light: { opacity: 0.8, color: "gray.600" },
          _dark: { color: "whiteAlpha.600", opacity: 1 },
        }}
        {...register}
        {...rest}
      />
      <FormErrorMessage>{typeof error !== "undefined" && error.message}</FormErrorMessage>
    </FormControl>
  );
};
