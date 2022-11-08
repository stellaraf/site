import type { RichTextContent, ElementNode } from "@graphcms/rich-text-types";

function isEmptyElement(element: ElementNode): boolean {
  for (const child of element.children) {
    if (child.text === "" || child.text === null) {
      return true;
    }
  }
  return false;
}

export function isEmptyContent(content: RichTextContent | null | undefined): boolean {
  if (content === null || typeof content === "undefined") {
    return true;
  }
  if (Array.isArray(content)) {
    for (const child of content) {
      if (isEmptyElement(child)) {
        return true;
      }
    }
  } else {
    return isEmptyContent(content.children);
  }
  return false;
}
