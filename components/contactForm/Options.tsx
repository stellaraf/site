import { useMobile } from '~/hooks';
import { OptionsDesktop } from './Desktop';
import { OptionsMobile } from './Mobile';

import type { IOptions } from './types';

export const Options: React.FC<IOptions> = (props: IOptions) => {
  const isMobile = useMobile();
  const Component = isMobile ? OptionsMobile : OptionsDesktop;
  return <Component {...props} />;
};
