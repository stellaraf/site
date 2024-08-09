import { chakra } from "@chakra-ui/react";
import { GroupBase, OptionProps, chakraComponents } from "chakra-react-select";
import type { SelectOptionSingle } from "~/types";

export const Option = <Opt extends SelectOptionSingle, IsMulti extends boolean>(
  props: OptionProps<Opt, IsMulti>,
): JSX.Element => {
  const {
    label,
    data: { description },
  } = props;

  return (
    <chakraComponents.Option<Opt, IsMulti, GroupBase<Opt>> {...props}>
      <chakra.div>
        {label}
        {description && (
          <chakra.span display="block" fontSize="sm" opacity={0.7}>
            {description}
          </chakra.span>
        )}
      </chakra.div>
    </chakraComponents.Option>
  );
};
