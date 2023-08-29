import { HStack, IconButton } from "@chakra-ui/react";

import { useConfig } from "~/context";
import { Facebook, Twitter, LinkedIn, GitHub, type IconType } from "~/icons";

import type { SocialLinkProps } from "./types";
import type { StackProps } from "@chakra-ui/react";

const iconMap: Record<string, IconType> = {
  Facebook: Facebook,
  Twitter: Twitter,
  LinkedIn: LinkedIn,
  GitHub: GitHub,
};

const SocialLink = (props: SocialLinkProps) => {
  const { label, ...rest } = props;
  return (
    <IconButton
      p={2}
      as="a"
      h="100%"
      size="lg"
      title={label}
      target="_blank"
      color="light.500"
      aria-label={label}
      variant="unstyled"
      _hover={{ color: "tertiary.500", _dark: { color: "tertiary.300" } }}
      alignItems="center"
      display="inline-flex"
      rel="noopener noreferrer"
      {...rest}
    />
  );
};

export const SocialLinks = (props: StackProps) => {
  const { socialLinks } = useConfig();

  return (
    <HStack spacing={4} alignItems={{ lg: "flex-start" }} {...props}>
      {socialLinks.map(social => {
        const Icon = iconMap[social.name];
        return (
          <SocialLink key={social.name} href={social.href} label={social.name} icon={<Icon />} />
        );
      })}
    </HStack>
  );
};
