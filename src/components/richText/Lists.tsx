import { List, ListItem } from "@chakra-ui/react";

import type { UlProps, OlProps, LiProps } from "./types";

export const Ul = (props: UlProps) => <List styleType="circle" ml={8} {...props} />;

export const Ol = (props: OlProps) => <List as="ol" styleType="decimal" ml={8} {...props} />;

export const Li = (props: LiProps) => <ListItem css={{ "& p": { mt: 0, mb: 0 } }} {...props} />;
