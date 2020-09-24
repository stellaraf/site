import * as React from 'react';
import { useState } from 'react';
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

import type { ISubscribe, ISubscribeFormData, ToastStatus } from './types';

export const Subscribe = (props: ISubscribe) => {
  const {
    subscribeTitle = 'Subscribe to our newsletter',
    subscribeSuccess = 'Thanks! Please check your email to confirm your subscription.',
    subscribeDuration = 5,
    subscribeGenericError = 'Something went wrong.',
  } = useConfig();
  const titleMe = useTitle();
  const toast = useToast();
  const [toastMsg, setToastMsg] = useState<string>(subscribeGenericError);
  const [toastStatus, setToastStatus] = useState<ToastStatus>('error');

  const methods = useForm({ resolver: yupResolver(subscribeSchema) });

  const onSubmit = async (data: ISubscribeFormData) => {
    try {
      const res = await subscribeEmail(data.email);
      const json = await res.json();
      if (json.error) {
        methods.setError('email', json.error);
        setToastMsg(json.error);
      } else {
        setToastMsg(subscribeSuccess);
        setToastStatus('success');
      }
    } catch (err) {
      console.error(err);
      methods.setError('email', err.message);
      setToastMsg(err.message);
    }
    if (methods.errors.email) {
      setToastMsg(methods.errors.email.message);
    }
    toast({
      status: toastStatus,
      description: toastMsg,
      duration: subscribeDuration * 1000,
      isClosable: true,
      position: 'bottom-right',
      render: ({ id, onClose }) => (
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
          status={toastStatus}>
          <AlertIcon />
          <Flex flex="1">
            <AlertDescription display="block">{toastMsg}</AlertDescription>
          </Flex>
          <CloseButton size="sm" onClick={onClose} position="absolute" right={1} top={1} />
        </Alert>
      ),
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
