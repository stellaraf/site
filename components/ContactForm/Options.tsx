import * as React from 'react';
import { useMobile } from 'site/hooks';
import { OptionsDesktop } from './OptionsDesktop';
import { OptionsMobile } from './OptionsMobile';

import type { IOptions } from './types';

export const Options = (props: IOptions) => {
  const isMobile = useMobile();
  const Component = isMobile ? OptionsMobile : OptionsDesktop;
  return <Component {...props} />;
};
