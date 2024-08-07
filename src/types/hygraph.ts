import type { RichTextProps } from "@graphcms/rich-text-react-renderer";
import type { ElementNode, RichTextContent } from "@graphcms/rich-text-types";
import type { Asset as BaseAsset } from "./schema";

export type RichTextValue = {
  raw?: RichTextContent | null;
  references?: RichTextProps["references"];
};

export type ImageAsset = Pick<BaseAsset, "fileName" | "height" | "width" | "mimeType" | "url">;

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
