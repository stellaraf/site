import { Box, Flex, Image, VStack, Heading, Divider } from '@chakra-ui/react';
import { useTitleCase } from 'use-title-case';
import { useColorValue } from '~/context';
import { useRender } from '~/hooks';

import type { TestimonialEntry } from '~/types';

export const Testimonial = (props: TestimonialEntry): JSX.Element => {
  const { title, subtitle, body, image } = props;
  const titleMe = useTitleCase();
  const renderedBody = useRender(body);
  const fontWeight = useColorValue('thin', undefined);
  const photoBorder = useColorValue('whiteAlpha.400', 'blackAlpha.400');

  return (
    <Flex p={8} direction="column" justify="space-between" borderRadius="md" zIndex={1}>
      <Flex direction="column">
        <Flex align="center" justify="space-between">
          <VStack align="flex-start">
            <Box
              whiteSpace="pre-line"
              fontWeight={fontWeight}
              fontSize={{ base: 'lg', lg: 'xl' }}
              textAlign={{ base: 'left', xl: 'justify' }}
            >
              {renderedBody}
            </Box>
            <VStack w="100%" pt={8} align="center">
              <Divider mb={4} />
              {subtitle && (
                <Heading as="h5" fontSize={{ base: 'md', lg: 'lg' }} fontWeight="light">
                  {titleMe(subtitle)}
                </Heading>
              )}
              <Heading as="h4" fontSize={{ base: 'lg', lg: 'xl' }}>
                {titleMe(title)}
              </Heading>
              <Box boxSize={12} overflow="hidden">
                <Image
                  width="100%"
                  rounded="full"
                  minHeight={12}
                  objectFit="cover"
                  borderWidth="1px"
                  borderStyle="solid"
                  alt={titleMe(title)}
                  borderColor={photoBorder}
                  src={image.fields.file.url}
                  fallbackSrc="https://via.placeholder.com/150"
                />
              </Box>
            </VStack>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};
