import { forwardRef } from 'react';
import { Flex, ModalFocusScope, useModalContext, useStyles } from '@chakra-ui/core';
import { AnimatePresence } from 'framer-motion';
import { AnimatedBox } from 'site/components';
import { useColorValue } from 'site/context';

import type { IModalContent } from './types';

/**
 * Replaces ModalContent Component.
 */
export const ModalContent = forwardRef<HTMLDivElement, IModalContent>((props, ref) => {
  const { children, ...rest } = props;
  const styles = useStyles();
  const { getDialogProps, getDialogContainerProps } = useModalContext();
  const containerProps = getDialogContainerProps();
  const dialogProps = getDialogProps(rest, ref) as any;
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  const bg = useColorValue('original.light', 'blackAlpha.300');
  return (
    <ModalFocusScope>
      <Flex
        // <chakra.div />
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        position="fixed"
        {...containerProps}
        __css={styles.dialogContainer}
        className="chakra-modal__content-container st-override-modal">
        <AnimatePresence>
          <AnimatedBox
            boxSize="100%"
            exit={{ scale: 0 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, stiffness: 50, type: 'spring' }}
            width="100%"
            boxShadow="lg"
            borderRadius="lg"
            borderWidth="1px"
            borderStyle="solid"
            position="relative"
            borderColor={borderColor}
            backgroundColor={bg}
            __css={styles.dialog}
            css={{ backdropFilter: 'blur(20px)' }}
            {...dialogProps}>
            <Flex
              // <ModalTransition />
              as="section"
              flexDir="column"
              className="chakra-modal__content st-override-modal">
              {children}
            </Flex>
          </AnimatedBox>
        </AnimatePresence>
      </Flex>
    </ModalFocusScope>
  );
});
