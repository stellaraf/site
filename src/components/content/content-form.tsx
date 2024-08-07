import { Card, CardBody, CodeBlock, GenericForm, RichText } from "~/components";
import { useAlert } from "~/hooks";
import { messageFromResponseOrError } from "~/lib";

import type { ContentFormProps } from "./types";

export const ContentForm = (props: ContentFormProps) => {
  const { form, ...rest } = props;
  const showAlert = useAlert();

  const onSuccess = () =>
    showAlert({
      message: <RichText content={form.button.alert?.body} />,
      status: form.button.alert?.level,
    });

  const onFailure = async (result: Response | Error) => {
    const message = await messageFromResponseOrError(result);
    showAlert({
      message: (
        <>
          Something went wrong
          <CodeBlock colorScheme="red">{message}</CodeBlock>
        </>
      ),
    });
  };

  return (
    <Card py={16} height="min-content" w={{ base: "20rem", md: "80%" }} {...rest}>
      <CardBody>
        <GenericForm onSuccess={onSuccess} onFailure={onFailure} {...form} />
      </CardBody>
    </Card>
  );
};
