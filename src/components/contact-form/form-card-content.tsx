import { Heading, Text } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import type { FormCardContentProps } from "./types";

export const FormCardContent = (props: FormCardContentProps) => {
  const { title, body, icon } = props;
  const fnTitle = useTitleCase();

  return (
    <>
      {icon}
      <Heading as="h3" fontSize="lg">
        {fnTitle(title)}
      </Heading>
      <Text textAlign="center">{body}</Text>
    </>
  );
};
