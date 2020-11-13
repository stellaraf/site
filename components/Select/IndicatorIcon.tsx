import { memo } from 'react';
import { Box } from '@chakra-ui/react';
import { FaChevronDown as ChevronDown } from '@meronex/icons/fa';
import { motion } from 'framer-motion';
import { useColorValue } from 'site/context';
import { useSelectContext } from './Select';

import type { IIndicator } from './types';

const _IndicatorIcon = () => {
  const { isOpen } = useSelectContext();
  const color = useColorValue('gray.200', 'whiteAlpha.200');

  return (
    <motion.div
      layout
      animate={{ scaleY: isOpen ? -1 : 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 50 }}>
      <Box as={ChevronDown} mx={2} color={color} className="__rs-icon" transition="all 0.2s" />
    </motion.div>
  );
};

export const IndicatorIcon = memo<(p: IIndicator) => JSX.Element>(
  _IndicatorIcon,
  // Only re-render if the menu's open/close state changes.
  (prev, next) => prev.selectProps.menuIsOpen === next.selectProps.menuIsOpen,
);
