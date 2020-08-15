import * as React from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { BaseSEO } from 'site/components/Meta';
import { Provider } from 'site/context';
import { SiteLayout } from 'site/layouts';
import { getGlobalConfig } from 'site/util';
import type { GlobalConfig } from 'site/util';

export interface SiteProps extends AppProps {
  appProps: GlobalConfig;
}

const Site = ({ Component, pageProps, appProps }: SiteProps) => (
  <RecoilRoot>
    <Provider globalConfig={appProps}>
      <BaseSEO />
      <SiteLayout>
        <Component {...pageProps} globalConfig={appProps} />
      </SiteLayout>
    </Provider>
  </RecoilRoot>
);

Site.getInitialProps = async () => {
  let globalConfig = Object();
  globalConfig = await getGlobalConfig();

  return { appProps: globalConfig };
};

export default Site;
