import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

import { RichText } from "~/components";
import { useConfig } from "~/context";

import type { ErrorProps } from "./types";

export const Error = (props: ErrorProps) => {
  const { title, description, children, ...rest } = props;

  const { errorMessage } = useConfig();

  const detail = description ?? children;

  return (
    <Alert
      p={8}
      variant="solid"
      flexDir="column"
      borderRadius="lg"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      maxW={{ base: "100%", lg: "75%", xl: "50%" }}
      status={errorMessage.level}
      {...rest}
    >
      <AlertIcon boxSize={16} mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title ?? "Something Went Wrong"}
      </AlertTitle>
      <AlertDescription
        maxWidth="sm"
        css={{
          "& > p": { marginTop: 0, marginBottom: 0 },
          "& > p > a": { "--link-color": "currentColor" },
        }}
      >
        {detail ? detail : <RichText content={errorMessage.body.raw} />}
      </AlertDescription>
    </Alert>
  );
};
