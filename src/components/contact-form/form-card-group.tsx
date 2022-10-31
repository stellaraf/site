import { useMobile } from "~/hooks";

import { ContactFormProvider } from "./context";
import { DFormCardGroup } from "./desktop";
import { MFormCardGroup } from "./mobile";

import type { FormCardGroupProps } from "./types";

export const FormCardGroup = (props: FormCardGroupProps) => {
  const { contactForms } = props;
  const isMobile = useMobile();
  return (
    <ContactFormProvider value={contactForms}>
      {isMobile ? <MFormCardGroup /> : <DFormCardGroup />}
    </ContactFormProvider>
  );
};
