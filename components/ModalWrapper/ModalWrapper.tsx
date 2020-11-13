import { Modal, ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from '@chakra-ui/react';
import { If } from 'site/components';
import { ModalContent } from './ModalContent';
import { Overlay } from './Overlay';

import type { IModalWrapper } from './types';

export const ModalWrapper = (props: IModalWrapper) => {
  const {
    // Component Passthrough
    body,
    header,
    footer,
    noOverlay,
    bodyProps = {},
    headerProps = {},
    footerProps = {},
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
    size = 'xl',
    closeOnEsc,
    useInert,
    onClose,
    isOpen,
    onEsc,
    id,
    ...rest
  } = props;

  return (
    <Modal
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
      scrollBehavior={scrollInside ? 'inside' : 'outside'}>
      <Overlay {...rest} {...(noOverlay ? { bg: 'unset' } : {})}>
        <ModalContent {...containerProps}>
          <If condition={typeof header !== 'undefined'}>
            <ModalHeader {...headerProps}>{header}</ModalHeader>
          </If>
          <If condition={!hideCloseButton}>
            <ModalCloseButton />
          </If>
          <If condition={typeof body !== 'undefined'}>
            <ModalBody {...bodyProps}>{body}</ModalBody>
          </If>
          <If condition={typeof footer !== 'undefined'}>
            <ModalFooter mb={4} {...footerProps}>
              {footer}
            </ModalFooter>
          </If>
        </ModalContent>
      </Overlay>
    </Modal>
  );
};
