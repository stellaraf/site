import { objectHasProperty } from "./generic";

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

type ReactTextNode = {
  text: string;
};

type ReactLinkNode = {
  children: Array<RecursiveReactNode>;
  href: string;
  openInNewTab: boolean;
  type: string;
};

type RecursiveReactNode = ReactTextNode | ReactLinkNode | Array<RecursiveReactNode>;

export function getTextValueFromReactNode(node: unknown): string {
  const isTextNode = (obj: unknown): obj is ReactTextNode => objectHasProperty(obj, "text");
  const hasProps = (obj: unknown): obj is { props: unknown } => objectHasProperty(obj, "props");
  const hasContent = (obj: { props: unknown }): obj is { props: { content: unknown } } =>
    objectHasProperty(obj.props, "content");
  const hasChildren = (obj: unknown): obj is { children: unknown } =>
    objectHasProperty(obj, "children");

  if (Array.isArray(node)) {
    return node.map(getTextValueFromReactNode).join("");
  }

  if (isTextNode(node)) {
    return node.text;
  }

  if (hasProps(node) && hasContent(node)) {
    return getTextValueFromReactNode(node.props.content);
  }

  if (hasChildren(node) && Array.isArray(node.children)) {
    return node.children.map(getTextValueFromReactNode).join("");
  }

  return "";
}
