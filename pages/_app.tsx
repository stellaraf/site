import * as React from 'react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Provider } from '../context';
import { SiteLayout } from '../layouts';

const App = ({ Component, pageProps }: AppProps) => (
  <RecoilRoot>
    <Provider>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </Provider>
  </RecoilRoot>
);

export default App;
