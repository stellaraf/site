import {
  Box,
  Flex,
  Alert,
  useToast,
  AlertIcon,
  CloseButton,
  AlertDescription,
  useBreakpointValue,
  type ToastProps,
  type UseToastOptions,
} from "@chakra-ui/react";

import { RichText } from "~/components";
import { useConfig } from "~/context";

interface UseAlert {
  message: React.ReactNode;
  status?: ToastProps["status"];
  duration?: ToastProps["duration"];
  position?: ToastPosition;
  onClose?: ToastProps["onCloseComplete"];
}
type ToastPosition = UseToastOptions["position"];
type UseAlertReturn = (opts: UseAlert) => void;
type UseAlertOptions = Partial<Pick<UseAlert, "duration" | "position" | "onClose" | "status">>;

export function useAlert(options: UseAlertOptions = {}): UseAlertReturn {
  const toast = useToast();
  const { errorMessage } = useConfig();
  const defaultPosition = useBreakpointValue<ToastPosition>({
    base: "bottom",
    lg: "bottom-right",
  });

  const showToast: UseAlertReturn = opts => {
    const {
      status = options.status ?? "error",
      message = "Something went wrong",
      position = options.position ?? defaultPosition ?? "bottom",
      onClose: customOnClose = options.onClose,
      duration = options.duration ?? 5000,
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
              id={`${id}`}
              width="auto"
              fontSize="sm"
              boxShadow="lg"
              variant="solid"
              status={status}
              textAlign="left"
              borderRadius="md"
              alignItems="start"
              right={{ base: 0, lg: 24 }}
            >
              <AlertIcon />
              <Flex flex="1">
                <AlertDescription
                  display="block"
                  css={{
                    // Don't add normal paragraph padding in alerts.
                    "& p.chakra-text, & .st-content-p": {
                      marginTop: "unset",
                      marginBottom: "unset",
                    },
                    // Inherit alert styles for links - so the branded underline doesn't clash.
                    "& a": {
                      "--link-color": "inherit",
                    },
                    "& a:hover": {
                      opacity: 0.75,
                    },
                  }}
                >
                  {message}
                  {status === "error" && (
                    <Box mt={4}>
                      <RichText content={errorMessage.body} />
                    </Box>
                  )}
                </AlertDescription>
              </Flex>
              <CloseButton size="sm" onClick={onClose} position="absolute" right={1} top={1} />
            </Alert>
          </>
        );
        return component;
      },
    });
  };
  return showToast;
}
