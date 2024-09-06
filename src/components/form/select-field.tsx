import { useCallback, useMemo } from "react";

import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";

import { Select } from "~/components";

import type { GroupBase, OptionsOrGroups } from "chakra-react-select";
import type { SelectOptionSingle } from "~/types";
import type { SelectFieldProps } from "./types";

export function selectMultiple(
  options: OptionsOrGroups<SelectOptionSingle, GroupBase<SelectOptionSingle>> | undefined,
  value: string[] | null,
  creatable: boolean,
): SelectOptionSingle[] {
  if (value === null) {
    return [];
  }
  return value.reduce<SelectOptionSingle[]>((matching, each) => {
    let match: SelectOptionSingle | undefined;
    if (Array.isArray(options)) {
      for (const option of options) {
        if (option.value === each || option.label === each) {
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

export function selectSingle(
  options: OptionsOrGroups<SelectOptionSingle, GroupBase<SelectOptionSingle>> | undefined,
  value: string,
  creatable: boolean,
): SelectOptionSingle | null {
  if (Array.isArray(options)) {
    if (creatable && value !== null) {
      return { value, label: value };
    }
    for (const option of options) {
      if (option.value === value || option.label === value) {
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

  const selector = useMemo(() => (isMulti ? selectMultiple : selectSingle), [isMulti]);

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
    <FormControl
      id={`form-control--${name}`}
      isInvalid={typeof error !== "undefined"}
      isRequired={required}
    >
      <Select
        ref={ref}
        name={name}
        onBlur={onBlur}
        options={options}
        isMulti={isMulti}
        required={required}
        creatable={creatable}
        onSelect={handleSelect}
        defaultValue={defaultValue}
        value={selector(options, value, creatable)}
        {...rest}
      />
      <FormErrorMessage>
        {typeof error !== "undefined" && error.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
};
