import * as React from 'react';
import { forwardRef } from 'react';
import { Box } from '@chakra-ui/core';
import { LogoMain } from './LogoMain';
import { LogoIcon } from './LogoIcon';
import { Tagline } from './Tagline';

import type { LogoProps } from './types';

const LogoText = forwardRef<HTMLDivElement, LogoProps>((props, ref) => {
  const { size, width, height, showTagline = false, showReserved = false, ...rest } = props;
  return (
    <Box ref={ref} {...rest}>
      <svg
        height={`${height}`}
        width={`${width ?? size}`}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin meet"
        viewBox={showReserved ? '0 0 400 150' : '0 0 380 150'}>
        <LogoMain showReserved={showReserved} />
        {showTagline && <Tagline />}
      </svg>
    </Box>
  );
});

export const Logo = { Icon: LogoIcon, Text: LogoText };
