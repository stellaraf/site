import { chakra } from "@chakra-ui/react";
import { components } from "react-select";

import type { GroupBase, OptionProps } from "react-select";
import type { SelectOptionSingle } from "~/types";

export const Option = <Opt extends SelectOptionSingle, IsMulti extends boolean>(
  props: OptionProps<Opt, IsMulti>,
): JSX.Element => {
  const { label } = props;

  return (
    <components.Option<Opt, IsMulti, GroupBase<Opt>> {...props}>
      <chakra.span display={{ base: "block", lg: "inline" }}>{label}</chakra.span>
    </components.Option>
  );
};
