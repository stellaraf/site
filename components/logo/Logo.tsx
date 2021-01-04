import { Box } from '@chakra-ui/react';
import { forwardRef } from '~/util';
import { LogoMain } from './LogoMain';
import { LogoIcon } from './LogoIcon';
import { Tagline } from './Tagline';

import type { ILogo } from './types';

const LogoText = forwardRef<HTMLDivElement, ILogo>((props, ref) => {
  const {
    size,
    width,
    height,
    showTagline = false,
    showReserved = false,
    noAnimate = false,
    ...rest
  } = props;
  let sizeProps = {};
  if (height) {
    sizeProps = { ...sizeProps, height };
  }
  if (width) {
    sizeProps = { ...sizeProps, width };
  } else if (size) {
    sizeProps = { ...sizeProps, width: size };
  }
  return (
    <Box ref={ref} {...rest}>
      <svg
        {...sizeProps}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin meet"
        viewBox={showReserved ? '0 0 400 150' : '0 0 380 150'}
      >
        <LogoMain showReserved={showReserved} noAnimate={noAnimate} />
        {showTagline && <Tagline />}
      </svg>
    </Box>
  );
});

export const Logo = { Icon: LogoIcon, Text: LogoText };
