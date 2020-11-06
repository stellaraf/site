import dynamic from 'next/dynamic';
import {
  Box,
  Heading,
  Icon,
  HStack,
  StylesProvider,
  useMultiStyleConfig,
  useToken,
} from '@chakra-ui/core';
import { useColorValue } from 'site/context';
import { useOpposingColor, useRender, useTitle } from 'site/hooks';

const Note = dynamic<MeronexIcon>(() => import('@meronex/icons/go').then(i => i.GoNote));
const Tip = dynamic<MeronexIcon>(() => import('@meronex/icons/go').then(i => i.GoLightBulb));
const Warning = dynamic<MeronexIcon>(() => import('@meronex/icons/vsc').then(i => i.VscWarning));
const Critical = dynamic<MeronexIcon>(() => import('@meronex/icons/im').then(i => i.ImFire));
const Information = dynamic<MeronexIcon>(() =>
  import('@meronex/icons/bi').then(i => i.BiInfoCircle),
);

import type { BoxProps } from '@chakra-ui/core';
import type { TAdmonition } from 'site/types';

const iconMap = {
  Information,
  Critical,
  Warning,
  Note,
  Tip,
};

const AdmonitionContainer = (props: BoxProps) => {
  return (
    <Box
      my={{ base: 4, lg: 12 }}
      borderRadius="lg"
      p={{ base: 4, lg: 6 }}
      mx={{ base: 4, lg: 8 }}
      {...props}
    />
  );
};

interface IAdmonitionIcon {
  type: TAdmonition['type'];
}

const AdmonitionIcon = (props: IAdmonitionIcon) => {
  const { type = 'Note' } = props;
  const As = iconMap[type];
  return <Icon as={As} boxSize={{ base: 8, lg: 6 }} />;
};

export const Admonition = (props: TAdmonition) => {
  const { title, body, type = 'Note', ...rest } = props;
  const titleMe = useTitle();
  const renderedBody = useRender(body);
  const bg = useColorValue(
    {
      Information: 'original.primary',
      Note: 'original.gray',
      Tip: 'original.green',
      Warning: 'original.yellow',
      Critical: 'original.red',
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
      Information: 'original.red',
      Tip: 'original.primary',
      Warning: 'original.primary',
      Critical: 'original.primary',
    },
    {
      Note: 'original.secondary',
      Information: 'tertiary.300',
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

  const styles = useMultiStyleConfig('Code', {
    colorScheme: codeColorScheme,
  });

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
        }}>
        <StylesProvider value={styles}>{renderedBody}</StylesProvider>
      </Box>
    </AdmonitionContainer>
  );
};
