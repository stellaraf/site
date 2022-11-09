import { useCallback } from "react";

import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useFormContext, useController } from "react-hook-form";

import { Select } from "~/components";

import type { SelectFieldProps } from "./types";
import type { SelectOptionSingle } from "~/types";

function selectMultiple(options: SelectOptionSingle[], value: string[]): SelectOptionSingle[] {
  return value.reduce<SelectOptionSingle[]>((matching, each) => {
    for (const option of options) {
      if (option.value === each) {
        matching.push(option);
      }
    }
    return matching;
  }, []);
}

function selectSingle(options: SelectOptionSingle[], value: string): SelectOptionSingle | null {
  for (const option of options) {
    if (option.value === value) {
      return option;
    }
  }
  return null;
}

export const SelectField = (props: SelectFieldProps) => {
  const {
    opts,
    name,
    field,
    isMulti = false,
    required = false,
    defaultValue = [],
    ...rest
  } = props;
  const { setValue, control } = useFormContext();

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control, rules: { required }, defaultValue });

  typeof error !== "undefined" && console.warn(error);

  const handleSelect = useCallback(
    (values: readonly SelectOptionSingle[]) => {
      const labels = values.reduce<string[]>((final, value) => {
        if (value.label) {
          final.push(value.label);
        }
        return final;
      }, []);
      setValue(name, labels);
      onChange(labels);
    },
    [name, setValue],
  );

  return (
    <FormControl id={name} isInvalid={typeof error !== "undefined"} isRequired={required}>
      <Select
        ref={ref}
        name={name}
        options={opts}
        onBlur={onBlur}
        isMulti={isMulti}
        required={required}
        onSelect={handleSelect}
        defaultValue={defaultValue}
        value={isMulti ? selectMultiple(opts, value) : selectSingle(opts, value)}
        {...rest}
      />

      <FormErrorMessage>
        {typeof error !== "undefined" && error.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
};
