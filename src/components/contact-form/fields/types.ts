import type { SelectProps } from "~/components";
import type { SelectOptionSingle } from "~/types";

export interface SelectFieldProps
  extends Omit<SelectProps<SelectOptionSingle>, "name" | "onSelect" | "options"> {
  id: string;
  opts: SelectOptionSingle[];
}
