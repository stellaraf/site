import { useEffect } from "react";

import { useRouter } from "next/router";

import { isValidFormQuery } from "./guards";

import type { ContactForms } from "~/queries";

interface UseFormQueryParams {
  cards: ContactForms;
  setSelected(title: string): void;
  toggleLayout(): void;
}

export function useFormQuery(params: UseFormQueryParams): void {
  const { cards, setSelected, toggleLayout } = params;
  /**
   * If valid query parameters are passed in the URL, e.g. /contact?form=sales or
   * /contact?form=support, automatically load the corresponding form.
   */
  const { query } = useRouter();

  useEffect(() => {
    if (isValidFormQuery(query)) {
      const match = cards.find(c => c.title.toLowerCase() === query.form.toLowerCase());
      if (typeof match !== "undefined") {
        setSelected(match.title);
        toggleLayout();
      }
    }
  }, [query]);
}
