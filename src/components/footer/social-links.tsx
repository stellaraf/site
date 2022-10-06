import { HStack, IconButton } from "@chakra-ui/react";

import { DynamicIcon } from "~/components";
import { useConfig, useColorValue } from "~/context";

import type { SocialLinkProps } from "./types";
import type { StackProps } from "@chakra-ui/react";

const SocialLink = (props: SocialLinkProps) => {
  const { label, ...rest } = props;
  const color = useColorValue("tertiary.500", "tertiary.300");

  return (
    <IconButton
      p={2}
      as="a"
      h="100%"
      title={label}
      target="_blank"
      color="light.500"
      aria-label={label}
      variant="unstyled"
      _hover={{ color }}
      alignItems="center"
      display="inline-flex"
      rel="noopener noreferrer"
      {...rest}
    />
  );
};

export const SocialLinks = (props: StackProps) => {
  const {
    twitterHandle = "#",
    facebookProfile = "#",
    linkedInProfile = "#",
    githubOrg = "#",
  } = useConfig();

  return (
    <HStack spacing={4} {...props}>
      <SocialLink
        label="LinkedIn"
        icon={<DynamicIcon icon={{ fa: "FaLinkedin" }} boxSize="1.5em" />}
        href={`https://linkedin.com/company/${linkedInProfile}`}
      />
      <SocialLink
        label="Twitter"
        icon={<DynamicIcon icon={{ fa: "FaTwitter" }} boxSize="1.5em" />}
        href={`https://twitter.com/${twitterHandle}`}
      />
      <SocialLink
        label="Facebook"
        icon={<DynamicIcon icon={{ fa: "FaFacebook" }} boxSize="1.5em" />}
        href={`https://facebook.com/${facebookProfile}`}
      />
      <SocialLink
        label="GitHub"
        icon={<DynamicIcon icon={{ fa: "FaGithub" }} boxSize="1.5em" />}
        href={`https://github.com/${githubOrg}`}
      />
    </HStack>
  );
};
