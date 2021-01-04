import { useMemo } from 'react';
import {
  ChakraProvider,
  useTheme as useChakraTheme,
  cookieStorageManager,
  localStorageManager,
  useToken,
  useColorModeValue,
} from '@chakra-ui/react';
import { makeTheme } from 'site/util';

import type { GetServerSideProps } from 'next';
import type { TUseTheme, IUIProvider } from './types';

type TColorModeCtx = {
  cookies: string;
};

export const UIProvider = (props: IUIProvider) => {
  const { theme, children, cookies } = props;
  const generatedTheme = useMemo(() => makeTheme(theme), [theme]);
  const colorModeManager =
    typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;

  return (
    <ChakraProvider resetCSS theme={generatedTheme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
};
export const useTheme: TUseTheme = useChakraTheme;

export const getServerSideProps: GetServerSideProps<TColorModeCtx> = async ctx => {
  return {
    props: {
      // First time users will not have any cookies, so an empty string is required.
      cookies: ctx.req.headers.cookie ?? '',
    },
  };
};

/**
 * Get a color token value based on color-mode.
 */
export function useColorTokenValue(light: string, dark: string): string {
  return useColorModeValue(useToken('colors', light), useToken('colors', dark));
}

export { useColorMode, useToken } from '@chakra-ui/react';
export { useColorModeValue as useColorValue } from '@chakra-ui/react';
