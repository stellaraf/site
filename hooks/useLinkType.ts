import { useMemo } from 'react';

interface LinkType {
  isExternal: boolean;
  target: string;
}

export const useLinkType = (href: string): LinkType => {
  let linkTarget = href;
  let external = false;
  if (href[0] === '/') {
    linkTarget = href.substring(1);
  }

  if (linkTarget.match(/(http|https|mailto)\:\/{0,2}.*/g)) {
    if (!external) {
      external = true;
    }
  } else {
    let prefix = '/';
    if (!linkTarget.includes('.mdx') && linkTarget.includes('#')) {
      prefix = '';
    }
    let parts = linkTarget.split('.mdx');
    linkTarget = [prefix, ...parts].join('');
  }

  const isExternal = useMemo(() => external, [href]);
  const target = useMemo(() => linkTarget, [href]);
  return { isExternal, target };
};
