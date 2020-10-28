import { Alert, AlertDescription, AlertIcon, CloseButton, Flex, useToast } from '@chakra-ui/core';
import { useConfig } from 'site/context';
import { useRender } from 'site/hooks';

import type { IUseAlert } from './types';

export function useAlert() {
  const toast = useToast();
  const { errorMessage = null } = useConfig();
  const rendered = useRender(errorMessage);

  const showToast = (opts: IUseAlert) => {
    const {
      status = 'info',
      message = '',
      position = 'bottom-right',
      onClose: customOnClose,
      duration = 5000,
    } = opts;
    return toast({
      status,
      duration,
      isClosable: true,
      onCloseComplete: customOnClose,
      position,
      render: ({ id, onClose }) => (
        <Alert
          my={2}
          mb={4}
          pr={8}
          right={24}
          id={`${id}`}
          width="auto"
          fontSize="sm"
          boxShadow="lg"
          variant="solid"
          status={status}
          textAlign="left"
          borderRadius="md"
          alignItems="start">
          <AlertIcon />
          <Flex flex="1">
            <AlertDescription
              display="block"
              css={{
                // Don't add normal paragraph padding in alerts.
                '& p.chakra-text': { marginTop: 'unset', marginBottom: 'unset' },
                // Inherit alert styles for links - so the branded underline doesn't clash.
                '& a': {
                  '--link-color': 'inherit',
                },
                '& a:hover': {
                  opacity: 0.8,
                },
              }}>
              {message}
              {status === 'error' && rendered}
            </AlertDescription>
          </Flex>
          <CloseButton size="sm" onClick={onClose} position="absolute" right={1} top={1} />
        </Alert>
      ),
    });
  };
  return showToast;
}
