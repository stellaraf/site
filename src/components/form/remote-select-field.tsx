import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

import { Select } from "~/components";
import { selectMultiple, selectSingle } from "./select-field";

import type { SelectOptionSingle } from "~/types";
import type { RemoteSelectFieldProps } from "./types";

function useOptions(path: string): { options: SelectOptionSingle[]; error: unknown } {
  const [options, setOptions] = useState<SelectOptionSingle[]>([]);
  const [error, setError] = useState<unknown>(undefined);
  useEffect(() => {
    fetch(path)
      .then(res => {
        res
          .json()
          .then(data => {
            setOptions(data as SelectOptionSingle[]);
          })
          .catch(err => {
            setError(err);
          });
      })
      .catch(err => setError(err));
  }, [path]);
  return { options, error };
}

export const RemoteSelectField = (props: RemoteSelectFieldProps) => {
  const {
    name,
    field,
    isMulti = false,
    required = false,
    defaultValue = isMulti ? [] : null,
    ...rest
  } = props;

  const { options, error: queryError } = useOptions(field.dataPath);
  const { setValue, control } = useFormContext();

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control, rules: { required }, defaultValue });

  const selector = useMemo(() => (isMulti ? selectMultiple : selectSingle), [isMulti]);

  const errorMessage = useMemo(() => {
    if (typeof error !== "undefined") {
      return error.message?.toString();
    }
    if (typeof queryError !== "undefined") {
      return String(queryError);
    }
  }, [queryError, error]);

  typeof errorMessage !== "undefined" && console.warn(error);

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
        setValue(name, values[0].value);
        onChange(values[0].value);
      }
    },
    [name, setValue],
  );

  return (
    <FormControl
      id={`form-control--${name}`}
      isInvalid={typeof errorMessage !== "undefined"}
      isRequired={required}
    >
      <Select
        ref={ref}
        name={name}
        onBlur={onBlur}
        creatable={false}
        isMulti={isMulti}
        options={options}
        required={required}
        onSelect={handleSelect}
        defaultValue={defaultValue}
        value={selector(options, value, false)}
        {...rest}
      />
      <FormErrorMessage>{typeof errorMessage !== "undefined" && errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
