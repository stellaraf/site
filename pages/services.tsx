import * as React from 'react';
import { useRef } from 'react';
import { GetStaticProps } from 'next';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { getPage, getPageContent } from 'site/util';
import { ContentSection, SEO } from 'site/components';
import { useActiveSection } from 'site/hooks';
import { useGradient } from 'site/styles';

import type { PageProps } from 'site/types';

const SLUG = 'services';

export default function Services(props: PageProps) {
  const { pageData, pageContent } = props;
  const { title, subtitle } = pageData;
  const sections = pageContent.sort((a, b) => a.sortWeight - b.sortWeight);
  const sectionRefs = sections.map(() => useRef());

  useActiveSection(sectionRefs);

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Box ref={useRef()} w="100%" minH="80vh" background={useGradient()} px={24} pt={32}>
        <Flex flexDir="column" alignItems="center" mt={[4, 4, 8]}>
          <Flex textAlign="center" flexDir="column" alignItems="center">
            <Heading as="h1" fontSize="6xl" fontWeight="light">
              {title}
            </Heading>
            {subtitle && (
              <Heading as="h2" fontSize="3xl" fontWeight="light">
                {subtitle}
              </Heading>
            )}
          </Flex>
        </Flex>
      </Box>
      {sectionRefs.map((ref, i) => {
        return <ContentSection ref={ref} items={sections[i]} index={i} key={i} />;
      })}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let pageData = Object();
  let pageContent = Array();
  try {
    pageData = await getPage(SLUG);
    pageContent = await getPageContent(pageData?.id ?? null);
  } catch (err) {
    console.error(err);
  }
  return { props: { pageData, pageContent } };
};
