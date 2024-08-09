import { useCallback } from "react";

import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";

import { Select } from "~/components";

import type { GroupBase, OptionsOrGroups } from "chakra-react-select";
import type { SelectOptionSingle } from "~/types";
import type { SelectFieldProps } from "./types";

function selectMultiple(
  options: OptionsOrGroups<SelectOptionSingle, GroupBase<SelectOptionSingle>> | undefined,
  value: string[],
  creatable: boolean,
): SelectOptionSingle[] {
  return value.reduce<SelectOptionSingle[]>((matching, each) => {
    if (Array.isArray(options)) {
      if (creatable) {
        matching.push({ value: value[0], label: value[0] });
      }
      for (const option of options) {
        if (option.value === each) {
          matching.push(option);
        }
      }
    }
    return matching;
  }, []);
}

function selectSingle(
  options: OptionsOrGroups<SelectOptionSingle, GroupBase<SelectOptionSingle>> | undefined,
  value: string,
  creatable: boolean,
): SelectOptionSingle | null {
  if (Array.isArray(options)) {
    if (creatable) {
      return { value, label: value };
    }
    for (const option of options) {
      if (option.value === value) {
        return option;
      }
    }
  }
  return null;
}

export const SelectField = (props: SelectFieldProps) => {
  const {
    options,
    name,
    field,
    isMulti = false,
    required = false,
    creatable = false,
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
        options={options}
        onBlur={onBlur}
        isMulti={isMulti}
        required={required}
        onSelect={handleSelect}
        defaultValue={defaultValue}
        creatable={creatable}
        value={
          isMulti
            ? selectMultiple(options, value, creatable)
            : selectSingle(options, value, creatable)
        }
        {...rest}
      />

      <FormErrorMessage>
        {typeof error !== "undefined" && error.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
};
