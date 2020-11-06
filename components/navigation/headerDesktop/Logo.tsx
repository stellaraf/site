import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Logo } from 'site/components';

import type { HeaderLogoProps } from './types';

export const HeaderLogo = forwardRef<HTMLDivElement, HeaderLogoProps>((props, ref) => {
  const { color = 'currentColor', show } = props;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={ref}
          key="headerLogo"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.2 }}>
          <Link href="/">
            <Logo.Text color={color} width={160} height={56} pb={4} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
