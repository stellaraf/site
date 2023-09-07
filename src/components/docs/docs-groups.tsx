import { Flex, Wrap, WrapItem } from "@chakra-ui/react";

import { useConfig } from "~/context";

import { DocsGroupCard } from "./docs-group-card";

export const DocsGroups = () => {
  const { docsGroups } = useConfig();
  return (
    <Flex align="center" justify="center" m={4}>
      <Wrap spacing={8} justify="center" overflow="visible">
        {docsGroups.map(group => (
          <WrapItem key={group.title}>
            <DocsGroupCard {...group} />
          </WrapItem>
        ))}
      </Wrap>
    </Flex>
  );
};
