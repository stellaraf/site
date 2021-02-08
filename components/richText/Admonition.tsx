import dynamic from 'next/dynamic';
import { Box, Heading, chakra, Icon, HStack, useToken } from '@chakra-ui/react';
import { CodeBlockStyleProvider } from '~/components';
import { useColorValue } from '~/context';
import { useOpposingColor, useRender, useTitle } from '~/hooks';
import { shouldForwardProp } from '~/util';

const Note = dynamic<MeronexIcon>(() => import('@meronex/icons/go').then(i => i.GoNote));
const Tip = dynamic<MeronexIcon>(() => import('@meronex/icons/go').then(i => i.GoLightBulb));
const Warning = dynamic<MeronexIcon>(() => import('@meronex/icons/vsc').then(i => i.VscWarning));
const Critical = dynamic<MeronexIcon>(() => import('@meronex/icons/im').then(i => i.ImFire));
const Information = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/bi').then(i => i.BiInfoCircle),
);

import type { TAdmonition } from '~/types';
import type { IAdmonitionIcon } from './types';

const iconMap = {
  Information,
  Critical,
  Warning,
  Note,
  Tip,
};

const AdmonitionContainer = chakra('div', {
  shouldForwardProp,
  baseStyle: {
    borderRadius: 'lg',
    width: 'fit-content',
    p: { base: 4, lg: 6 },
    mx: { base: 4, lg: 8 },
    my: { base: 4, lg: 12 },
  },
});

const AdmonitionIcon: React.FC<IAdmonitionIcon> = (props: IAdmonitionIcon) => {
  const { type = 'Note' } = props;
  const As = iconMap[type];
  return <Icon as={As} boxSize={{ base: 8, lg: 6 }} />;
};

export const Admonition: React.FC<TAdmonition> = (props: TAdmonition) => {
  const { title, body, type = 'Note', ...rest } = props;

  const titleMe = useTitle();
  const renderedBody = useRender(body);

  const bg = useColorValue(
    {
      Information: 'primary.500',
      Note: 'gray.500',
      Tip: 'green.500',
      Warning: 'yellow.500',
      Critical: 'red.500',
    },
    {
      Information: 'primary.300',
      Note: 'gray.300',
      Tip: 'green.300',
      Warning: 'yellow.300',
      Critical: 'red.300',
    },
  )[type];

  const linkColor = useColorValue(
    {
      Note: undefined,
      Information: 'red.500',
      Tip: 'primary.500',
      Warning: 'primary.500',
      Critical: 'primary.500',
    },
    {
      Note: 'secondary.500',
      Information: 'gray.800',
      Tip: 'primary.300',
      Warning: 'primary.300',
      Critical: 'primary.300',
    },
  )[type];

  const codeColorScheme = useColorValue(
    {
      Note: 'blackAlpha',
      Information: 'primary',
      Tip: 'green',
      Warning: 'yellow',
      Critical: 'red',
    },
    {
      Note: 'blackSolid',
      Information: 'whiteSolid',
      Tip: 'blackSolid',
      Warning: 'blackSolid',
      Critical: 'blackSolid',
    },
  )[type];

  const color = useOpposingColor(bg);

  return (
    <AdmonitionContainer bg={bg} color={color} {...rest}>
      <HStack isInline align="center" mb={6}>
        <AdmonitionIcon type={type} />
        {title && (
          <Heading as="h3" fontWeight="bold" fontSize="md">
            {titleMe(title)}
          </Heading>
        )}
      </HStack>
      <Box
        css={{
          '& p': { marginTop: '1rem', marginBottom: 0 },
          '& a': { '--link-color': useToken('colors', linkColor!) },
        }}
      >
        <CodeBlockStyleProvider
          value={{
            codeBlock: { colorScheme: codeColorScheme },
            copyButton: { colorScheme: codeColorScheme, variant: 'ghost' },
          }}
        >
          {renderedBody}
        </CodeBlockStyleProvider>
      </Box>
    </AdmonitionContainer>
  );
};
