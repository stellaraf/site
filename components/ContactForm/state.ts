import { createContext, useContext } from 'react';
import { createState } from '@hookstate/core';
import type { IFormState, FormState } from './types';

export const formState = createState<IFormState>({
  selectedIndex: null,
  selectedName: null,
  form: Object(),
});
export const ContactFormContext = createContext<FormState>(formState);
export const useFormState = (): FormState => useContext(ContactFormContext);
