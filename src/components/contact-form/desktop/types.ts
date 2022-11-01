import type { RichTextContent } from "@graphcms/rich-text-types";

export interface DesktopFormProps {
  title: string;
  body: RichTextContent | null;
  icon: JSX.Element;
  toggleLayout: (i?: number) => void;
  formRef: React.MutableRefObject<{ submit: () => void } | null>;
  onSubmit?: () => void;
}
