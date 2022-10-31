import { isFormButton } from "~/components";

import type { FormElements } from "./types";
import type { ContactForm } from "~/queries";

export function separateFormFields(form: ContactForm | null): FormElements {
  const defaultValue: FormElements = { button: null, fields: [] };
  if (form === null) {
    return defaultValue;
  }
  return form.fields.reduce<FormElements>((final, field) => {
    if (isFormButton(field)) {
      final.button = field as FormElements["button"];
    } else {
      final.fields.push(field as ArrayElement<FormElements["fields"]>);
    }
    return final;
  }, defaultValue);
}
