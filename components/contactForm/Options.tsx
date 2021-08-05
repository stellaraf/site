import { useMobile } from '~/hooks';
import { ContactFormProvider } from './context';
import { OptionsDesktop } from './Desktop';
import { OptionsMobile } from './Mobile';

import type { IOptions } from './types';

export const Options = (props: IOptions): JSX.Element => {
  const { cards } = props;
  const isMobile = useMobile();
  const Component = isMobile ? OptionsMobile : OptionsDesktop;
  return (
    <ContactFormProvider value={cards}>
      <Component />
    </ContactFormProvider>
  );
};
