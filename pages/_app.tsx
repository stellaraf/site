import * as React from 'react';
import { useMemo } from 'react';
import type { AppProps } from 'next/app';
import { BaseSEO } from 'site/components/Meta';
import { Provider } from 'site/context';
import { SiteLayout } from 'site/layouts';
import { getGlobalConfig, makeTheme } from 'site/util';
import type { GlobalConfigPre } from 'site/util';

export interface SiteProps extends AppProps {
  appProps: GlobalConfigPre;
}

const Site = ({ Component, pageProps, appProps }: SiteProps) => {
  const { theme: themeConfig, ...globalConfig } = appProps;
  const theme = useMemo(() => makeTheme(themeConfig), [themeConfig]);
  return (
    <Provider globalConfig={globalConfig} theme={theme}>
      <BaseSEO />
      <SiteLayout>
        <Component {...pageProps} globalConfig={appProps} />
      </SiteLayout>
    </Provider>
  );
};

Site.getInitialProps = async () => {
  let globalConfig = Object();
  globalConfig = await getGlobalConfig();

  return { appProps: globalConfig };
};

export default Site;
