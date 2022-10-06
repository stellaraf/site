import { Flex, ModalFocusScope, useModalContext, useMultiStyleConfig } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { AnimatedDiv } from "~/components";
import { useColorValue } from "~/context";
import { forwardRef } from "~/util";

import type { ModalContentProps, ModalDialogProps } from "./types";

/**
 * Replaces ModalContent Component.
 */
export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>((props, ref) => {
  const { children, contentProps, ...rest } = props;

  const { getDialogProps, getDialogContainerProps } = useModalContext();
  const containerProps = getDialogContainerProps();
  const dialogProps = getDialogProps(rest, ref) as ModalDialogProps;

  const styles = useMultiStyleConfig("Modal");
  const borderColor = useColorValue("blackAlpha.300", "whiteAlpha.300");
  const bg = useColorValue("light.500", "blackAlpha.300");

  return (
    <ModalFocusScope>
      <Flex
        {...containerProps}
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        position="fixed"
        overflow="auto"
        justifyContent="center"
        alignItems="center"
        tabIndex={-1}
        display="flex"
        zIndex="modal"
        __css={styles?.dialogContainer}
        className="chakra-modal__content-container st-override-modal"
      >
        <AnimatePresence>
          <AnimatedDiv
            // Don't mess with the order of these props.
            transition={{ duration: 0.2, type: "spring" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            backgroundColor={bg}
            exit={{ scale: 0 }}
            borderStyle="solid"
            position="relative"
            borderRadius="lg"
            borderWidth="1px"
            overflow="auto"
            boxSize="100%"
            boxShadow="lg"
            alignSelf="center"
            __css={styles?.dialog}
            borderColor={borderColor}
            css={{ backdropFilter: "blur(20px)" }}
            {...dialogProps}
          >
            <Flex
              as="section"
              flexDir="column"
              className="chakra-modal__content st-override-modal"
              {...contentProps}
            >
              {children}
            </Flex>
          </AnimatedDiv>
        </AnimatePresence>
      </Flex>
    </ModalFocusScope>
  );
});
