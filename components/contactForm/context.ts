import { createContext, useContext } from 'react';
import type { IContactCard } from '~/types';

const ContactFormCtx = createContext<IContactCard[]>([]);

export const ContactFormProvider = ContactFormCtx.Provider;

export const useContactFormCtx = (): IContactCard[] => useContext<IContactCard[]>(ContactFormCtx);
