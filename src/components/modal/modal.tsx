import {
  Modal as ChakraModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ModalContent } from "./modal-content";

import type { ModalProps } from "./types";

export const Modal = (props: ModalProps) => {
  const {
    // Component Passthrough
    body,
    header,
    footer,
    noOverlay,
    bodyProps = {},
    headerProps = {},
    footerProps = {},
    contentProps = {},
    containerProps = {},
    // Overridden Modal Props for easier handling
    scrollInside = false,
    hideCloseButton = false,
    // Passthrough Modal Props
    preserveScrollBarGap = true,
    closeOnOverlayClick,
    blockScrollOnMount,
    isCentered = true,
    onOverlayClick,
    size = "xl",
    closeOnEsc,
    useInert,
    onClose,
    isOpen,
    onEsc,
    id,
    ...rest
  } = props;

  return (
    <ChakraModal
      id={id}
      size={size}
      onEsc={onEsc}
      isOpen={isOpen}
      onClose={onClose}
      useInert={useInert}
      motionPreset="scale"
      isCentered={isCentered}
      closeOnEsc={closeOnEsc}
      onOverlayClick={onOverlayClick}
      blockScrollOnMount={blockScrollOnMount}
      closeOnOverlayClick={closeOnOverlayClick}
      preserveScrollBarGap={preserveScrollBarGap}
      scrollBehavior={scrollInside ? "inside" : "outside"}
      {...rest}
    >
      <ModalOverlay {...(noOverlay ? { bg: "unset" } : {})} />
      <ModalContent contentProps={contentProps} {...containerProps}>
        {typeof header !== "undefined" && <ModalHeader {...headerProps}>{header}</ModalHeader>}
        {!hideCloseButton && <ModalCloseButton />}
        {typeof body !== "undefined" && <ModalBody {...bodyProps}>{body}</ModalBody>}
        {typeof footer !== "undefined" && (
          <ModalFooter mb={4} {...footerProps}>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </ChakraModal>
  );
};
