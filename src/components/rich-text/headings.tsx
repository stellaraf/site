import { createElement } from "react";

import { chakra, useStyleConfig, useToken } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { useSlug } from "~/hooks";
import { getTextValueFromReactNode } from "~/lib";
import { shouldForwardProp } from "~/theme";

import type { Headings, HeadingLevel } from "./types";
import type { HeadingProps } from "@chakra-ui/react";
import type { SystemStyleObject } from "@chakra-ui/styled-system";

function createHeading(level: HeadingLevel, baseStyle: SystemStyleObject): React.FC<HeadingProps> {
  const Base = chakra("h2", { baseStyle: { mb: 2, mt: 12, ...baseStyle }, shouldForwardProp });

  const HeadingComponent = (props: HeadingProps): JSX.Element => {
    const { children, ...rest } = props;

    const fnTitle = useTitleCase();
    let title = children;
    if (typeof children === "string") {
      title = fnTitle(children);
    }

    const headingLevel: Headings = `h${level}`;
    const sx = useStyleConfig("Heading", props);
    const headingSize = (sx?.fontSize as string | string[]) ?? "md";
    const fontSize = useToken("fontSizes", headingSize);
    const titleValue = getTextValueFromReactNode(title);
    const slug = useSlug(titleValue, [title]);

    return createElement(
      Base,
      {
        as: headingLevel,
        id: slug,
        css: { "& > code": { fontSize } },
        ...rest,
      },
      title,
    );
  };
  return HeadingComponent;
}

export const H1 = createHeading(1, { my: "1em", fontSize: "2xl" });
export const H2 = createHeading(2, { fontWeight: "light", fontSize: "2rem" });
export const H3 = createHeading(3, { pl: 1, fontSize: "xl", fontWeight: "normal" });
export const H4 = createHeading(4, { pl: 1, fontSize: "lg", fontWeight: "medium" });
export const H5 = createHeading(5, { pl: 1, fontSize: "lg", fontWeight: "medium" });
export const H6 = createHeading(6, { pl: 1, mt: 1, fontSize: "md", fontWeight: "bold" });
