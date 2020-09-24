import * as React from 'react';
import { HStack, IconButton } from '@chakra-ui/core';
import {
  FaTwitter as TwitterIcon,
  FaFacebook as FacebookIcon,
  FaLinkedinIn as LinkedInIcon,
  FaGithub as GithubIcon,
} from '@meronex/icons/fa';
import { useConfig } from 'site/context';

import type { ISocialLink, ISocialLinks } from './types';

const SocialLink = (props: ISocialLink) => {
  const { label, ...rest } = props;
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
      color="original.light"
      rel="noopener noreferrer"
      _hover={{ color: 'original.tertiary' }}
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
        icon={<LinkedInIcon size="1.5em" />}
      />
      <SocialLink
        href={`https://twitter.com/${twitterHandle}`}
        label="Twitter"
        icon={<TwitterIcon size="1.5em" />}
      />
      <SocialLink
        href={`https://facebook.com/${facebookProfile}`}
        label="Facebook"
        icon={<FacebookIcon size="1.5em" />}
      />
      <SocialLink
        href={`https://github.com/${githubOrg}`}
        label="GitHub"
        icon={<GithubIcon size="1.5em" />}
      />
    </HStack>
  );
};
