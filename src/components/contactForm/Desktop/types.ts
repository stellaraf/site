import type { CustomColors } from "~/types";
import type { FormHandlers } from "../Forms/types";

export interface IDesktopForm {
  title: string;
  body: string;
  icon: JSX.Element;
  accent: keyof CustomColors;
  toggleLayout: (i?: number) => void;
  formRef: React.MutableRefObject<FormHandlers>;
  onSubmit?: () => void;
}
