import type { MutableRefObject } from "react";

import type { FormHandlers } from "../forms/types";
import type { UseDisclosureReturn } from "@chakra-ui/react";
import type { CustomColors } from "~/types";

export interface MobileFormProps {
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
