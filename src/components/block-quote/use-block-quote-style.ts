/**
 * Used to override the colorScheme and/or variant for a BlockQuote component if it's
 * contained within another component with differing styles, such as the Admonition.
 */
import { createContext, useContext } from "react";

import type { BlockQuoteProps } from "./types";

interface BlockQuoteStyleCtxType {
  colorScheme: BlockQuoteProps["colorScheme"];
  blockQuote: BlockQuoteProps;
}

const BlockQuoteStyleCtx = createContext<BlockQuoteStyleCtxType | null>(null);

export const { Provider: BlockQuoteStyleProvider } = BlockQuoteStyleCtx;

export const useBlockQuoteStyle = (): BlockQuoteStyleCtxType | null =>
  useContext<BlockQuoteStyleCtxType | null>(BlockQuoteStyleCtx);
