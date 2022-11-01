import { Children, isValidElement } from "react";

// See: https://github.com/fernandopasik/react-children-utilities/blob/main/src/lib/onlyText.ts

function hasChildren(element: React.ReactNode): element is React.ReactElement<{
  children: React.ReactNode | React.ReactNode[];
}> {
  return (
    isValidElement<{ children?: React.ReactNode[] }>(element) && Boolean(element.props.children)
  );
}

function childToString(child?: React.ReactNode): string {
  if (typeof child === "undefined" || child === null || typeof child === "boolean") {
    return "";
  }

  if (JSON.stringify(child) === "{}") {
    return "";
  }

  return (child as number | string).toString();
}

export function reactChildText(children: React.ReactNode | React.ReactNode[]): string {
  if (!(children instanceof Array) && !isValidElement(children)) {
    return childToString(children);
  }

  return Children.toArray(children).reduce((text: string, child: React.ReactNode): string => {
    let newText = "";

    if (isValidElement(child) && hasChildren(child)) {
      newText = reactChildText(child.props.children);
    } else if (isValidElement(child) && !hasChildren(child)) {
      newText = "";
    } else {
      newText = childToString(child);
    }

    return text.concat(newText);
  }, "");
}
