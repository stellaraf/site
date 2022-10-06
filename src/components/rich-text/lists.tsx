import { List, ListItem } from "@chakra-ui/react";

import type { ListProps, ListItemProps } from "@chakra-ui/react";

export const Ul = (props: ListProps) => <List styleType="circle" ml={8} {...props} />;

export const Ol = (props: ListProps) => <List as="ol" styleType="decimal" ml={8} {...props} />;

export const Li = (props: ListItemProps) => (
  <ListItem css={{ "& p": { mt: 0, mb: 0 } }} {...props} />
);
