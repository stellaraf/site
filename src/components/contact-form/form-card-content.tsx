import { Heading, Box } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { RichText } from "~/components";

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
      <Box textAlign="center">
        <RichText>{body}</RichText>
      </Box>
    </>
  );
};
