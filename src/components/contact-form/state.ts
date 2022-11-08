import { useCallback, useEffect } from "react";

import { atom, useRecoilState } from "recoil";

import { useContactFormCtx } from "./context";

import type { ContactForm, ContactForms } from "~/queries";

interface ContactFormValues {
  /**
   * Currently selected form name. `null` if no form is selected (indicates card row view).
   */
  selected: ContactForm | null;

  /**
   * Contact forms by name, e.g. `{ Support: { ...data } }`
   */
  forms: ContactForms;

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
   * Determine if form identified by `name` parameter should be rendered.
   *
   * @param name Form name
   */
  shouldRender: (name: string) => boolean;

  /**
   * Set the selected form by name.
   */
  setSelected: (title: string) => void;

  /**
   * Populate form configuration from CMS data. This should only be run once during initialization.
   */
  addForms: (c: ContactForms) => void;
}

const formAtom = atom<ContactFormValues>({
  key: "formState",
  default: {
    selected: null,
    forms: [],
    showSuccess: false,
  },
});

export function useContactForm(): ContactFormValues & ContactFormMethods {
  const [state, setState] = useRecoilState(formAtom);

  const cards = useContactFormCtx();

  const addForms = useCallback((cards: ContactForms): void => {
    // If no forms are present, add them.
    if (state.forms.length === 0) {
      const withFields = cards.filter(c => c.fields.length !== 0);
      setState(prev => ({ ...prev, forms: withFields }));
    }
  }, []);

  const toggleSuccess = useCallback((value?: boolean): void => {
    setState(prev => ({ ...prev, showSuccess: value ?? !prev.showSuccess }));
  }, []);

  const reset = useCallback((): void => {
    // If there is a selected value, reset it and set `showSuccess` to `false`.
    if (state.selected !== null) {
      setState(prev => ({ ...prev, showSuccess: false, selected: null }));
    }
  }, []);

  const shouldRender = useCallback(
    (name: string): boolean => !state.showSuccess && state.selected?.title === name,
    [state.showSuccess, state.selected],
  );

  const setSelected = useCallback((title: string): void => {
    const selected = state.forms.find(f => f.title === title);
    if (typeof selected !== "undefined") {
      setState(prev => ({ ...prev, selected }));
    }
  }, []);

  useEffect(() => {
    // Populate the store's form values from context.
    addForms(cards);
  }, []);

  return {
    ...state,
    addForms,
    toggleSuccess,
    reset,
    shouldRender,
    setSelected,
  };
}
