import { useMemo } from "react";

import { slug, reactChildText } from "~/util";

export const useSlug = (original: string | React.ReactNode, deps: unknown[] = []): string => {
  return useMemo(() => {
    let value = "";
    if (typeof original === "string") {
      value = original;
    } else {
      value = reactChildText(original);
    }
    return slug(value, undefined, "");
  }, [original, ...deps]);
};
