import { useEffect, useState } from "react";
import { Flex, Text, Alert, VStack, useToast, AlertIcon, CloseButton, FormControl, AlertDescription, FormErrorMessage } from "@chakra-ui/react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTitleCase } from "use-title-case";
import { useConfig } from "~/context";
import { useGoogleAnalytics } from "~/hooks";
import { SubscribeField } from "./SubscribeField";
import { subscribeEmail } from "./util";

import type { RenderProps } from "@chakra-ui/react";
import type { ISubscribe, ISubscribeFormData, ISubscribeToast } from "./types";

const subscribeSchema = z.object({
  email: z.string().email("Must be a valid email address"),
});

export const Subscribe: React.FC<ISubscribe> = (props: ISubscribe) => {
  const { alertProps = {}, alertPosition = "bottom-right", ...rest } = props;

  const {
    subscribeTitle = "Subscribe to our newsletter",
    subscribeSuccess = "Thanks! Please check your email to confirm your subscription.",
    subscribeDuration = 5,
    subscribeGenericError = "Something went wrong.",
  } = useConfig();

  const [mount, setMount] = useState<boolean>(false);
  const [toastState, setToastState] = useState<ISubscribeToast>({
    status: "error",
    message: subscribeGenericError,
  });
  const titleMe = useTitleCase();
  const toast = useToast();
  const form = useForm<z.infer<typeof subscribeSchema>>({
    resolver: zodResolver(subscribeSchema),
  });
  const { trackEvent } = useGoogleAnalytics();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = form;
  const emailError = errors.email?.message;

  function handleError(error: string): void {
    console.error(error);
    emailError !== error && setError("email", { type: "manual", message: error });
    setToastState({ status: "error", message: error });
    trackEvent("Error Subscribing to Newsletter", { event_category: "User" });
  }

  function handleSuccess(message: string): void {
    setToastState({ status: "success", message });
    trackEvent("Subscribed to Newsletter", { event_category: "User" });
  }

  async function onSubmit(data: ISubscribeFormData): Promise<void> {
    try {
      let json = null;
      if (mount) {
        const res = await subscribeEmail(data.email);
        if (res) {
          json = await res.json();
        }
      }
      if (json?.error) {
        handleError(json.error);
      }
      if (json?.data) {
        handleSuccess(subscribeSuccess);
      }
    } catch (err) {
      console.error(err);
      err instanceof Error && handleError(err.message);
    }

    const render = (props: RenderProps): JSX.Element => {
      const { id, onClose } = props;
      return (
        <Alert
          my={2}
          mb={4}
          pr={8}
          id={`${id}`}
          right={24}
          width="auto"
          fontSize="sm"
          boxShadow="lg"
          variant="solid"
          textAlign="left"
          alignItems="start"
          borderRadius="md"
          status={toastState.status}
          {...alertProps}
        >
          <AlertIcon />
          <Flex flex="1">
            <AlertDescription display="block">{toastState.message}</AlertDescription>
          </Flex>
          <CloseButton size="sm" onClick={onClose} position="absolute" right={1} top={1} />
        </Alert>
      );
    };

    toast({
      render,
      isClosable: true,
      position: alertPosition,
      duration: subscribeDuration * 1000,
    });
    return;
  }

  useEffect(() => {
    if (typeof window !== "undefined" && !mount) {
      setMount(true);
    }
  }, []);

  const formField = errors.email;

  return (
    <FormProvider {...form}>
      <VStack as="form" w="25%" zIndex={1} align="flex-end" spacing={6} onSubmit={handleSubmit(onSubmit)} {...rest}>
        <Text>{titleMe(subscribeTitle)}</Text>
        <FormControl isInvalid={typeof formField !== "undefined"}>
          <Controller name="email" defaultValue="" control={control} render={({ field }) => <SubscribeField field={field} />} />
          <FormErrorMessage>{formField?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </VStack>
    </FormProvider>
  );
};
