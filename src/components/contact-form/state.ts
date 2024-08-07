import { useCallback } from "react";

import { atom, useAtom, useAtomValue } from "jotai";

import { useContactFormCtx } from "./context";

import type { ContactForm } from "~/queries";

interface ContactFormValues {
  /**
   * Currently selected form name. `null` if no form is selected (indicates card row view).
   */
  selected: ContactForm | null;

  /**
   * If `true`, the form container should show a success message, `false` otherwise.
   */
  showSuccess: boolean;
}

interface ContactFormMethods {
  /**
   * Toggle the `showSuccess` property (or provide a specific `value`).
   */
  toggleSuccess: (value?: boolean) => void;

  /**
   * Reset the form's state.
   */
  reset: () => void;

  /**
   * Set the selected form by name.
   */
  setSelected: (title: string) => void;
}

const formAtom = atom<ContactFormValues>({
  selected: null,
  showSuccess: false,
});

const selectedFormAtom = atom(get => get(formAtom).selected);

export const useSelectedForm = () => useAtomValue(selectedFormAtom);

export function useContactForm(): ContactFormValues & ContactFormMethods {
  const [state, setState] = useAtom(formAtom);

  const cards = useContactFormCtx();

  const toggleSuccess = useCallback((value?: boolean): void => {
    setState(prev => ({ ...prev, showSuccess: value ?? !prev.showSuccess }));
  }, []);

  const reset = useCallback((): void => {
    // If there is a selected value, reset it and set `showSuccess` to `false`.
    if (state.selected !== null) {
      setState(prev => ({ ...prev, showSuccess: false, selected: null }));
    }
  }, []);

  const setSelected = useCallback((title: string): void => {
    const selected = cards.find(f => f.title === title);

    if (typeof selected !== "undefined") {
      setState(prev => ({ ...prev, selected }));
    }
  }, []);

  return {
    ...state,
    toggleSuccess,
    reset,
    setSelected,
  };
}
