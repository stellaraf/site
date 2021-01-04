import type { ReactNode } from 'react';
import type {
  FlexProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  BoxProps,
  ModalProps,
  UseModalProps,
} from '@chakra-ui/react';

export interface IModalWrapper
  extends UseModalProps,
    Omit<BoxProps, 'children'>,
    Omit<ModalProps, 'children' | 'scrollBehavior' | 'motionPreset'> {
  /**
   * Component to be nested inside <ModalBody />
   */
  body?: ReactNode;
  /**
   * Component to be nested inside <ModalFooter />
   */
  footer?: ReactNode;
  /**
   * Component to be nested inside <ModalHeader />
   */
  header?: ReactNode;
  /**
   * Custom props applied to <ModalBody />
   */
  bodyProps?: ModalBodyProps;
  /**
   * Custom props applied to <ModalFooter />
   */
  footerProps?: ModalFooterProps;
  /**
   * Custom props applied to <ModalHeader />
   */
  headerProps?: ModalHeaderProps;
  /**
   * Custom props applied to <ModalContent />
   */
  containerProps?: Animated<FlexProps>;
  /**
   * Show backdrop/overlay.
   */
  noOverlay?: boolean;
  /**
   * Modal Size
   */
  size?: ModalProps['size'];
  /**
   * Scroll inside of modal, default is `false`/outside of modal.
   */
  scrollInside?: boolean;
  /**
   * Don't show the close button, default is `false`.
   */
  hideCloseButton?: boolean;
}

export interface IContentContainer extends FlexProps {}

export interface IModalContent extends Animated<FlexProps> {}
