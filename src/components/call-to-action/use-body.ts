import { useMemo } from "react";

import { isEmptyContent } from "~/lib";

import type { RichTextValue } from "~/types";

/**
 * Find the first non-null non-undefined non-empty Rich Text body.
 */
export function useBody(...bodies: (RichTextValue | null | undefined)[]): RichTextValue | null {
  return useMemo(() => {
    for (const body of bodies) {
      if (!isEmptyContent(body?.raw)) {
        return body as RichTextValue;
      }
    }
    return null;
  }, []);
}
