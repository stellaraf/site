import { useCallback, useEffect } from "react";

import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useFormContext, useController } from "react-hook-form";

import { Select as CustomSelect } from "~/components";

import type { SelectFieldProps } from "./types";
import type { SelectOptionSingle } from "~/types";

export const SelectField = (props: SelectFieldProps) => {
  const { opts, field, name, required = false, isMulti = false, ...rest } = props;
  const { setValue, register } = useFormContext();

  const {
    fieldState: { error },
  } = useController({ name });

  typeof error !== "undefined" && console.warn(error);

  const handleSelect = useCallback(
    (values: readonly SelectOptionSingle[]) => {
      const labels = values.reduce<string[]>((final, value) => {
        if (value.label) {
          final.push(value?.label);
        }
        return final;
      }, []);
      setValue(name, labels);
    },
    [name, setValue],
  );

  useEffect(() => {
    register(name);
  }, [register, name]);

  return (
    <FormControl id={name} isInvalid={typeof error !== "undefined"} isRequired={required}>
      <CustomSelect
        name={name}
        options={opts}
        isMulti={isMulti}
        defaultValue={[]}
        required={required}
        onSelect={handleSelect}
        {...rest}
      />
      <FormErrorMessage>
        {typeof error !== "undefined" && error.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
};
