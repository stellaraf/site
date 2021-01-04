import { Flex, ModalFocusScope, useModalContext, useStyles } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { AnimatedDiv } from '~/components';
import { useColorValue } from '~/context';
import { forwardRef } from '~/util';

import type { HTMLProps, Merge } from '@chakra-ui/utils';
import type { IModalContent } from './types';

/**
 * Replaces ModalContent Component.
 */
export const ModalContent = forwardRef<HTMLDivElement, IModalContent>((props, ref) => {
  const { children, ...rest } = props;

  const { getDialogProps, getDialogContainerProps } = useModalContext();
  const containerProps = getDialogContainerProps();
  const dialogProps = getDialogProps(rest, ref) as Merge<HTMLProps<HTMLDivElement>, IModalContent>;

  const styles = useStyles();
  const borderColor = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  const bg = useColorValue('light.500', 'blackAlpha.300');
  return (
    <ModalFocusScope>
      <Flex
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        position="fixed"
        {...containerProps}
        __css={styles.dialogContainer}
        className="chakra-modal__content-container st-override-modal"
      >
        <AnimatePresence>
          <AnimatedDiv
            exit={{ scale: 0 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, stiffness: 50, type: 'spring' }}
            boxSize="100%"
            boxShadow="lg"
            overflow="auto"
            borderRadius="lg"
            borderWidth="1px"
            borderStyle="solid"
            position="relative"
            backgroundColor={bg}
            __css={styles.dialog}
            borderColor={borderColor}
            css={{ backdropFilter: 'blur(20px)' }}
            {...dialogProps}
          >
            <Flex as="section" flexDir="column" className="chakra-modal__content st-override-modal">
              {children}
            </Flex>
          </AnimatedDiv>
        </AnimatePresence>
      </Flex>
    </ModalFocusScope>
  );
});
