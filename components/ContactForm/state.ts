import { createState, useState } from '@hookstate/core';
import type { IFormState, FormState } from './types';

export const formState = createState<IFormState>({
  selectedIndex: null,
  selectedName: null,
  form: Object(),
});

export const useFormState = (): FormState => useState(formState);
