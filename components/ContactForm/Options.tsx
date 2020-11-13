import { useMobile } from 'site/hooks';
import { OptionsDesktop } from './Desktop';
import { OptionsMobile } from './Mobile';

import type { IOptions } from './types';

export const Options = (props: IOptions) => {
  const isMobile = useMobile();
  const Component = isMobile ? OptionsMobile : OptionsDesktop;
  return <Component {...props} />;
};
