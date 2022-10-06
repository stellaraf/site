import { useEffect } from "react";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Select as CustomSelect } from "~/components";

import type { SelectOptionSingle } from "~/types";
import type { ISelectField } from "./types";

export const SelectField = (props: ISelectField): JSX.Element => {
  const { opts, id: name, required = false, isMulti = false, ...rest } = props;
  const { formState, setValue, register } = useFormContext();
  const { errors } = formState;

  errors?.[name] && console.table(errors);

  function handleSelect(values: readonly SelectOptionSingle[]): void {
    const labels = [];
    for (const v of values) {
      if (v?.label) {
        labels.push(v.label);
      }
    }
    setValue(name, labels);
  }

  useEffect(() => {
    register(name);
  }, [register]);

  const fieldError = errors?.[name];

  return (
    <FormControl id={name} isInvalid={typeof fieldError !== "undefined"} isRequired={required}>
      <CustomSelect name={name} isMulti={isMulti} options={opts} defaultValue={[]} required={required} onSelect={handleSelect} {...rest} />
      <FormErrorMessage>{typeof fieldError !== "undefined" && fieldError.message?.toString()}</FormErrorMessage>
    </FormControl>
  );
};
