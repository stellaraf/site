import { useCallback, useEffect } from "react";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Select as CustomSelect } from "~/components";

import type { SelectOptionSingle } from "~/types";
import type { SelectFieldProps } from "./types";

export const SelectField = (props: SelectFieldProps) => {
  const { opts, id: name, required = false, isMulti = false, ...rest } = props;
  const { formState, setValue, register } = useFormContext();
  const { errors } = formState;

  errors?.[name] && console.table(errors);

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
  }, [register]);

  const fieldError = errors?.[name];

  return (
    <FormControl id={name} isInvalid={typeof fieldError !== "undefined"} isRequired={required}>
      <CustomSelect
        name={name}
        isMulti={isMulti}
        options={opts}
        defaultValue={[]}
        required={required}
        onSelect={handleSelect}
        {...rest}
      />
      <FormErrorMessage>
        {typeof fieldError !== "undefined" && fieldError.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
};
