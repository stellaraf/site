import { Box, useStyles } from '@chakra-ui/react';
import { forwardRef } from '~/util';

import type { BoxProps } from '@chakra-ui/react';

export const Overlay = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  const styles = useStyles();
  return (
    <Box
      top={0}
      left={0}
      ref={ref}
      width="100vw"
      height="100vh"
      position="fixed"
      sx={styles.overlay}
      className="chakra-modal__overlay st-override-modal"
      {...props}
    />
  );
});
