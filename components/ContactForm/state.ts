import { createContext, useContext } from 'react';
import { createState } from '@hookstate/core';
import type { IFormState, FormState } from './types';

export const formState = createState<IFormState>({
  selectedIndex: null,
  selectedName: null,
  formPlaceholders: {
    name: 'Fallback',
    firstName: 'First Name',
    lastName: 'Last Name',
    emailAddress: 'Email Address',
    companyName: 'Company',
    phoneNumber: 'Phone Number',
    interests: 'Interests',
    submitButton: 'Submit',
    details: 'Details',
  },
});
export const ContactFormContext = createContext<FormState>(formState);
export const useFormState = (): FormState => useContext(ContactFormContext);
