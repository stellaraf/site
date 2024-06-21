import { useMemo } from "react";

import { isEmptyRichText } from "~/lib";

import type { RichTextValue } from "~/types";

/**
 * Find the first non-null non-undefined non-empty Rich Text body.
 */
export function useBody(...bodies: (RichTextValue | null | undefined)[]): RichTextValue | null {
  return useMemo(() => {
    for (const body of bodies) {
      if (!isEmptyRichText(body)) {
        return body;
      }
    }
    return null;
  }, []);
}
