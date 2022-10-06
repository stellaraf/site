import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { useColorValue } from "~/context";

import type { InputProps } from "@chakra-ui/react";
import type { FieldValues } from "react-hook-form";
import type { TTextField, TFormField } from "./types";

const Field = <V extends FieldValues>(props: TTextField<V>): JSX.Element => {
  const { field, fieldState, isRequired, ...rest } = props;
  const { name, ...fieldProps } = field;
  const placeholderStyle = useColorValue({ opacity: 0.8, color: "gray.600" }, { color: "whiteAlpha.600" });
  return (
    <FormControl id={name} isRequired={isRequired} isInvalid={typeof fieldState.error !== "undefined"}>
      <Input {...fieldProps} {...rest} _placeholder={placeholderStyle} />
      <FormErrorMessage>{fieldState.error && fieldState.error.message}</FormErrorMessage>
    </FormControl>
  );
};

export const TextInput = <V extends FieldValues>(props: TFormField<InputProps, V>): JSX.Element => {
  const { ctl, id, defaultValue, isRequired = false, ...rest } = props;
  return <Controller<V> name={id} control={ctl} defaultValue={defaultValue} rules={{ required: isRequired }} render={r => <Field<V> isRequired={isRequired} {...r} {...rest} />} />;
};
