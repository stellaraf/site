import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { Provider } from '../context';
import { SiteLayout } from '../layouts';

const App = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Provider>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </Provider>
    </RecoilRoot>
  );
};

export default App;
