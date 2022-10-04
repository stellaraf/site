/**
 * Used to override the colorScheme and/or variant for a Code or CodeBlock component if it's
 * contained within another component with differing styles, such as the Admonition.
 */
import { createContext, useContext } from "react";

import type { CodeProps } from "@chakra-ui/react";

interface TCodeBlockStyleCtx {
  copyButton: CodeProps;
  codeBlock: CodeProps;
}

const CodeBlockStyleCtx = createContext<TCodeBlockStyleCtx | null>(null);

export const { Provider: CodeBlockStyleProvider } = CodeBlockStyleCtx;

export const useCodeBlockStyle = (): TCodeBlockStyleCtx | null =>
  useContext<TCodeBlockStyleCtx | null>(CodeBlockStyleCtx);
