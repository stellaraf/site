import * as React from 'react';
import { animated, useTransition } from 'react-spring';
import { Logo } from 'site/components/Logo';
import { Link } from 'site/components/Link';

import type { HeaderLogoProps } from './types';

export const HeaderLogo = (props: HeaderLogoProps) => {
  const { color = 'currentColor', show } = props;
  const LogoShown = (
    <Link href="/">
      <Logo.Text color={color} width={160} height={56} pb={4} />
    </Link>
  );
  const transitions = useTransition([null, LogoShown][+show], {
    key: item => (item === null ? 0 : 1),
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(100%)' },
    config: { duration: 150 },
  });
  return transitions((values, item) => <animated.div style={values}>{item}</animated.div>);
};
