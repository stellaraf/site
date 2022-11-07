import type { UseDisclosureReturn } from "@chakra-ui/react";
import type { RichTextContent } from "@graphcms/rich-text-types";
import type { FormSubmitRef } from "~/components";
import type { ColorNames } from "~/theme";

export interface MobileFormProps {
  title: string;
  body: RichTextContent | null;
  icon: JSX.Element;
  colorScheme: ColorNames;
  onClose: UseDisclosureReturn["onClose"];
  onToggle: UseDisclosureReturn["onToggle"];
  formRef: React.MutableRefObject<FormSubmitRef | null>;
  onSubmit?: () => void;
}
