import { Heading, useStyleConfig, useToken } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import type { BaseHeadingProps, HeadingProps, THeadingLevels } from "./types";

const BaseHeading = (props: BaseHeadingProps) => {
  const { level, children, ...rest } = props;
  const titleMe = useTitleCase();

  let title = children;
  if (typeof children === "string") {
    title = titleMe(children);
  }

  const headingLevel = `h${level}` as THeadingLevels;
  const sx = useStyleConfig("Heading", props);
  const headingSize = (sx?.fontSize as string | string[]) ?? "md";
  const fontSize = useToken("fontSizes", headingSize);

  return (
    <Heading as={headingLevel} mb={2} mt={12} css={{ "& > code": { fontSize } }} {...rest}>
      {title}
    </Heading>
  );
};

export const H1: React.FC<HeadingProps> = (props: HeadingProps) => (
  <BaseHeading level={1} my="1em" size="xl" {...props} />
);

export const H2: React.FC<HeadingProps> = (props: HeadingProps) => (
  <BaseHeading level={2} fontWeight="light" fontSize="2rem" {...props} />
);

export const H3: React.FC<HeadingProps> = (props: HeadingProps) => (
  <BaseHeading pl={1} level={3} size="md" fontWeight="normal" {...props} />
);

export const H4: React.FC<HeadingProps> = (props: HeadingProps) => (
  <BaseHeading level={4} pl={1} size="md" fontWeight="medium" {...props} />
);

export const H5: React.FC<HeadingProps> = (props: HeadingProps) => (
  <BaseHeading level={5} pl={1} size="sm" fontWeight="medium" {...props} />
);

export const H6: React.FC<HeadingProps> = (props: HeadingProps) => (
  <BaseHeading level={6} pl={1} size="sm" fontWeight="bold" {...props} />
);
