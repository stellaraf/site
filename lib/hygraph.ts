import { objectHasProperty } from "./generic";

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

  if (typeof node === "string" || typeof node === "number" || typeof node === "boolean") {
    return String(node);
  }

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
