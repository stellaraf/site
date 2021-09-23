import dynamic from 'next/dynamic';
import {
  Box,
  Icon,
  useClipboard,
  IconButton,
  useStyleConfig,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useColorValue } from '~/context';
import { useCodeBlockStyle } from './useCodeBlockStyle';

import type { ICodeBlock } from './types';

const CopyIcon = dynamic<MeronexIcon>(() => import('@meronex/icons/bi').then(i => i.BiCopy));
const CheckIcon = dynamic<MeronexIcon>(() => import('@meronex/icons/bi').then(i => i.BiCheck));

export const CodeBlock: React.FC<ICodeBlock> = (props: ICodeBlock) => {
  const { children, colorScheme, ...rest } = props;
  const defaultScheme = useColorValue('gray', 'tertiary');
  const size = useBreakpointValue({ base: 'md', lg: 'sm' });

  let ctx = useCodeBlockStyle();

  if (ctx === null) {
    ctx = {
      codeBlock: { colorScheme: colorScheme ?? defaultScheme },
      copyButton: { colorScheme: colorScheme ?? defaultScheme, variant: 'ghost' },
    };
  }

  const { bg, color } = useStyleConfig('Code', { colorScheme: ctx.codeBlock.colorScheme });

  const btnSx = useStyleConfig('Button', {
    colorScheme: ctx.copyButton.colorScheme,
    variant: 'ghost',
  });

  let copyValue = '';
  if (typeof children === 'string') {
    copyValue = children;
  } else {
    copyValue = children.props.children;
  }

  const { hasCopied, onCopy } = useClipboard(copyValue);

  return (
    <Box
      p={3}
      mt={5}
      border="1px"
      fontSize="sm"
      pos="relative"
      borderRadius="md"
      borderColor="inherit"
      sx={{ bg, color }}
      {...rest}
    >
      <Box
        as="pre"
        fontFamily="mono"
        whiteSpace="pre-wrap"
        minHeight={btnSx.h as number}
        css={{ '& > code': { background: 'unset', color: 'unset', padding: 0 } }}
      >
        {children}
      </Box>
      <IconButton
        sx={btnSx}
        m={2}
        top={0}
        right={0}
        size={size}
        pos="absolute"
        aria-label="Copy to Clipboard"
        icon={
          <>
            <Icon
              as={CheckIcon}
              transition="all 0.2s ease"
              opacity={hasCopied ? 1 : 0}
              pos={hasCopied ? undefined : 'absolute'}
            />
            <Icon
              as={CopyIcon}
              transition="all 0.2s ease"
              opacity={hasCopied ? 0 : 1}
              pos={hasCopied ? 'absolute' : undefined}
            />
          </>
        }
        onClick={onCopy}
      />
    </Box>
  );
};
