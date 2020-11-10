import { Box, Tag, Heading, SimpleGrid, Skeleton, Wrap, WrapItem } from '@chakra-ui/core';
import { useQuery } from 'react-query';
import { CodeBlock, Link, If, Error } from 'site/components';
import { useColorValue } from 'site/context';
import { getJson } from 'site/util';

const URL = 'https://ip.stellar.tech';

export const IPRanges = () => {
  const { data, error, isLoading, isError } = useQuery<IPRangeResponse>(`${URL}/json`, getJson);
  const tagColorScheme = useColorValue('gray', 'tertiary');
  isError && console.error(error);
  return (
    <>
      <If condition={isError}>
        <Error />
      </If>
      <If condition={!isError}>
        <Skeleton isLoaded={!isLoading}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            <Box>
              <Heading as="h3" size="md">
                IPv4 Ranges
              </Heading>
              <CodeBlock>{data?.ipv4.join('\n')}</CodeBlock>
            </Box>
            <Box>
              <Heading as="h3" size="md">
                IPv6 Ranges
              </Heading>
              <CodeBlock>{data?.ipv6.join('\n')}</CodeBlock>
            </Box>
            <Box>
              <Heading as="h3" size="md">{`Domains & URLs`}</Heading>
              <CodeBlock>{data?.urls.join('\n')}</CodeBlock>
            </Box>
            <Box maxW={{ base: '100%', lg: '50%' }}>
              <Heading as="h3" size="md">
                Other Formats
              </Heading>
              <Wrap mt={5}>
                {[
                  ['json', 'JSON'],
                  ['', 'Plain Text (IPv4 & IPv6)'],
                  ['ipv4', 'Plain Text (IPv4 Only)'],
                  ['ipv6', 'Plain Text (IPv6 Only)'],
                  ['urls', 'Plain Text (URLs Only)'],
                ].map(([href, title]) => (
                  <WrapItem key={title}>
                    <Link href={`${URL}/${href}`}>
                      <Tag px={3} py={2} colorScheme={tagColorScheme}>
                        {title}
                      </Tag>
                    </Link>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          </SimpleGrid>
        </Skeleton>
      </If>
    </>
  );
};
