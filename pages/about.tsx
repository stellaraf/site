import { Box, Flex, Heading } from '@chakra-ui/core';
import { getPage, getPageContent, getContent } from 'site/util';
import { Avatars, Hero, GoogleMap, SEO, GetStarted } from 'site/components';
import { useRef, useTitle } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { GetStaticProps } from 'next';
import type { IAboutPage } from 'site/types';

const SLUG = 'about';

const Section = (props: ISection) => {
  const { title, children, ...rest } = props;
  const rStyles = useResponsiveStyle();
  return (
    <Box as="section" py={24} overflow="hidden" {...rest}>
      <Flex height="100%" {...rStyles} alignItems="center" flexDir="column" {...rStyles}>
        <Heading as="h3" fontSize="4xl">
          {title}
        </Heading>
        {children}
      </Flex>
    </Box>
  );
};

export default function About(props: IAboutPage) {
  const { pageData, bios } = props;
  const { title, subtitle, body = null, customProperties, getStarted } = pageData;
  const { employeesTitle = '', mapTitle = '' } = customProperties;
  const headerRef = useRef<HTMLDivElement>();
  const titleMe = useTitle();

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero ref={headerRef} title={title} subtitle={subtitle} body={body} />
      <Section title={titleMe(employeesTitle)}>
        <Avatars bios={bios} />
      </Section>
      <Section title={titleMe(mapTitle)}>
        <GoogleMap />
      </Section>
      {getStarted && <GetStarted {...getStarted.fields} />}
    </>
  );
}

export const getStaticProps: GetStaticProps<IAboutPage> = async () => {
  let pageData = Object();
  let pageContent = Array();
  let bios = new Array();
  try {
    pageData = await getPage(SLUG);
    pageContent = await getPageContent(pageData?.id ?? null);
    bios = await getContent('bio');
  } catch (err) {
    console.error(err);
    throw err;
  }
  return { props: { pageData, pageContent, bios } };
};
