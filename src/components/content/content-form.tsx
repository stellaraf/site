import { Card, CardBody, GenericForm } from "~/components";

import type { ContentFormProps } from "./types";

export const ContentForm = (props: ContentFormProps) => {
  const { form, ...rest } = props;
  return (
    <Card py={16} height="min-content" w={{ base: "20rem", md: "80%" }} {...rest}>
      <CardBody>
        <GenericForm {...form} />
      </CardBody>
    </Card>
  );
};
