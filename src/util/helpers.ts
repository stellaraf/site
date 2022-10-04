import { forwardRef as ReactforwardRef } from 'react';
import { shouldForwardProp as chakraShouldForwardProp } from '@chakra-ui/react';
import emotionIsValidHTMLProp from '@emotion/is-prop-valid';

export function forwardRef<E, P>(
  _Component: React.ForwardRefRenderFunction<E, P>,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<E>> {
  const Component = ReactforwardRef<E, P>(_Component);
  Component.displayName = _Component.displayName?.replaceAll('_', '');
  return Component;
}

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
