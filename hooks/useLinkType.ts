import { useEffect, useState, useMemo } from 'react';

export const useLinkType = href => {
  if (href[0] === '/') {
    href = href.substring(1);
  }

  const [external, setExternal] = useState(false);
  const [linkTarget, setTarget] = useState(href);

  useEffect(() => {
    if (linkTarget.match(/(http|https|mailto)\:\/\/.*/g)) {
      !external && setExternal(true);
    } else {
      let prefix = '/';
      if (!linkTarget.includes('.mdx') && linkTarget.includes('#')) {
        prefix = '';
      }
      let parts = linkTarget.split('.mdx');
      setTarget([prefix, ...parts].join(''));
    }
  }, [href]);

  const isExternal = useMemo(() => external);
  const target = useMemo(() => linkTarget);
  return { isExternal, target };
};
