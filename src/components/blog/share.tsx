import { HStack, IconButton, StackProps } from "@chakra-ui/react";
import queryString from "query-string";

import { Facebook, Twitter, LinkedIn } from "~/icons";

interface ShareProps extends StackProps {
  url: string;
  title: string;
}

export const Share = (props: ShareProps) => {
  const { url, title, ...rest } = props;
  return (
    <HStack {...rest}>
      <IconButton
        as="a"
        target="_blank"
        borderRadius="lg"
        colorScheme="linkedin"
        title="Share to LinkedIn"
        aria-label="Share to LinkedIn"
        icon={<LinkedIn />}
        href={queryString.stringifyUrl({
          url: "https://linkedin.com/shareArticle",
          query: { mini: true, url, title },
        })}
      />
      <IconButton
        as="a"
        target="_blank"
        borderRadius="lg"
        colorScheme="twitter"
        title="Share to Twitter"
        aria-label="Share to Twitter"
        icon={<Twitter />}
        href={queryString.stringifyUrl({
          url: "https://twitter.com/intent/tweet",
          query: { url, text: title },
        })}
      />
      <IconButton
        as="a"
        target="_blank"
        borderRadius="lg"
        colorScheme="facebook"
        title="Share to Facebook"
        aria-label="Share to Facebook"
        icon={<Facebook />}
        href={queryString.stringifyUrl({
          url: "https://facebook.com/sharer/sharer.php",
          query: { u: url },
        })}
      />
    </HStack>
  );
};
