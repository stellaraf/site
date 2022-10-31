import { Card, CardBody, GenericForm } from "~/components";

import type { ContentFormProps } from "./types";

export const ContentForm = (props: ContentFormProps) => {
  const { name, fields, colorScheme, button, ...rest } = props.form;
  return (
    <Card py={16} height="min-content" w={{ base: "20rem", md: "80%" }} {...rest}>
      <CardBody>
        <GenericForm button={button} colorScheme={colorScheme} fields={fields} />
      </CardBody>
    </Card>
  );
};
