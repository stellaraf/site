import type { RichTextContent } from "@graphcms/rich-text-types";
import type { FormSubmitRef } from "~/components";

export interface DesktopFormProps {
  title: string;
  body: RichTextContent | null;
  icon: JSX.Element;
  toggleLayout: (i?: number) => void;
  formRef: React.MutableRefObject<FormSubmitRef | null>;
  onSubmit?: FormSubmitRef;
}
