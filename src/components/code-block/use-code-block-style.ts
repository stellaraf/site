/**
 * Used to override the colorScheme and/or variant for a Code or CodeBlock component if it's
 * contained within another component with differing styles, such as the Admonition.
 */
import { createContext, useContext } from "react";

import type { CodeProps } from "@chakra-ui/react";

interface CodeBlockStyleCtxType {
  colorScheme: CodeProps["colorScheme"];
  copyButton: CodeProps;
  codeBlock: CodeProps;
}

const CodeBlockStyleCtx = createContext<CodeBlockStyleCtxType | null>(null);

export const { Provider: CodeBlockStyleProvider } = CodeBlockStyleCtx;

export const useCodeBlockStyle = (): CodeBlockStyleCtxType | null =>
  useContext<CodeBlockStyleCtxType | null>(CodeBlockStyleCtx);
