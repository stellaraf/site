import type { ReactNode } from "react";
import type {
  FlexProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  BoxProps,
  ModalProps,
  UseModalProps,
} from "@chakra-ui/react";
import type { PropGetter } from "@chakra-ui/react-utils";

export interface IModalWrapper
  extends UseModalProps,
    Omit<BoxProps, "children" | "scrollBehavior">,
    Omit<ModalProps, "children" | "scrollBehavior" | "motionPreset"> {
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
   * Custom props applied to the direct child of <ModalBody />
   */
  contentProps?: FlexProps;
  /**
   * Show backdrop/overlay.
   */
  noOverlay?: boolean;
  /**
   * Modal Size
   */
  size?: ModalProps["size"];
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

export interface IModalContent extends Animated<FlexProps> {
  contentProps?: IModalWrapper["contentProps"];
}

/**
 * Specific type for *actual* `getDialogProps` return value.
 *
 * @see https://github.com/chakra-ui/chakra-ui/blob/752910bb1f4604213134fc8ea9f547bccd6a2f09/packages/modal/src/use-modal.ts
 */
export type ModalDialogProps = PropGetter<
  HTMLElement,
  {
    role?: string;
    ref?: string;
    id?: string;
    tabIndex?: string;
    "aria-modal"?: string;
    "aria-labelledby"?: string;
    "aria-described-by"?: string;
    onClick?: (e: Event) => void;
  }
>;
