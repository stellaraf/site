import { List, ListItem } from "@chakra-ui/react";

import type { UlProps, OlProps, LiProps } from "./types";

export const Ul: React.FC<UlProps> = (props: UlProps) => (
  <List styleType="circle" ml={8} {...props} />
);

export const Ol: React.FC<OlProps> = (props: OlProps) => (
  <List as="ol" styleType="decimal" ml={8} {...props} />
);

export const Li: React.FC<LiProps> = (props: LiProps) => (
  <ListItem css={{ "& p": { marginTop: 0, marginBottom: 0 } }} {...props} />
);
