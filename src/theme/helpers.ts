import { shouldForwardProp as chakraShouldForwardProp } from "@chakra-ui/react";
import emotionIsValidHTMLProp from "@emotion/is-prop-valid";

/**
 * Ensure only valid HTML props are forwarded to the DOM.
 *
 * @see https://chakra-ui.com/docs/features/chakra-factory
 */
export function shouldForwardProp(prop: string): boolean {
  const isChakraProp = !chakraShouldForwardProp(prop);
  const isValidHTMLProp = emotionIsValidHTMLProp(prop);
  if (isChakraProp) {
    return false;
  }
  if (isValidHTMLProp) {
    return true;
  }
  return false;
}
