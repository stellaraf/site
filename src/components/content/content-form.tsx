import { Card, CardBody, TrialForm } from "~/components";
import { submitTrialForm } from "~/util";

import type { ContentFormProps } from "./types";

export const ContentForm = (props: ContentFormProps) => {
  const { name, ...rest } = props.form;
  return (
    <Card minHeight="lg" height="min-content" w={{ base: "20rem", md: "80%" }}>
      <CardBody>
        <TrialForm name={name} fields={rest} onSubmit={submitTrialForm} />
      </CardBody>
    </Card>
  );
};
