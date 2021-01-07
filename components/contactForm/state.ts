import { createState, useState } from '@hookstate/core';
import type { IFormState, FormState } from './types';

export const formState = createState<IFormState>({
  form: {} as IFormState['form'],
  selectedIndex: null,
  selectedName: null,
  showSuccess: false,
});

export const useFormState = (): FormState => useState(formState);
