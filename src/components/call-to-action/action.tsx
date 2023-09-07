import NextLink from "next/link";

import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { TitleCase } from "use-title-case";

import { Card, CardBody, Icon, RichText } from "~/components";
import { useSlug } from "~/hooks";
import { is } from "~/lib";

import { useBody } from "./use-body";

import type { Actions } from "~/queries";

export const Action = (props: ArrayElement<Actions>) => {
  const { body, page, title, subtitle, callToAction } = props;

  const resolvedBody = useBody(callToAction.body, body, page?.body);

  const slug = useSlug(title, [title]);

  return (
    <NextLink href={`${page?.slug}#${slug}`} scroll={false}>
      <Button
        p={0}
        zIndex={1}
        rounded="lg"
        display="flex"
        height="unset"
        flex="1 0 100%"
        variant="ghost"
        borderWidth={0}
        color="body-fg"
        overflow="hidden"
        textAlign="unset"
        lineHeight="unset"
        borderColor="unset"
        verticalAlign="unset"
        flexDirection="column"
        colorScheme="whiteAlpha"
        _dark={{ colorScheme: "blackAlpha" }}
      >
        <Card width={{ base: "20rem", md: "18rem", xl: "sm" }} maxHeight={64} zIndex={1}>
          <CardBody
            spacing={4}
            textAlign="left"
            overflow="hidden"
            alignItems="flex-start"
            // Fade out the text
            _before={{
              bg: "linear-gradient(transparent, 150px, white)",
              position: "absolute",
              boxSize: "100%",
              content: "''",
              left: 0,
              top: 0,
              zIndex: 5,
            }}
            _dark={{
              _before: {
                bg: "linear-gradient(transparent, 150px, var(--chakra-colors-blackSolid-800))",
              },
            }}
          >
            <Flex align="flex-start" justify="space-between" width="100%">
              <Flex flexDir="column" maxW="80%">
                <Heading fontSize={{ base: "md", md: "md" }} whiteSpace="pre-wrap">
                  <TitleCase>{title}</TitleCase>
                </Heading>
                {is(page) && (
                  <Heading
                    as="h6"
                    maxW="80%"
                    fontSize="xs"
                    opacity={0.5}
                    fontWeight="normal"
                    whiteSpace="pre-wrap"
                  >
                    {page.title}
                  </Heading>
                )}
              </Flex>

              {is(callToAction.icon) && (
                <Icon
                  size={12}
                  ml={2}
                  color={callToAction.iconColor ?? "gray"}
                  url={callToAction.icon?.url}
                />
              )}
            </Flex>
            {is(subtitle) && (
              <Heading as="h4" fontSize="sm" fontWeight="light" whiteSpace="pre-wrap">
                {subtitle}
              </Heading>
            )}
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
              <RichText
                content={resolvedBody}
                // Override links in the CTA to eliminate DOM nesting errors (plus you don't want
                // to actually click the link in the CTA).
                overrides={{ a: ({ children }) => <>{children}</> }}
              />
            </Box>
          </CardBody>
        </Card>
      </Button>
    </NextLink>
  );
};
