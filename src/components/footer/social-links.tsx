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
      size="lg"
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
  const { socialLinks } = useConfig();

  return (
    <HStack spacing={4} alignItems={{ lg: "flex-start" }} {...props}>
      {socialLinks.map(social => {
        const [family, iconName] = social.iconName.split("-");
        return (
          <SocialLink
            key={social.name}
            href={social.href}
            label={social.name}
            icon={<DynamicIcon icon={{ [family]: iconName }} />}
          />
        );
      })}
    </HStack>
  );
};
