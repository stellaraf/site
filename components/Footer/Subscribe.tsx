import * as React from 'react';
import {
  VStack,
  IconButton,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/core';
import { FaArrowAltCircleRight as RightArrow } from '@meronex/icons/fa';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useConfig, useColorValue } from 'site/context';
import { useTitle } from 'site/hooks';
import type { ISubscribe, ISubscribeInput } from './types';

const subscribeSchema = yup.object().shape({
  email: yup.string().email(),
});

const InputField = (props: ISubscribeInput) => {
  const styles = useColorValue(
    {
      bg: 'whiteAlpha.100',
      borderColor: 'whiteAlpha.50',
      _hover: { borderColor: 'whiteAlpha.300' },
    },
    {},
  );
  return (
    <InputGroup>
      <Input placeholder="Email Address" {...styles} {...props} />
      <InputRightElement>
        <IconButton
          type="submit"
          p={2}
          h="100%"
          title="Subscribe"
          aria-label="Subscribe"
          variant="unstyled"
          alignItems="center"
          display="inline-flex"
          color="original.light"
          _hover={{ color: 'original.tertiary' }}
          icon={<RightArrow />}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export const Subscribe = (props: ISubscribe) => {
  const { subscribeTitle = '' } = useConfig();
  const titleMe = useTitle();
  const { control, handleSubmit, errors } = useForm({ resolver: yupResolver(subscribeSchema) });
  const onSubmit = (data: Object) => {
    console.dir(data, { depth: null });
  };
  return (
    <VStack
      as="form"
      w="25%"
      zIndex={1}
      align="flex-end"
      spacing={6}
      onSubmit={handleSubmit(onSubmit)}
      {...props}>
      <Text>{titleMe(subscribeTitle)}</Text>
      <FormControl isInvalid={errors.email}>
        <Controller as={InputField} name="email" control={control} defaultValue="" />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};
