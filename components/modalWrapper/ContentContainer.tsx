import { Flex, useStyles, useModalContext } from '@chakra-ui/react';

import type { IContentContainer } from './types';

/**
 * Replaces Modal Contain Container.
 */
export const ContentContainer: React.FC<IContentContainer> = (props: IContentContainer) => {
  const styles = useStyles();
  const { getDialogContainerProps } = useModalContext();
  const containerProps = getDialogContainerProps();
  return (
    <Flex
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      position="fixed"
      {...containerProps}
      __css={styles.dialogContainer}
      className="chakra-modal__content-container st-override-modal"
      {...props}
    />
  );
};
