import type { MutableRefObject } from "react";
import type { UseDisclosureReturn } from "@chakra-ui/react";
import type { CustomColors } from "~/types";
import type { FormHandlers } from "../Forms/types";

export interface IMobileForm {
  title: string;
  body: string;
  icon: JSX.Element;
  button: JSX.Element;
  onClose: UseDisclosureReturn["onClose"];
  onToggle: UseDisclosureReturn["onToggle"];
  accent: keyof CustomColors;
  formRef: MutableRefObject<FormHandlers>;
  onSubmit?: () => void;
}
