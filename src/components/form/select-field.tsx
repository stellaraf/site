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
    let match: SelectOptionSingle | undefined;
    if (Array.isArray(options)) {
      for (const option of options) {
        if (option.value === each) {
          match = option;
          matching.push(option);
        }
      }
      if (creatable && typeof match === "undefined") {
        matching.push({ value: value[0], label: value[0] });
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
    if (creatable && value !== null) {
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
    defaultValue = isMulti ? [] : null,
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
      if (values.length === 0 || values === null) {
        setValue(name, defaultValue);
        onChange(defaultValue);
        return;
      }
      if (isMulti) {
        const labels = values.filter(v => !!v.label).map(v => v.label);
        setValue(name, labels);
        onChange(labels);
      } else {
        setValue(name, values[0].label);
        onChange(values[0].label);
      }
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
