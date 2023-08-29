import { useMemo } from "react";

import { slug, getTextValueFromReactNode } from "~/lib";

export const useSlug = (original: string | React.ReactNode, deps: unknown[] = []): string => {
  return useMemo(() => {
    let value = "";
    if (typeof original === "string") {
      value = original;
    } else {
      value = getTextValueFromReactNode(original);
    }
    return slug(value, undefined, "");
  }, [original, ...deps]);
};
