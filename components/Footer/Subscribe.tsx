import * as React from 'react';
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
import { useTitle } from 'site/hooks';
import { SubscribeField } from './SubscribeField';
import { subscribeEmail, subscribeSchema } from './util';

import type { ISubscribe, ISubscribeFormData, ISubscribeToast } from './types';

export const Subscribe = (props: ISubscribe) => {
  const {
    subscribeTitle = 'Subscribe to our newsletter',
    subscribeSuccess = 'Thanks! Please check your email to confirm your subscription.',
    subscribeDuration = 5,
    subscribeGenericError = 'Something went wrong.',
  } = useConfig();
  const titleMe = useTitle();
  const toast = useToast();
  const toastState = useState<ISubscribeToast>({ status: 'error', message: subscribeGenericError });
  const methods = useForm({ resolver: yupResolver(subscribeSchema) });

  const { setError, errors } = methods;
  const emailError = errors.email?.message;

  const handleError = (error: string) => {
    console.error(error);
    emailError !== error && setError('email', { type: 'manual', message: error });
    toastState.set({ status: 'error', message: error });
  };

  const handleSuccess = (message: string) => {
    toastState.set({ status: 'success', message });
  };

  const onSubmit = async (data: ISubscribeFormData) => {
    try {
      const res = await subscribeEmail(data.email);
      let json = null;
      if (res) {
        json = await res.json();
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
      position: 'bottom-right',
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
            status={toastState.status.get()}>
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
  return (
    <FormProvider {...methods}>
      <VStack
        as="form"
        w="25%"
        zIndex={1}
        align="flex-end"
        spacing={6}
        onSubmit={methods.handleSubmit(onSubmit)}
        {...props}>
        <Text>{titleMe(subscribeTitle)}</Text>
        <FormControl isInvalid={methods.errors.email}>
          <Controller as={SubscribeField} name="email" control={methods.control} defaultValue="" />
          <FormErrorMessage>{methods.errors.email?.message}</FormErrorMessage>
        </FormControl>
      </VStack>
    </FormProvider>
  );
};
