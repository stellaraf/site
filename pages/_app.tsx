import * as React from 'react';
import { BaseSEO } from 'site/components';
import { Provider } from 'site/context';
import { SiteLayout } from 'site/layouts';
import { getGlobalConfig } from 'site/util';

import type { SiteProps, NextPage } from 'site/types';

const Site: NextPage = (props: SiteProps) => {
  const { Component, pageProps, appProps } = props;
  return (
    <Provider appConfig={appProps}>
      <BaseSEO />
      <SiteLayout>
        <Component {...pageProps} />
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
