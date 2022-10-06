import { useCallback, useEffect, useState } from "react";

import {
  Flex,
  Text,
  Alert,
  VStack,
  useToast,
  AlertIcon,
  CloseButton,
  FormControl,
  AlertDescription,
  FormErrorMessage,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useTitleCase } from "use-title-case";
import { z } from "zod";

import { useConfig } from "~/context";
import { useGoogleAnalytics } from "~/hooks";

import { SubscribeField } from "./subscribe-field";
import { subscribeEmail } from "./util";

import type { SubscribeProps, SubscribeFormData, SubscribeToast } from "./types";
import type { RenderProps } from "@chakra-ui/react";

const subscribeSchema = z.object({
  email: z.string().email("Must be a valid email address"),
});

export const Subscribe = (props: SubscribeProps) => {
  const { alertProps = {}, alertPosition = "bottom-right", ...rest } = props;

  const {
    subscribeTitle = "Subscribe to our newsletter",
    subscribeSuccess = "Thanks! Please check your email to confirm your subscription.",
    subscribeDuration = 5,
    subscribeGenericError = "Something went wrong.",
  } = useConfig();

  const [mount, setMount] = useState<boolean>(false);
  const [toastState, setToastState] = useState<SubscribeToast>({
    status: "error",
    message: subscribeGenericError,
  });
  const fnTitle = useTitleCase();
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

  const handleError = useCallback(
    (error: string) => {
      console.error(error);
      emailError !== error && setError("email", { type: "manual", message: error });
      setToastState({ status: "error", message: error });
      trackEvent("Error Subscribing to Newsletter", { event_category: "User" });
    },
    [emailError, setError, setToastState],
  );

  const handleSuccess = useCallback(
    (message: string) => {
      setToastState({ status: "success", message });
      trackEvent("Subscribed to Newsletter", { event_category: "User" });
    },
    [setToastState],
  );

  const showToast = useCallback(() => {
    const render = (props: RenderProps): JSX.Element => {
      const { id, onClose } = props;
      return (
        <Alert
          my={2}
          mb={4}
          pr={8}
          id={id.toString()}
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
  }, [alertProps, toastState.status, alertPosition, subscribeDuration]);

  const onSubmit = useCallback(
    async (data: SubscribeFormData) => {
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

      showToast();
    },
    [handleError, handleSuccess, subscribeSuccess],
  );

  useEffect(() => {
    if (typeof window !== "undefined" && !mount) {
      setMount(true);
    }
  }, []);

  const formField = errors.email;

  return (
    <FormProvider {...form}>
      <VStack
        as="form"
        w="25%"
        zIndex={1}
        align="flex-end"
        spacing={6}
        onSubmit={handleSubmit(onSubmit)}
        {...rest}
      >
        <Text>{fnTitle(subscribeTitle)}</Text>
        <FormControl isInvalid={typeof formField !== "undefined"}>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => <SubscribeField field={field} />}
          />
          <FormErrorMessage>{formField?.message?.toString()}</FormErrorMessage>
        </FormControl>
      </VStack>
    </FormProvider>
  );
};
