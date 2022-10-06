import { useMemo } from "react";

import { IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { DynamicIcon } from "~/components";
import { useColorValue, useConfig } from "~/context";

import type { SubscribeFieldProps } from "./types";

const borderLight = ["whiteAlpha.50", "green.100"];
const borderDark = [undefined, "green.100"];
const hoverBorderLight = ["whiteAlpha.300", "green.300"];
const hoverBorderDark = [undefined, "green.300"];

export const SubscribeField = (props: SubscribeFieldProps) => {
  const { field, ...rest } = props;
  const { subscribeTitle = "Subscribe to our newsletter", subscribePlaceholder = "Email Address" } =
    useConfig();

  const { formState } = useFormContext();
  const { isSubmitting, isSubmitSuccessful, errors } = formState;

  const styles = useColorValue(
    {
      bg: "whiteAlpha.100",
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

  const icon = useMemo(() => {
    if (errors.email) {
      return { fa: "FaTimesCircle" };
    }
    if (isSubmitSuccessful) {
      return { fa: "FaCheckCircle" };
    }
    return { fa: "FaArrowAltCircleRight" };
  }, [errors.email, isSubmitSuccessful]);

  const color = useMemo(() => {
    if (errors.email) {
      return "red.300";
    }
    if (isSubmitSuccessful) {
      return "green.300";
    }
    return "light.500";
  }, [errors.email, isSubmitSuccessful]);

  return (
    <InputGroup>
      <Input placeholder={subscribePlaceholder} {...styles} {...field} {...rest} />
      <InputRightElement>
        <IconButton
          p={2}
          h="100%"
          icon={<DynamicIcon icon={icon} />}
          type="submit"
          color={color}
          variant="unstyled"
          alignItems="center"
          display="inline-flex"
          title={subscribeTitle}
          isLoading={isSubmitting}
          aria-label={subscribeTitle}
          _hover={{ color: "tertiary.500" }}
        />
      </InputRightElement>
    </InputGroup>
  );
};
