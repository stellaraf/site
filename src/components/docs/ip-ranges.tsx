import { Button, Box, Heading, SimpleGrid, Skeleton, Wrap, WrapItem } from "@chakra-ui/react";

import { CodeBlock, Error } from "~/components";

import { useIPRanges } from "./use-ip-ranges";

const URL = "https://ip.stellar.tech";

export const IPRanges = () => {
  const { data, isSuccess, error, isError } = useIPRanges();

  isError && console.error(error);

  if (isError) {
    console.error(error);
    return <Error />;
  }

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
      <Box>
        <Heading as="h3" size="md">
          IPv4 Ranges
        </Heading>
        <Skeleton isLoaded={isSuccess}>
          {isSuccess && <CodeBlock>{data.ipv4.join("\n")}</CodeBlock>}
        </Skeleton>
      </Box>
      <Box>
        <Heading as="h3" size="md">
          IPv6 Ranges
        </Heading>
        <Skeleton isLoaded={isSuccess}>
          {isSuccess && <CodeBlock>{data.ipv6.join("\n")}</CodeBlock>}
        </Skeleton>
      </Box>
      <Box>
        <Heading as="h3" size="md">{`Domains & URLs`}</Heading>
        <Skeleton isLoaded={isSuccess}>
          {isSuccess && <CodeBlock>{data.urls.join("\n")}</CodeBlock>}
        </Skeleton>
      </Box>
      <Box w="100%">
        <Heading as="h3" size="md">
          Other Formats
        </Heading>
        <Wrap mt={5} spacing={4}>
          {[
            ["json", "JSON"],
            ["", "Plain Text (IPv4 & IPv6)"],
            ["ipv4", "Plain Text (IPv4 Only)"],
            ["ipv6", "Plain Text (IPv6 Only)"],
            ["urls", "Plain Text (URLs Only)"],
          ].map(([href, title]) => (
            <WrapItem key={title}>
              <Button
                as="a"
                target="_blank"
                href={`${URL}/${href}`}
                colorScheme="gray"
                _dark={{ colorScheme: "tertiary" }}
                size={{ base: "xs", lg: "md" }}
              >
                {title}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </SimpleGrid>
  );
};
