import { type DropdownIndicatorProps, chakraComponents } from "chakra-react-select";
import { Search } from "~/icons";
import type { SelectOptionSingle } from "~/types";

export const DropdownIndicator = <Opt extends SelectOptionSingle, IsMulti extends boolean>(
  props: DropdownIndicatorProps<Opt, IsMulti>,
): JSX.Element => {
  return (
    <chakraComponents.DropdownIndicator {...props}>
      <Search fill="body-fg" _dark={{ opacity: 0.3 }} opacity={0.6} boxSize={4} />
    </chakraComponents.DropdownIndicator>
  );
};
