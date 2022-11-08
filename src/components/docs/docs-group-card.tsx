import NextLink from "next/link";

import { Box, Button, Heading, Divider } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { Card, CardBody, Icon, RichText } from "~/components";
import { is } from "~/lib";

import type { DocsGroup } from "~/queries";

export const DocsGroupCard = (props: DocsGroup) => {
  const { slug, title, summary, subtitle, callToAction } = props;

  const fnTitle = useTitleCase();

  return (
    <NextLink href={`/docs/${slug}`} scroll={false}>
      <Button
        p={0}
        rounded="lg"
        display="flex"
        height="unset"
        flex="1 0 100%"
        borderWidth={0}
        variant="ghost"
        overflow="hidden"
        textAlign="unset"
        lineHeight="unset"
        borderColor="unset"
        verticalAlign="unset"
        flexDirection="column"
      >
        <Card width={{ base: "20rem", md: "18rem", xl: "lg" }} maxHeight={80} zIndex={1}>
          <CardBody
            spacing={4}
            textAlign="left"
            alignItems="flex-start"
            overflow="hidden"
            // Fade out the text
            _before={{
              bg: "linear-gradient(transparent, 200px, white)",
              position: "absolute",
              boxSize: "100%",
              content: "''",
              left: 0,
              top: 0,
            }}
          >
            {callToAction.enable && is(callToAction.icon) && (
              <Icon
                size={12}
                position="absolute"
                alignSelf="flex-end"
                url={callToAction.icon?.url ?? ""}
                color={callToAction.iconColor ?? "primary"}
              />
            )}
            <Heading as="h3" fontSize={{ base: "sm", md: "lg" }} maxW="80%" whiteSpace="pre-wrap">
              {fnTitle(title)}
            </Heading>
            <Heading
              as="h4"
              maxW="90%"
              fontWeight="light"
              whiteSpace="pre-wrap"
              fontSize={{ base: "sm", md: "md" }}
            >
              {subtitle}
            </Heading>
            <Divider />
            <Box
              fontSize="sm"
              fontWeight="normal"
              whiteSpace="pre-line"
              css={{
                "& p, & .st-content-p": {
                  marginTop: "unset",
                  marginBottom: "unset",
                  textOverflow: "ellipsis",
                },
              }}
            >
              <RichText content={summary} overrides={{ img: () => <br />, video: () => <br /> }} />
            </Box>
          </CardBody>
        </Card>
      </Button>
    </NextLink>
  );
};
