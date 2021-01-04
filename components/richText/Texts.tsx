import {
  Box,
  Code as ChakraCode,
  Text,
  useStyles,
  useStyleConfig,
  useToken,
} from '@chakra-ui/react';
import { useColorValue } from '~/context';

import type { IBlockQuote, ICode, IParagraph, IInline, ICodeBlock } from './types';

export const P: React.FC<IParagraph> = (props: IParagraph) => (
  <Text my={8} css={{ '&:first-of-type': { marginTop: useToken('space', 2) } }} {...props} />
);

export const BlockQuote: React.FC<IBlockQuote> = (props: IBlockQuote) => {
  const bg = useColorValue('blackAlpha.100', 'whiteAlpha.100');
  const border = useColorValue('blackAlpha.300', 'whiteAlpha.300');
  return (
    <Box
      my={8}
      pl={4}
      pt={2}
      pb={4}
      fontSize="lg"
      fontFamily="body"
      lineHeight="tall"
      fontWeight="light"
      position="relative"
      borderLeftWidth={2}
      backgroundColor={bg}
      borderLeftStyle="solid"
      borderLeftColor={border}
      {...props}
    />
  );
};

export const Code: React.FC<ICode> = (props: ICode) => {
  const scheme = useColorValue('gray', 'tertiary');
  const sx = useStyles();
  return <ChakraCode fontSize="sm" colorScheme={scheme} px={1} sx={sx} {...props} />;
};

export const Inline: React.FC<IInline> = (props: IInline) => {
  const { node, ...rest } = props;
  return (
    <Box as="span" key={node.data.target.sys.id} {...rest}>
      type: {node.nodeType} id: {node.data.target.sys.id}
    </Box>
  );
};

export const CodeBlock: React.FC<ICodeBlock> = (props: ICodeBlock) => {
  const colorScheme = useColorValue('gray', 'tertiary');
  const { borderRadius, px, ...sx } = useStyles();
  const { bg, color } = useStyleConfig('Code', { colorScheme });

  return (
    <Box
      p={3}
      mt={5}
      as="pre"
      border="1px"
      rounded="md"
      fontSize="sm"
      fontFamily="mono"
      borderColor="inherit"
      whiteSpace="pre-wrap"
      sx={{ bg, color, ...sx }}
      css={{ '& > code': { background: 'unset', color: 'unset', padding: 0 } }}
      {...props}
    />
  );
};
