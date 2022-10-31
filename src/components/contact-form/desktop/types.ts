import type { RichTextContent } from "@graphcms/rich-text-types";
import type { FormHandlers } from "../forms/types";

export interface DesktopFormProps {
  title: string;
  body: RichTextContent | null;
  icon: JSX.Element;
  toggleLayout: (i?: number) => void;
  formRef: React.MutableRefObject<FormHandlers>;
  onSubmit?: () => void;
}
