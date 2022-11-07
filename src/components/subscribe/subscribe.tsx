import { Text, VStack, FormControl, FormErrorMessage, type StackProps } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { z } from "zod";

import { useGoogleAnalytics, useAlert } from "~/hooks";
import { submitForm } from "~/lib";

import { SubscribeField } from "./subscribe-field";

import type { SubscribeFormData } from "./types";

const subscribeSchema = z.object({
  email: z.string().email("Must be a valid email address"),
});

export const Subscribe = (props: StackProps) => {
  const showAlert = useAlert();

  const form = useForm<z.infer<typeof subscribeSchema>>({
    resolver: zodResolver(subscribeSchema),
  });
  const { trackEvent } = useGoogleAnalytics();

  const { control, handleSubmit, getFieldState } = form;

  const onSubmit = async (data: SubscribeFormData) => {
    const res = await submitForm("subscribe", data);
    if (res instanceof Error) {
      trackEvent("Error Subscribing to Newsletter", { event_category: "User" });
      return showAlert({ message: res.message, status: "error" });
    }
    if (!res.ok) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let json: any = {};
      try {
        json = await res.json();
      } catch (error) {
        return showAlert({ message: String(error), status: "error" });
      }
      console.error(res.status, res.statusText, json);
      trackEvent("Error Subscribing to Newsletter", { event_category: "User" });
      if ("error" in json && typeof json.error === "string") {
        return showAlert({ message: json.error, status: "error" });
      }
      return showAlert({ message: res.statusText, status: "error" });
    }
    trackEvent("Subscribed to Newsletter", { event_category: "User" });
    return showAlert({
      message: "Thanks! Please check your email to confirm your subscription.",
      status: "success",
    });
  };

  return (
    <FormProvider {...form}>
      <VStack
        w="25%"
        as="form"
        zIndex={1}
        spacing={6}
        align="flex-end"
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <Text>Subscribe to our newsletter</Text>
        <FormControl isInvalid={typeof getFieldState("email").error !== "undefined"}>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => <SubscribeField field={field} />}
          />
          <FormErrorMessage>{getFieldState("email").error?.message}</FormErrorMessage>
        </FormControl>
      </VStack>
    </FormProvider>
  );
};
