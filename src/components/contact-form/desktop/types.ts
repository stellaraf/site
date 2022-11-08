import type { FormSubmitRef } from "~/components";
import type { RichTextValue } from "~/types";

export interface DesktopFormProps {
  title: string;
  body: RichTextValue | null;
  icon: JSX.Element;
  toggleLayout: (i?: number) => void;
  formRef: React.MutableRefObject<FormSubmitRef | null>;
  onSubmit?: FormSubmitRef;
}
