import type { UseDisclosureReturn } from "@chakra-ui/react";
import type { FormSubmitRef } from "~/components";
import type { ColorNames } from "~/theme";
import type { RichTextValue } from "~/types";

export interface MobileFormProps {
  title: string;
  body: RichTextValue | null;
  icon: JSX.Element;
  colorScheme: ColorNames;
  onClose: UseDisclosureReturn["onClose"];
  onToggle: UseDisclosureReturn["onToggle"];
  formRef: React.MutableRefObject<FormSubmitRef | null>;
  onSubmit?: () => void;
}
