import { useMemo } from 'react';
import {
  useToken,
  ChakraProvider,
  useColorModeValue,
  createLocalStorageManager,
  createCookieStorageManager,
  useTheme as useChakraTheme,
} from '@chakra-ui/react';
import { makeTheme } from '~/util';

import type { GetServerSideProps } from 'next';
import type { TUseTheme, IUIProvider, TColorModeCtx } from './types';

export const UIProvider: React.FC<IUIProvider> = (props: IUIProvider) => {
  const { theme, children, cookies } = props;

  const generatedTheme = useMemo(() => makeTheme(theme), [theme]);

  const colorModeManager = useMemo(() => {
    if (typeof cookies === 'string') {
      return createCookieStorageManager('stellar-site');
    } else {
      return createLocalStorageManager('stellar-site');
    }
  }, [cookies]);

  return (
    <ChakraProvider resetCSS theme={generatedTheme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
};

export const getServerSideProps: GetServerSideProps<TColorModeCtx> = async ctx => {
  return {
    props: {
      // First time users will not have any cookies, so an empty string is required.
      cookies: ctx.req.headers.cookie ?? '',
    },
  };
};

export const useTheme: TUseTheme = useChakraTheme;

/**
 * Get a color token value based on color-mode.
 */
export function useColorTokenValue(light: string, dark: string): string {
  return useColorModeValue(useToken('colors', light), useToken('colors', dark));
}

export { useColorMode, useToken } from '@chakra-ui/react';
export { useColorModeValue as useColorValue } from '@chakra-ui/react';
