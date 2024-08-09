import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";

import { SelectDynamic, isSingleValue } from "~/components";
import { useAddressSearch } from "~/hooks";

import { useEffect, useState } from "react";
import { SelectOptionSingle } from "~/types";
import type { SelectDynamicFieldProps } from "./types";

export const AddressSearchField = (props: SelectDynamicFieldProps) => {
  const { name, field, required = false, defaultValue, ...rest } = props;
  const { setValue, control } = useFormContext();
  const [realValue, setRealValue] = useState<SelectOptionSingle | null>(null);

  const {
    field: { onChange, onBlur, ref },
    fieldState: { error },
    formState: { isSubmitted },
  } = useController({ name, control, rules: { required }, defaultValue });

  typeof error !== "undefined" && console.warn(error);

  const options = useAddressSearch();

  useEffect(() => {
    isSubmitted && setRealValue(null);
  }, [isSubmitted]);

  return (
    <FormControl id={name} isInvalid={typeof error !== "undefined"} isRequired={required}>
      <SelectDynamic
        ref={ref}
        name={name}
        onBlur={onBlur}
        isMulti={false}
        required={required}
        options={options}
        onChange={value => {
          console.log(value);
          if (isSingleValue(value)) {
            setRealValue(value);
            setValue(name, value.value);
            onChange(value.value);
          } else {
            setValue(name, "");
            onChange("");
            setRealValue(null);
          }
        }}
        defaultValue={defaultValue}
        value={realValue}
        {...rest}
      />

      <FormErrorMessage>
        {typeof error !== "undefined" && error.message?.toString()}
      </FormErrorMessage>
    </FormControl>
  );
};
