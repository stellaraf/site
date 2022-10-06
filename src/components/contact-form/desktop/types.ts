import type { FormHandlers } from "../forms/types";
import type { CustomColors } from "~/types";

export interface DesktopFormProps {
  title: string;
  body: string;
  icon: JSX.Element;
  accent: keyof CustomColors;
  toggleLayout: (i?: number) => void;
  formRef: React.MutableRefObject<FormHandlers>;
  onSubmit?: () => void;
}
