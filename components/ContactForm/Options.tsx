import * as React from 'react';
import { useState } from '@hookstate/core';
import { formState, ContactFormContext } from './state';
import { useMobile } from 'site/hooks';
import { OptionsDesktop } from './OptionsDesktop';
import { OptionsMobile } from './OptionsMobile';

import type { IOptions } from './types';

export const Options = (props: IOptions) => {
  const { formPlaceholders, ...rest } = props;
  const state = useState(formState);
  const isMobile = useMobile();
  const Component = isMobile ? OptionsMobile : OptionsDesktop;
  return (
    <ContactFormContext.Provider value={state}>
      <Component {...rest} />
    </ContactFormContext.Provider>
  );
};
