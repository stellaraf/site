import { useRouter } from "next/router";

import { Button } from "@chakra-ui/react";

import { useDraft } from "~/context";

export const Preview = () => {
  const { push } = useRouter();
  const [, setDraft] = useDraft();
  return (
    <Button
      py={6}
      left={0}
      bottom={0}
      pos="fixed"
      zIndex={10}
      width="100%"
      height="2vh"
      fontSize="lg"
      borderRadius={0}
      userSelect="none"
      colorScheme="red"
      onClick={async () => {
        setDraft(prev => !prev);
        await fetch("/api/draft-disable");
        push("/");
      }}
    >
      Exit Preview Mode
    </Button>
  );
};
