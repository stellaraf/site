import create from 'zustand';
import { useContactFormCtx } from './context';
import { isSupportedForm } from './guards';

import type { SetState, GetState } from 'zustand';
import type { IContactCard } from '~/types';
import type { FormIcon, AvailableForms } from './types';

interface ContactForm {
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

// function is

const useStore = create<ContactForm>((set: SetState<ContactForm>, get: GetState<ContactForm>) => ({
  selected: null,

  form: {} as AvailableForms,
  showSuccess: false,
  successMessage: null,

  addForms(cards: IContactCard[]): void {
    const { form: current } = get();

    // If no forms are present, add them.
    if (Object.keys(current).length === 0) {
      const form = {} as AvailableForms;

      for (const card of cards) {
        const { icon: name, form: value } = card;
        if (name !== 'Docs' && typeof value !== 'undefined') {
          // @ts-expect-error TS doesn't know which name corresponds to the value, but it's all good.
          form[name] = value;
        }
      }
      set(state => ({ ...state, form }));
    }
  },

  toggleSuccess(value?: boolean): void {
    set(state => ({ showSuccess: value ?? !state.showSuccess }));
  },

  reset(): void {
    const { selected } = get();
    // If there is a selected value, reset it and set `showSuccess` to `false`.
    if (selected !== null) {
      set(state => ({ ...state, showSuccess: false, selected: null }));
    }
  },

  shouldRender(name: keyof AvailableForms): boolean {
    const { showSuccess, selected } = get();
    return !showSuccess && selected === name;
  },

  setSelected(selected: FormIcon): void {
    const { form } = get();
    if (isSupportedForm(selected)) {
      const successMessage = form[selected].successMessage;
      set(state => ({ ...state, selected, successMessage }));
    }
  },
}));

/**
 * Access the full contact form state and all methods.
 */
export function useContactForm(): ContactForm {
  const store = useStore();
  const cards = useContactFormCtx();
  // Populate the store's form values from context.
  store.addForms(cards);
  return store;
}

/**
 * Access only a specific form configuration.
 *
 * @param name Form name.
 * @returns Form configuration state.
 */
export function useContactFormConfig<K extends keyof AvailableForms>(name: K): AvailableForms[K] {
  return useStore(state => state.form[name]);
}
