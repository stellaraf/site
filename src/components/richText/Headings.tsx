import { createElement } from "react";
import { chakra, useStyleConfig, useToken } from "@chakra-ui/react";
import { useSlug } from "~/hooks";
import { useTitleCase } from "use-title-case";

import type { SystemStyleObject } from "@chakra-ui/styled-system";
import type { HeadingProps, THeadingLevels } from "./types";

function createHeading(level: number, baseStyle: SystemStyleObject): React.FC<HeadingProps> {
  const Base = chakra("h2", { baseStyle: { mb: 2, mt: 12, ...baseStyle } });

  const HeadingComponent = (props: HeadingProps): JSX.Element => {
    const { children, ...rest } = props;
    const fnTitle = useTitleCase();
    let title = children;
    if (typeof children === "string") {
      title = fnTitle(children);
    }
    const headingLevel = `h${level}` as THeadingLevels;
    const sx = useStyleConfig("Heading", props);
    const headingSize = (sx?.fontSize as string | string[]) ?? "md";
    const fontSize = useToken("fontSizes", headingSize);
    const slug = useSlug(title as string, [title]);

    return createElement(
      Base,
      { as: headingLevel, id: slug, css: { "& > code": { fontSize } }, ...rest },
      title,
    );
  };
  return HeadingComponent;
}

export const H1 = createHeading(1, { my: "1em", size: "xl" });
export const H2 = createHeading(2, { fontWeight: "light", fontSize: "2rem" });
export const H3 = createHeading(3, { pl: 1, size: "md", fontWeight: "normal" });
export const H4 = createHeading(4, { pl: 1, size: "md", fontWeight: "medium" });
export const H5 = createHeading(5, { pl: 1, size: "sm", fontWeight: "medium" });
export const H6 = createHeading(6, { pl: 1, size: "sm", fontWeight: "bold" });
