import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Flex, Icon as ChakraIcon } from '@chakra-ui/react';
import { useColorValue } from '~/context';

import type { FlexProps } from '@chakra-ui/react';

const QuoteOpen = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/ri').then(i => i.RiDoubleQuotesL),
);

const QuoteClose = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/ri').then(i => i.RiDoubleQuotesR),
);

interface QuoteProps extends FlexProps {
  kind: 'open' | 'close';
}

export const Quote = (props: QuoteProps): JSX.Element => {
  const { kind, ...rest } = props;

  const color = useColorValue('blackAlpha.300', 'secondary.200');

  const icon = useMemo(() => {
    switch (kind) {
      case 'open':
        return QuoteOpen;
      case 'close':
        return QuoteClose;
    }
  }, [kind]);

  const kindProps = useMemo<Partial<FlexProps>>(() => {
    switch (kind) {
      case 'open':
        return { verticalAlign: 'top', marginRight: 2 };
      case 'close':
        return { verticalAlign: 'bottom', marginLeft: 2 };
    }
  }, [kind]);

  return (
    <Flex
      color={color}
      align="center"
      justify="center"
      overflow="hidden"
      display="inline-flex"
      {...kindProps}
      {...rest}
    >
      <ChakraIcon as={icon} boxSize="100%" />
    </Flex>
  );
};
