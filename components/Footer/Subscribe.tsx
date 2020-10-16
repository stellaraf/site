import * as React from 'react';
import { useEffect } from 'react';
import { useState } from '@hookstate/core';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/core';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useConfig } from 'site/context';
import { useGoogleAnalytics, useTitle } from 'site/hooks';
import { SubscribeField } from './SubscribeField';
import { subscribeEmail, subscribeSchema } from './util';

import type { ISubscribe, ISubscribeFormData, ISubscribeToast } from './types';

export const Subscribe = (props: ISubscribe) => {
  const { alertProps = {}, alertPosition = 'bottom-right', ...rest } = props;
  const {
    subscribeTitle = 'Subscribe to our newsletter',
    subscribeSuccess = 'Thanks! Please check your email to confirm your subscription.',
    subscribeDuration = 5,
    subscribeGenericError = 'Something went wrong.',
  } = useConfig();
  const mount = useState<boolean>(false);
  const titleMe = useTitle();
  const toast = useToast();
  const toastState = useState<ISubscribeToast>({ status: 'error', message: subscribeGenericError });
  const methods = useForm({ resolver: yupResolver(subscribeSchema) });
  const { trackEvent } = useGoogleAnalytics();
  const { setError, errors } = methods;
  const emailError = errors.email?.message;

  const handleError = (error: string) => {
    console.error(error);
    emailError !== error && setError('email', { type: 'manual', message: error });
    toastState.set({ status: 'error', message: error });
    trackEvent({ category: 'User', action: 'Error Subscribing to Newsletter' });
  };

  const handleSuccess = (message: string) => {
    toastState.set({ status: 'success', message });
    trackEvent({ category: 'User', action: 'Subscribed to Newsletter' });
  };

  const onSubmit = async (data: ISubscribeFormData) => {
    try {
      let json = null;
      if (mount.get()) {
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
      handleError(err.message);
    }
    toast({
      duration: subscribeDuration * 1000,
      isClosable: true,
      position: alertPosition,
      render: ({ id, onClose }) => {
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
            status={toastState.status.get()}
            {...alertProps}>
            <AlertIcon />
            <Flex flex="1">
              <AlertDescription display="block">{toastState.message.get()}</AlertDescription>
            </Flex>
            <CloseButton size="sm" onClick={onClose} position="absolute" right={1} top={1} />
          </Alert>
        );
      },
    });
    return;
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      !mount.value && mount.set(true);
    }
  }, []);
  return (
    <FormProvider {...methods}>
      <VStack
        as="form"
        w="25%"
        zIndex={1}
        align="flex-end"
        spacing={6}
        onSubmit={methods.handleSubmit(onSubmit)}
        {...rest}>
        <Text>{titleMe(subscribeTitle)}</Text>
        <FormControl isInvalid={methods.errors.email}>
          <Controller as={SubscribeField} name="email" control={methods.control} defaultValue="" />
          <FormErrorMessage>{methods.errors.email?.message}</FormErrorMessage>
        </FormControl>
      </VStack>
    </FormProvider>
  );
};
