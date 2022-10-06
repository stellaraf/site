import { HStack, IconButton } from "@chakra-ui/react";
import { DynamicIcon } from "~/components";
import { useConfig, useColorValue } from "~/context";

import type { ISocialLink, ISocialLinks } from "./types";

const SocialLink: React.FC<ISocialLink> = (props: ISocialLink) => {
  const { label, ...rest } = props;
  const color = useColorValue("tertiary.500", "tertiary.300");
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

export const SocialLinks: React.FC<ISocialLinks> = (props: ISocialLinks) => {
  const { twitterHandle = "#", facebookProfile = "#", linkedInProfile = "#", githubOrg = "#" } = useConfig();

  return (
    <HStack spacing={4} {...props}>
      <SocialLink label="LinkedIn" icon={<DynamicIcon icon={{ fa: "FaLinkedin" }} boxSize="1.5em" />} href={`https://linkedin.com/company/${linkedInProfile}`} />
      <SocialLink label="Twitter" icon={<DynamicIcon icon={{ fa: "FaTwitter" }} boxSize="1.5em" />} href={`https://twitter.com/${twitterHandle}`} />
      <SocialLink label="Facebook" icon={<DynamicIcon icon={{ fa: "FaFacebook" }} boxSize="1.5em" />} href={`https://facebook.com/${facebookProfile}`} />
      <SocialLink label="GitHub" icon={<DynamicIcon icon={{ fa: "FaGithub" }} boxSize="1.5em" />} href={`https://github.com/${githubOrg}`} />
    </HStack>
  );
};
