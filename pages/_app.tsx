import * as React from 'react';
import { useMemo } from 'react';
import { BaseSEO } from 'site/components/Meta';
import { Provider } from 'site/context';
import { SiteLayout } from 'site/layouts';
import { getGlobalConfig, makeTheme } from 'site/util';
import type { ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { GlobalConfig } from 'site/types';

export interface SiteProps extends AppProps {
  appProps: GlobalConfig;
  children?: ReactNode;
}

const Site: NextPage = ({ Component, pageProps, appProps }: SiteProps) => {
  const { theme: themeConfig, ...globalConfig } = appProps;

  const theme = useMemo(() => makeTheme(themeConfig), [themeConfig]);
  return (
    <Provider globalConfig={globalConfig} theme={theme}>
      <BaseSEO />
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </Provider>
  );
};

Site.getInitialProps = async ({ req }) => {
  let globalConfig = Object();
  globalConfig = await getGlobalConfig();
  return { appProps: globalConfig };
};

export default Site;
