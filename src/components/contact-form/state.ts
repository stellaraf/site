import { useCallback, useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useContactFormCtx } from "./context";
import { isSupportedForm } from "./guards";

import type { IContactCard } from "~/types";
import type { FormIcon, AvailableForms } from "./types";

interface ContactFormValues {
  /**
   * Currently selected form name. `null` if no form is selected (indicates card row view).
   */
  selected: Nullable<keyof AvailableForms>;

  /**
   * Success message, determined by the currently `selected` form.
   */
  successMessage: Nullable<string>;

  /**
   * Contact forms by name, e.g. `{ Support: { ...data } }`
   */
  form: AvailableForms;

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
  reset: NoOp;

  /**
   * Determine if form identified by `name` parameter should be rendered.
   *
   * @param name Form name
   */
  shouldRender: (name: keyof AvailableForms) => boolean;

  /**
   * Set the selected form by name.
   */
  setSelected: (name: FormIcon) => void;

  /**
   * Populate form configuration from CMS data. This should only be run once during initialization.
   */
  addForms: (c: IContactCard[]) => void;
}

const formAtom = atom<ContactFormValues>({
  key: "formState",
  default: {
    selected: null,
    form: {} as AvailableForms,
    showSuccess: false,
    successMessage: null,
  },
});

export function useContactForm(): ContactFormValues & ContactFormMethods {
  const [state, setState] = useRecoilState(formAtom);

  const cards = useContactFormCtx();

  const addForms = useCallback((cards: IContactCard[]): void => {
    const current = state.form;

    // If no forms are present, add them.
    if (Object.keys(current).length === 0) {
      const form = {} as AvailableForms;

      for (const card of cards) {
        const { icon: name, form: value } = card;
        if (name !== "Docs" && typeof value !== "undefined") {
          // @ts-expect-error TS doesn't know which name corresponds to the value, but it's all good.
          form[name] = value;
        }
      }
      setState(prev => ({ ...prev, form }));
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
    (name: keyof AvailableForms): boolean => !state.showSuccess && state.selected === name,
    [state.showSuccess, state.selected],
  );

  const setSelected = useCallback((selected: FormIcon): void => {
    if (isSupportedForm(selected)) {
      const successMessage = state.form[selected].successMessage;
      setState(prev => ({ ...prev, selected, successMessage }));
    }
  }, []);

  addForms(cards);

  useEffect(() => {
    // Populate the store's form values from context.
    // addForms(cards);
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

/**
 * Access only a specific form configuration.
 *
 * @param name Form name.
 * @returns Form configuration state.
 */
export function useContactFormConfig<K extends keyof AvailableForms>(name: K): AvailableForms[K] {
  const state = useRecoilValue(formAtom);
  return state.form[name];
}
