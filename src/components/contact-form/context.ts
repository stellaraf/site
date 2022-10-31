import { createContext, useContext } from "react";

import type { ContactForms } from "~/queries";

const ContactFormCtx = createContext<ContactForms>([]);

export const ContactFormProvider = ContactFormCtx.Provider;

export const useContactFormCtx = (): ContactForms => useContext<ContactForms>(ContactFormCtx);
