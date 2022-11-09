import { Text, VStack, type StackProps } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTitleCase } from "use-title-case";
import { z } from "zod";

import { CodeBlock, RichText, createSchema } from "~/components";
import { useConfig } from "~/context";
import { useGoogleAnalytics, useAlert } from "~/hooks";
import { is, submitForm, messageFromResponseOrError } from "~/lib";

import { SubscribeField } from "./subscribe-field";

export const Subscribe = (props: StackProps) => {
  const { subscribe } = useConfig();
  const showAlert = useAlert();
  const fnTitle = useTitleCase();

  const { trackEvent } = useGoogleAnalytics();

  const field = subscribe?.fields[0];

  if (!is(field)) {
    throw new Error("Subscribe field not defined in CMS");
  }

  const schema = createSchema([field]);
  type Schema = z.infer<typeof schema>;

  const defaultValues = { [field.formId]: "" };

  const form = useForm<Schema>({ resolver: zodResolver(schema), defaultValues });

  const onSubmit = async (data: Schema) => {
    const res = await submitForm("subscribe", data);
    const isError = res instanceof Error || !res.ok;

    if (isError) {
      const message = await messageFromResponseOrError(res);
      trackEvent("Error Subscribing to Newsletter", { event_category: "User" });
      return showAlert({
        message: <CodeBlock colorScheme="red">{message}</CodeBlock>,
        status: "error",
      });
    }

    trackEvent("Subscribed to Newsletter", { event_category: "User" });
    showAlert({
      message: <RichText content={subscribe?.button.alert?.body} />,
      status: subscribe?.button.alert?.level ?? "success",
    });
  };

  const title = fnTitle(field.label ?? field.displayName);

  return (
    <VStack
      w="25%"
      as="form"
      zIndex={1}
      spacing={6}
      align="flex-end"
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
    >
      <Text>{title}</Text>
      <SubscribeField
        title={title}
        isSubmitting={form.formState.isSubmitting}
        error={form.getFieldState(field.formId).error}
        isSubmitSuccessful={form.formState.isSubmitSuccessful}
        {...form.register(field.formId, { required: true })}
      />
    </VStack>
  );
};
