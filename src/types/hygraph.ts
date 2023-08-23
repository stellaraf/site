import type { RichTextProps } from "@graphcms/rich-text-react-renderer";
import type { RichTextContent, ElementNode } from "@graphcms/rich-text-types";

export type RichTextValue = {
  raw?: RichTextContent | null;
  references?: RichTextProps["references"];
};

function getElementText(elements: ElementNode[]): string[] {
  let parts: string[] = [];
  for (const element of elements) {
    if ("text" in element && typeof element.text === "string") {
      parts = [...parts, element.text];
    }
  }
  return parts;
}

export function getTextValue(props: RichTextValue): string {
  let parts: string[] = [];
  if (Array.isArray(props.raw)) {
    parts = [...parts, ...getElementText(props.raw)];
  } else {
    parts = [...parts, ...getElementText(props.raw!.children)];
  }
  return parts.join("");
}
