import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import {
  FaArrowAltCircleRight as RightArrow,
  FaCheckCircle as Check,
  FaTimesCircle as Error,
} from '@meronex/icons/fa';
import { useFormContext } from 'react-hook-form';
import { useColorValue, useConfig } from 'site/context';

import type { ISubscribeInput } from './types';

const borderLight = ['whiteAlpha.50', 'green.100'];
const borderDark = [undefined, 'green.100'];
const hoverBorderLight = ['whiteAlpha.300', 'green.300'];
const hoverBorderDark = [undefined, 'green.300'];

export const SubscribeField = (props: ISubscribeInput) => {
  const {
    subscribeTitle = 'Subscribe to our newsletter',
    subscribePlaceholder = 'Email Address',
  } = useConfig();

  const { formState } = useFormContext();
  const { isSubmitting, isSubmitSuccessful, errors } = formState;

  const styles = useColorValue(
    {
      bg: 'whiteAlpha.100',
      borderColor: borderLight[+isSubmitSuccessful],
      boxShadow: borderLight[+isSubmitSuccessful],
      _hover: {
        borderColor: hoverBorderLight[+isSubmitSuccessful],
        boxShadow: hoverBorderLight[+isSubmitSuccessful],
      },
    },
    {
      borderColor: borderDark[+isSubmitSuccessful],
      boxShadow: borderDark[+isSubmitSuccessful],
      _hover: {
        borderColor: hoverBorderDark[+isSubmitSuccessful],
        boxShadow: hoverBorderDark[+isSubmitSuccessful],
      },
    },
  );

  const icon = errors.email ? <Error /> : isSubmitSuccessful ? <Check /> : <RightArrow />;
  const color = errors.email ? 'red.300' : isSubmitSuccessful ? 'green.300' : 'light.500';

  return (
    <InputGroup>
      <Input placeholder={subscribePlaceholder} {...styles} {...props} />
      <InputRightElement>
        <IconButton
          isLoading={isSubmitting}
          type="submit"
          p={2}
          h="100%"
          title={subscribeTitle}
          aria-label={subscribeTitle}
          variant="unstyled"
          alignItems="center"
          display="inline-flex"
          color={color}
          _hover={{ color: 'tertiary.500' }}
          icon={icon}
        />
      </InputRightElement>
    </InputGroup>
  );
};
