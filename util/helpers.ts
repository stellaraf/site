import * as React from 'react';
import { shouldForwardProp as chakraShouldForwardProp } from '@chakra-ui/react';
import emotionIsValidHTMLProp from '@emotion/is-prop-valid';
import camelCaseKeys from 'camelcase-keys';
import { devtools } from 'zustand/middleware';

import type { StateCreator } from 'zustand';

export function forwardRef<E, P>(
  _Component: React.ForwardRefRenderFunction<E, P>,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<E>> {
  const Component = React.forwardRef<E, P>(_Component);
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

type Params = Parameters<typeof camelCaseKeys>;

class Wrapper<T extends Params[0], O extends Params[1]> {
  mediate = (input: T, options?: O) => camelCaseKeys(input, options);
}

export type CamelCaseKeys<T extends Params[0]> = ReturnType<Wrapper<T, { deep: true }>['mediate']>;

export function camelCaseObj<D extends Dict>(obj: D): CamelCaseKeys<D> {
  return camelCaseKeys(obj, { deep: true });
}

/**
 * Wrap a zustand state function with devtools, if applicable.
 *
 * @param store zustand store function.
 * @param name Store name.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function withDev<T extends object = {}>(
  store: StateCreator<T>,
  name: string,
): StateCreator<T> {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    return devtools<T>(store, name);
  }
  return store;
}
