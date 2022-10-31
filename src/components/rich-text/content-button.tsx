import { useTitleCase } from "use-title-case";

import { Button } from "~/components";

import type { ContentButtonProps } from "./types";

export const ContentButton = (props: ContentButtonProps) => {
  const { text, link } = props;
  const fnTitle = useTitleCase();

  return (
    <Button px={4} size="xl" height={12} href={link} variant="heroPrimary">
      {fnTitle(text)}
    </Button>
  );
};
