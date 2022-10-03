import { useMemo } from 'react';

import type { LinkType } from './types';

export const useLinkType = (href: string): LinkType => {
  let linkTarget = href;
  let external = false;
  if (href[0] === '/') {
    linkTarget = href.substring(1);
  }

  if (linkTarget.match(/(http|https|mailto):\/{0,2}.*/g)) {
    if (!external) {
      external = true;
    }
  } else {
    let prefix = '/';
    if (!linkTarget.includes('.mdx') && linkTarget.includes('#')) {
      prefix = '';
    }
    const parts = linkTarget.split('.mdx');
    linkTarget = [prefix, ...parts].join('');
  }

  const isExternal = useMemo(() => external, [href]);
  const target = useMemo(() => linkTarget, [href]);
  return { isExternal, target };
};
