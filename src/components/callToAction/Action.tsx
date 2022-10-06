import NextLink from "next/link";
import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";
import { Card, CardBody, Icon } from "~/components";
import { useRender, useSlug } from "~/hooks";

import type { TActions } from "~/types";

export const Action: React.FC<TActions> = (props: TActions) => {
  const { body, page, title, subtitle, callToActionIcon, callToActionBody, callToActionIconColor } = props;

  const titleMe = useTitleCase();
  const renderedBody = useRender(callToActionBody ?? body ?? page.fields.body, undefined, undefined, undefined, { hyperlink: (_, children) => <span>{children}</span> });
  const slug = useSlug(title, [title]);

  return (
    <NextLink href={`${page.fields.slug}#${slug}`} scroll={false}>
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
        <Card width={{ base: "20rem", md: "18rem", xl: "sm" }} maxHeight={64} zIndex={1}>
          <CardBody spacing={4} textAlign="left" alignItems="flex-start">
            <Flex align="center" justify="space-between" width="100%">
              <Heading fontSize={{ base: "md", md: "md" }} maxW="80%" whiteSpace="pre-wrap">
                {titleMe(title)}
              </Heading>
              {typeof callToActionIcon !== "undefined" && <Icon size={12} ml={2} color={callToActionIconColor} url={callToActionIcon.fields.file.url} />}
            </Flex>
            <Heading as="h4" fontSize="sm" fontWeight="light" whiteSpace="pre-wrap">
              {subtitle}
            </Heading>
            <Box
              fontSize="sm"
              fontWeight="normal"
              whiteSpace="pre-line"
              css={{
                "& p": {
                  marginTop: "unset",
                  marginBottom: "unset",
                  textOverflow: "ellipsis",
                },
              }}
            >
              {renderedBody}
            </Box>
          </CardBody>
        </Card>
      </Button>
    </NextLink>
  );
};
