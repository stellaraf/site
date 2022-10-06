import NextLink from "next/link";
import { Box, Button, Heading, Divider } from "@chakra-ui/react";
import { useTitleCase } from "use-title-case";

import { Card, CardBody, Icon } from "~/components";
import { useRender } from "~/hooks";

import type { IDocsGroup } from "~/types";

export const DocsGroupCard = (props: IDocsGroup) => {
  const {
    slug,
    title,
    summary,
    subtitle,
    callToActionIcon,
    callToActionIconColor = "primary",
  } = props;

  const titleMe = useTitleCase();
  const body = useRender(summary, [], ["articleButton", "image"]);

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
          <CardBody spacing={4} textAlign="left" alignItems="flex-start">
            {typeof callToActionIcon !== "undefined" && (
              <Icon
                size={12}
                position="absolute"
                alignSelf="flex-end"
                color={callToActionIconColor}
                url={callToActionIcon.fields.file.url}
              />
            )}
            <Heading as="h3" fontSize={{ base: "sm", md: "lg" }} maxW="80%" whiteSpace="pre-wrap">
              {titleMe(title)}
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
                "& p": {
                  marginTop: "unset",
                  marginBottom: "unset",
                  textOverflow: "ellipsis",
                },
              }}
            >
              {body}
            </Box>
          </CardBody>
        </Card>
      </Button>
    </NextLink>
  );
};
