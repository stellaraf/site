import type { ChakraProps, ToastProps, UseToastOptions } from "@chakra-ui/react";

export type TToastPositions = UseToastOptions["position"];

export interface IUseAlert {
  message: React.ReactNode;
  status: ToastProps["status"];
  duration?: ToastProps["duration"];
  position?: TToastPositions;
  onClose?: ToastProps["onCloseComplete"];
}

export type UseAlertReturn = (opts: IUseAlert) => void;

export type TUseBreakpointString = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export type UseDateOptions = {
  format: string;
};

export interface IGlowOptions {
  /**
   * Number of shadows.
   */
  shadows?: number;
  /**
   * Pixels for each shadow.
   */
  increment?: number;
}

export namespace UseGlow {
  /**
   * First or inner-most color.
   */
  export type Start = string;
  /**
   * Last or outer-most color.
   */
  export type Stop = string;
  export interface Return {
    /**
     * Background Color as string.
     */
    backgroundColor: ChakraProps["backgroundColor"];
    /**
     * Box Shadow as string.
     */
    boxShadow: ChakraProps["boxShadow"];
  }
  export interface Options {
    /**
     * Number of shadows.
     */
    shadows?: number;
    /**
     * Pixels for each shadow.
     */
    increment?: number;
  }
}
