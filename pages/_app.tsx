import * as React from 'react';
import { BaseSEO } from 'site/components';
import { Provider } from 'site/context';
import { useMouseTrap } from 'site/hooks';
import { SiteLayout } from 'site/layouts';
import { useKonamiState } from 'site/state';
import { getGlobalConfig, getFooterItems } from 'site/util';

import type { SiteProps } from 'site/types';

const Site = (props: SiteProps) => {
  const konami = useKonamiState();
  useMouseTrap(
    'up up down down left right left right b a',
    () => {
      konami.set(p => !p);
    },
    'keyup',
  );
  const { Component, pageProps, appProps } = props;
  const { globalConfig, footerGroups } = appProps;
  return (
    <Provider appConfig={globalConfig}>
      <BaseSEO />
      <SiteLayout footerGroups={footerGroups}>
        <Component {...pageProps} />
      </SiteLayout>
    </Provider>
  );
};

Site.getInitialProps = async () => {
  let globalConfig = Object();
  let footerGroups = Object();
  globalConfig = await getGlobalConfig();
  footerGroups = await getFooterItems();
  return { appProps: { globalConfig, footerGroups } };
};

export default Site;
