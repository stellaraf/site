import { Box, Flex, Heading } from '@chakra-ui/react';
import { getPage, getPageContent, getContent } from 'site/util';
import { Avatars, Hero, GoogleMap, SEO, GetStarted } from 'site/components';
import { useTitle } from 'site/hooks';
import { useResponsiveStyle } from 'site/styles';

import type { GetStaticProps } from 'next';
import type { IAboutPage, ISection } from 'site/types';

const SLUG = 'about';

const Section = (props: ISection) => {
  const { title, children, ...rest } = props;
  const rStyles = useResponsiveStyle();
  const titleMe = useTitle();
  return (
    <Box as="section" py={24} overflow="hidden" {...rest}>
      <Flex height="100%" {...rStyles} alignItems="center" flexDir="column" {...rStyles}>
        <Heading as="h3" fontSize="4xl">
          {titleMe(title)}
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

  return (
    <>
      <SEO title={title} description={subtitle} />
      <Hero title={title} subtitle={subtitle} body={body} />
      <Section title={employeesTitle}>
        <Avatars bios={bios} />
      </Section>
      <Section title={mapTitle}>
        <GoogleMap />
      </Section>
      {getStarted && <GetStarted {...getStarted.fields} />}
    </>
  );
}

export const getStaticProps: GetStaticProps<IAboutPage> = async ctx => {
  const preview = ctx?.preview ?? false;
  let pageData = Object();
  let pageContent = Array();
  let bios = new Array();
  try {
    pageData = await getPage(SLUG, preview);
    pageContent = await getPageContent(pageData?.id ?? null, preview);
    bios = await getContent('bio', preview);
  } catch (err) {
    console.error(err);
    throw err;
  }
  return { props: { pageData, pageContent, bios, preview } };
};
