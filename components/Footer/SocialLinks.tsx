import dynamic from 'next/dynamic';
import { HStack, IconButton } from '@chakra-ui/react';
import { useConfig, useColorValue } from 'site/context';

import type { IconBaseProps } from '@meronex/icons';
import type { ISocialLink, ISocialLinks } from './types';

const Twitter = dynamic<IconBaseProps>(() => import('@meronex/icons/fa').then(i => i.FaTwitter));
const Facebook = dynamic<IconBaseProps>(() => import('@meronex/icons/fa').then(i => i.FaFacebook));
const GitHub = dynamic<IconBaseProps>(() => import('@meronex/icons/fa').then(i => i.FaGithub));
const LinkedIn = dynamic<IconBaseProps>(() =>
  import('@meronex/icons/fa').then(i => i.FaLinkedinIn),
);

const SocialLink = (props: ISocialLink) => {
  const { label, ...rest } = props;
  const color = useColorValue('tertiary.500', 'tertiary.300');
  return (
    <IconButton
      p={2}
      as="a"
      h="100%"
      title={label}
      target="_blank"
      aria-label={label}
      variant="unstyled"
      alignItems="center"
      display="inline-flex"
      color="light.500"
      rel="noopener noreferrer"
      _hover={{ color }}
      {...rest}
    />
  );
};

export const SocialLinks = (props: ISocialLinks) => {
  const {
    twitterHandle = '#',
    facebookProfile = '#',
    linkedInProfile = '#',
    githubOrg = '#',
  } = useConfig();
  return (
    <HStack spacing={4} {...props}>
      <SocialLink
        href={`https://linked.com/company/${linkedInProfile}`}
        label="LinkedIn"
        icon={<LinkedIn size="1.5em" />}
      />
      <SocialLink
        href={`https://twitter.com/${twitterHandle}`}
        label="Twitter"
        icon={<Twitter size="1.5em" />}
      />
      <SocialLink
        href={`https://facebook.com/${facebookProfile}`}
        label="Facebook"
        icon={<Facebook size="1.5em" />}
      />
      <SocialLink
        href={`https://github.com/${githubOrg}`}
        label="GitHub"
        icon={<GitHub size="1.5em" />}
      />
    </HStack>
  );
};
