import { chakra, Flex, SkeletonText, Skeleton } from "@chakra-ui/react";
import { Content } from "~/components";
import { shouldForwardProp } from "~/util";

import type { IContentLoader } from "./types";

const Article = chakra("article", {
  shouldForwardProp,
  baseStyle: {
    overflow: "hidden",
    zIndex: 1,
    minW: { base: "90vw", lg: "80vw" },
  },
});

/**
 * Skeleton/loader component for Next.js non-pre-rendered dynamic routes.
 */
export const ContentLoader: React.FC<IContentLoader> = (props: IContentLoader) => {
  return (
    <Article {...props}>
      <Flex direction="column" align="flex-start">
        <Skeleton mt={16} noOfLines={1} height="2rem" width="25%" />
      </Flex>
      <Content.Body>
        <SkeletonText mt={4} noOfLines={4} spacing={4} />
        <Skeleton mt={8} mx="auto" height="xs" width={{ base: "100%", lg: "50%" }} />
        <SkeletonText mt={16} noOfLines={8} spacing={4} />
        <Skeleton mt={8} mx="auto" height="xs" width={{ base: "100%", lg: "50%" }} />
        <SkeletonText mt={16} noOfLines={6} spacing={4} />
      </Content.Body>
    </Article>
  );
};
