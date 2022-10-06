import { useMobile } from "~/hooks";

import { ContactFormProvider } from "./context";
import { DFormCardGroup } from "./desktop";
import { MFormCardGroup } from "./mobile";

import type { FormCardGroupProps } from "./types";

export const FormCardGroup = (props: FormCardGroupProps) => {
  const { cards } = props;
  const isMobile = useMobile();
  return (
    <ContactFormProvider value={cards}>
      {isMobile ? <MFormCardGroup /> : <DFormCardGroup />}
    </ContactFormProvider>
  );
};
