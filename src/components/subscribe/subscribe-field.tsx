import { forwardRef, useMemo } from "react";

import {
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";

import { CircleArrowRight, CircleCheck, CircleX } from "~/icons";

import type { SubscribeFieldProps } from "./types";

const borderLight = ["whiteAlpha.50", "green.100"];
const borderDark = [undefined, "green.100"];
const hoverBorderLight = ["whiteAlpha.300", "green.300"];
const hoverBorderDark = [undefined, "green.300"];

export const SubscribeField = forwardRef<HTMLInputElement, SubscribeFieldProps>((props, ref) => {
  const { name, title, isSubmitSuccessful, isSubmitting, error, ...rest } = props;

  const styles = useColorModeValue(
    {
      bg: "whiteAlpha.100",
      borderColor: borderLight[+isSubmitSuccessful],
      _hover: {
        borderColor: hoverBorderLight[+isSubmitSuccessful],
        boxShadow: hoverBorderLight[+isSubmitSuccessful],
      },
    },
    {
      borderColor: borderDark[+isSubmitSuccessful],
      _hover: {
        borderColor: hoverBorderDark[+isSubmitSuccessful],
      },
    },
  );

  const icon = useMemo<JSX.Element>(() => {
    if (error) {
      return <CircleX />;
    }
    if (isSubmitSuccessful) {
      return <CircleCheck />;
    }
    return <CircleArrowRight />;
  }, [error, isSubmitSuccessful]);

  const color = useMemo(() => {
    if (error) {
      return "red.300";
    }
    if (isSubmitSuccessful) {
      return "green.300";
    }
    return "light.500";
  }, [error, isSubmitSuccessful]);

  return (
    <FormControl isInvalid={typeof error !== "undefined"}>
      <InputGroup>
        <Input name={name} ref={ref} placeholder="Email Address" {...styles} {...rest} />
        <InputRightElement>
          <IconButton
            p={2}
            h="100%"
            icon={icon}
            color={color}
            title={title}
            type="submit"
            aria-label={title}
            variant="unstyled"
            alignItems="center"
            display="inline-flex"
            isLoading={isSubmitting}
            _hover={{ color: "tertiary.500" }}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
});

SubscribeField.displayName = "SubscribeField";
