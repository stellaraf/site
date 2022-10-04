import {
  Flex,
  Alert,
  useToast,
  AlertIcon,
  CloseButton,
  AlertDescription,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useConfig } from "~/context";
import { useRender } from "~/hooks";

import type { TToastPositions, UseAlertReturn } from "./types";

export function useAlert(): UseAlertReturn {
  const toast = useToast();
  const { errorMessage = null } = useConfig();
  const rendered = useRender(errorMessage);
  const defaultPosition = useBreakpointValue<TToastPositions>({
    base: "bottom",
    lg: "bottom-right",
  });

  const showToast: UseAlertReturn = opts => {
    const {
      status = "info",
      message = "",
      position = defaultPosition ?? "bottom",
      onClose: customOnClose,
      duration = 5000,
    } = opts;
    toast({
      status,
      duration,
      isClosable: true,
      onCloseComplete: customOnClose,
      position,
      render: ({ id, onClose }) => {
        const component = (
          <>
            <Alert
              my={2}
              mb={4}
              pr={8}
              right={{ base: 0, lg: 24 }}
              id={`${id}`}
              width="auto"
              fontSize="sm"
              boxShadow="lg"
              variant="solid"
              status={status}
              textAlign="left"
              borderRadius="md"
              alignItems="start"
            >
              <AlertIcon />
              <Flex flex="1">
                <AlertDescription
                  display="block"
                  css={{
                    // Don't add normal paragraph padding in alerts.
                    "& p.chakra-text": { marginTop: "unset", marginBottom: "unset" },
                    // Inherit alert styles for links - so the branded underline doesn't clash.
                    "& a": {
                      "--link-color": "inherit",
                    },
                    "& a:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  {message}
                  {status === "error" && rendered}
                </AlertDescription>
              </Flex>
              <CloseButton size="sm" onClick={onClose} position="absolute" right={1} top={1} />
            </Alert>
          </>
        ) as JSX.Element;
        return component;
      },
    });
  };
  return showToast;
}
